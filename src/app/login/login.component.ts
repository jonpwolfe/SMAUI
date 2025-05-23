import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';  // Import Router for navigation
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Check if token exists and redirect to dashboard if user is already logged in
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.router.navigate(['/dashboard']);
      }
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in all required fields';
      return;
    }
  
    this.isLoading = true;
    const loginData = this.loginForm.value;
  
    // Send POST request to login endpoint
    this.http.post<any>('http://localhost:8080/auth/login', loginData, { 
      observe: 'response', // Allows access to headers and response
      responseType: 'json'
    }).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
  
        // Retrieve the token from the Authorization header
        const token = response.headers.get('Authorization');
        if (token) {
          // Store the token in localStorage, remove the 'Bearer ' prefix
          localStorage.setItem('token', token.replace('Bearer ', ''));
        }
  
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error:', err);
  
        if (err.status === 401) {
          this.errorMessage = 'Invalid username or password.';
        } else {
          this.errorMessage = 'An error occurred. Please try again.';
        }
      },
      complete: () => {
        console.log('Request completed.');
      },
    });
  }
}