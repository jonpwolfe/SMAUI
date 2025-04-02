import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { JwtInterceptor } from './app/jwt.interceptor';
import { LoginComponent } from './app/login/login.component';
import { RegistrationComponent } from './app/registration/registration.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { CurrentDatePipe } from './app/currentdate.pipe';

// Define routes for your application
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Default redirect to login page
  { path: 'login', component: LoginComponent },  // Login page route
  { path: 'register', component: RegistrationComponent },  // Registration page route
  { path: 'dashboard', component: DashboardComponent },  // Dashboard page route
  { path: '**', redirectTo: '/login' }  // Wildcard route for undefined paths
];

// Bootstrap the application
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),  // Provides the routing configuration
    provideHttpClient(),  // Provides HttpClient service globally
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,  // Register the JWT interceptor
      multi: true  // Allow multiple interceptors
    },
    CurrentDatePipe,  // Register the custom date pipe
  ],
}).catch((err) => console.error(err));  // Catch and log errors

