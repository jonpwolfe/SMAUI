import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HttpClientModule, withFetch } from '@angular/common/http';
import { routes } from './app/app-routing.module';



bootstrapApplication(AppComponent, {
providers: [
  provideRouter(routes),  // Provide the routes
  provideHttpClient(withFetch()),     // Include HttpClient for API requests
  HttpClientModule
]})
.catch((err) => console.error(err));

