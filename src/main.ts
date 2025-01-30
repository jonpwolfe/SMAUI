import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';  // Assuming you are using AppComponentimport { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { JwtInterceptor } from './app/jwt.interceptor';
import { LoginComponent } from './app/login/login.component'; 
import { RegistrationComponent } from './app/registration/registration.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { CurrentDatePipe } from './app/currentdate.pipe';
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirect to login by default
  { path: 'login', component: LoginComponent },  // Route for login page
  { path: 'register',component: RegistrationComponent},
  { path: 'dashboard', component: DashboardComponent },  // Route for dashboard page
  { path: '**', redirectTo: '/login' }  // Wildcard route for unknown paths
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),  // Add routes if necessary
    provideHttpClient(withFetch()),  // Provides HttpClient globally
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,  // Register the JwtInterceptor
      multi: true
    },
    CurrentDatePipe,
  ],
}).catch((err) => console.error(err));
