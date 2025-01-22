import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';  // For routing
import { ReactiveFormsModule } from '@angular/forms';  // For R
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule
@Component({
  selector: 'app-root',
  standalone: true,  // Standalone component
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular Standalone App';
}
