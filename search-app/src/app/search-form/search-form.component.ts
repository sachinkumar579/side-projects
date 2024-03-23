import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css'
})
export class SearchFormComponent {
  textInput: string = '';
  matchingContent: any[] = [];

  constructor(private http: HttpClient) { }

  searchKeywords() {
    const keywords = this.textInput.split(',').map(value => value.trim());    
    console.log(keywords)

    this.http.post<any>('http://localhost:3001/api/search', { keywords }).subscribe(
      (response) => {
        this.matchingContent = response.matchingContent;
      },
      (error) => {
        console.error('Failed to search keywords', error);
        this.matchingContent = [];
      }
    );
  }
}
