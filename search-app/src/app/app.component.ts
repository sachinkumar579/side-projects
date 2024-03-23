import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { SearchFormComponent } from './search-form/search-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,HttpClientModule,SearchFormComponent  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  bigTextBox: string = '';
  biggerTextBox: string = "";

  constructor(private http: HttpClient) { }

  saveData() {
    const data = {
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      keywords: [this.bigTextBox],
      content: [this.biggerTextBox]
    };

    this.http.post(' http://localhost:3001/api/data', data).subscribe(
      (response) => {
        console.log('Data saved successfully', response);        
      },
      (error) => {
        console.error('Failed to save data', error);
        alert('Failed to save data');
      }
    );
  }
}
