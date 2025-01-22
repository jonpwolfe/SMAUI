// app.routes.ts
import { Routes } from '@angular/router';  // Import Routes type from Angular Router
import { LoginComponent } from './login/login.component';  // Import LoginComponent
import { DashboardComponent } from './dashboard/dashboard.component';  // Import DashboardComponent

// Define all routes in the app
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirect to login by default
  { path: 'login', component: LoginComponent },  // Route for login page
  { path: 'dashboard', component: DashboardComponent },  // Route for dashboard page
  { path: '**', redirectTo: '/login', pathMatch: 'full' }  // Wildcard route for unknown paths
];
