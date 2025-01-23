import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';  // Import Router for navigation
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registrationForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';
  isLoading: boolean = false;

  constructor(private http: HttpClient,
     private fb: FormBuilder,
     private router: Router,
    ) 
    { 
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
    });
  }
   // Method to handle user registration
onSubmit() {
  if (this.registrationForm.invalid) {
    this.errorMessage = 'Please fill in all required fields';
    return;
  }

  this.isLoading = true;
  const formData = this.registrationForm.value;

  // Send POST request to the server for registration
  this.http.post<any>('http://localhost:8080/register', formData, {withCredentials: true, responseType: 'text' as 'json',}).subscribe({
    next: (response) => {
      console.log('Registration successful:', response);

      // Handle successful registration (e.g., show a success message)
      this.successMessage = 'Registration successful! Please log in.';
      this.isLoading = false;

      // Optionally, navigate to the login page after registration
      this.router.navigate(['/login']);
    },
    error: (err) => {
      this.isLoading = false;
      console.error('Error:', err);
      // Handle different error scenarios
      if (err.status === 400) {
        this.errorMessage = 'Invalid registration details. Please try again.';
      } else if (err.status === 409) {
        this.errorMessage = 'Username already exists. Please choose a different one.';
      } else {
        this.errorMessage = 'An unexpected error occurred. Please try again later.';
      }
    },
    complete: () => {
      console.log('Registration request completed.');
    },
  });
}
  
}

