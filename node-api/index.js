const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors({ origin: 'http://localhost:4200' }));

app.use(express.json());

app.post('/api/data', (req, res) => {
    const { date, keywords, content } = req.body;
  
    // Calculate current date in the format "Month D, Yr"
    const currentDate = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  
    // Create an object with the data, including the current date
    const data = {
      date: currentDate,
      keywords,
      content
    };
  
    // Read existing data from file
    fs.readFile('data.json', 'utf8', (err, existingData) => {
      if (err && err.code !== 'ENOENT') {
        console.error(err);
        res.status(500).json({ error: 'Failed to read data file' });
        return;
      }
  
      let jsonData = [];
      if (existingData) {
        try {
          jsonData = JSON.parse(existingData);
        } catch (parseError) {
          console.error(parseError);
          res.status(500).json({ error: 'Failed to parse existing data file' });
          return;
        }
      }
  
      // Add new data to existing data
      jsonData.push(data);
  
      // Write updated data to file
      fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), (writeErr) => {
        if (writeErr) {
          console.error(writeErr);
          res.status(500).json({ error: 'Failed to save data' });
          return;
        }
  
        res.json({ message: 'Data saved successfully' });
      });
    });
  });
  

app.post('/api/search', (req, res) => {
    const { keywords } = req.body;
  
    // Read existing data from file
    fs.readFile('data.json', 'utf8', (err, existingData) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to read data file' });
        return;
      }
  
      let jsonData = [];
      try {
        jsonData = JSON.parse(existingData);
      } catch (parseError) {
        console.error(parseError);
        res.status(500).json({ error: 'Failed to parse existing data file' });
        return;
      }
  
      // Filter content based on keywords
      const matchingContent = jsonData.filter((item) => {
        return item.keywords.some((key) => keywords.includes(key));
      }).map((item) => {
        return { date: item.date, content: item.content };
      });
  
      res.json({ matchingContent });
    });
  });


  app.post('/api/searchDate', (req, res) => {
    const { date } = req.body;
  
    // Read existing data from file
    fs.readFile('data.json', 'utf8', (err, existingData) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to read data file' });
        return;
      }
  
      let jsonData = [];
      try {
        jsonData = JSON.parse(existingData);
      } catch (parseError) {
        console.error(parseError);
        res.status(500).json({ error: 'Failed to parse existing data file' });
        return;
      }
  
      // Filter content based on date
      const matchingData = jsonData.filter((item) => {
        return item.date === date;
      }).map((item) => {
        return {
          keywords: item.keywords,
          content: item.content
        };
      });
  
      res.json({ matchingData });
    });
  });
  
  

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
