import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';  // Assuming you are using AppComponentimport { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { JwtInterceptor } from './app/jwt.interceptor';
import { LoginComponent } from './app/login/login.component'; 
import { RegisterComponent } from './app/register/register.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }, // Add LoginComponent route
  { path: 'register', component: RegisterComponent},
  { path: 'dashboard', component: DashboardComponent},
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),  // Add routes if necessary
    provideHttpClient(withFetch()),  // Provides HttpClient globally
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,  // Register the JwtInterceptor
      multi: true
    }
  ],
}).catch((err) => console.error(err));
