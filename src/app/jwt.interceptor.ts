import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if we're in the browser
    if (isPlatformBrowser(this.platformId)) {
      // Retrieve the token from localStorage (only in the browser)
      const token = localStorage.getItem('token');
      
      // If the token exists, clone the request and add Authorization header
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    }

    // Continue with the request
    return next.handle(request);
  }
}
