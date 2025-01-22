import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';  // Import Router for navigation
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
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
    // Initialize the login form with validations
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {  // Check if running in the browser
      const token = localStorage.getItem('authToken');  // Access localStorage in the browser
      if (token) {
        // Redirect to dashboard if token exists
        this.router.navigate(['/dashboard']);
      }
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
    this.http.post<any>('http://localhost:8080/auth/login', loginData).subscribe({
      next: (response) => {
        if (response && response.token) {
          console.log('Login successful:', response);
          // Store the token or perform other actions
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('authToken', response.token);  // Store token in localStorage (only in the browser)
          }
          this.router.navigate(['/dashboard']);  // Navigate to the dashboard
        } else {
          this.errorMessage = 'Login failed!';
          this.isLoading = false; // Reset loading state on failure
        }
      },
      error: (err) => {
        // Handle error
        this.isLoading = false; // Reset loading state on error
        console.error('Error:', err);
        this.errorMessage = 'An error occurred. Please try again.';
      },
      complete: () => {
        // Optional: handle completion
        console.log('Request completed.');
        // Optionally reset the form after submission (if necessary)
        // this.loginForm.reset(); 
      },
    });
  }
}

