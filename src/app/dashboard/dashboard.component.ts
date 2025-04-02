import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrentDatePipe } from '../currentdate.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, HttpClientModule, CurrentDatePipe],
})
export class DashboardComponent implements OnInit {
  name: string = ''; // To store the user data
  currentDate: Date = new Date(); // Current date
  isLoading: boolean = false; // Loading state
  errorMessage: string = ''; // Error message

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUser();
  }

  // Method to load user data from the backend
private loadUser(): void {
  this.isLoading = true;
  
  const token = localStorage.getItem('token'); // Retrieve the JWT from localStorage
  console.log(token);
  let headers = new HttpHeaders(); // Initialize headers

  // If there's a token, set the Authorization header
  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  this.http.get<{ name: string }>('http://localhost:8080/user', {headers})
    .subscribe({
      next: (data) => {
        this.name = data.name;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
        if (err.status === 401) {
          this.errorMessage = 'Unauthorized. Redirecting to login...';
          setTimeout(() => {
            window.location.href = '/login'; // Redirect to login page
          }, 2000);
        } else {
          this.errorMessage = 'Failed to load user data. Please try again later.';
        }
        this.isLoading = false;
      },
    });
}
}
