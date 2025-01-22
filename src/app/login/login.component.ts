import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';  // Import Router for navigation
import { CommonModule, isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone : true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
})
export class LoginComponent {
  loginForm: FormGroup;  // FormGroup to manage the form
  errorMessage: string = '';  // To hold error messages
  isLoading : boolean = false;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, @Inject(PLATFORM_ID) private platformId: any ) {
    
    // Initialize the login form with validations
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.isLoading = false;
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
    this.http.post<any>('http://example.com/api/auth', loginData).subscribe(
      response => {
        // Handle the response
        if (response && response.token) {
          console.log('Login successful:', response);
          // Store the token or perform other actions
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('authToken', response.token);  // Store token in localStorage (only in the browser)
          }
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
      },
      () =>{},
    );
  }
}
