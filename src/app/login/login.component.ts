import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';  // Import Router for navigation
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone : true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent {
  loginForm: FormGroup;  // FormGroup to manage the form
  errorMessage: string = '';  // To hold error messages
  isLoading : boolean;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {
    // Initialize the login form with validations
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.isLoading = false;
  }

  ngOnInit() {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Redirect to a logged-in page if the token exists
      this.router.navigate(['/dashboard']);
    }
  }
  
  // Method to handle form submission
  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in all required fields';
      return;
    }
    this.isLoading = true;
    const loginData = this.loginForm.value;

    // Send POST request to the server
    this.http.post<any>('http://example.com/api/auth', loginData).subscribe(
      response => {
        // Handle the response
        if (response && response.token) {
          console.log('Login successful:', response);
          // Store the token or perform other actions
          localStorage.setItem('authToken', response.token);  // Example: Save the auth token
          this.router.navigate(['/dashboard']);  // Navigate to another route (example: dashboard)
        } else {
          this.errorMessage = 'Login failed!';
          this.isLoading = false;
        }
      },
      error => {
        this.isLoading = false;
        console.error('Error:', error);
        this.errorMessage = 'An error occurred. Please try again.';
      }
    );
  }
}
