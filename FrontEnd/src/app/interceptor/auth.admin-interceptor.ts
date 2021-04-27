import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminAuthenticationService } from '../service/admin-authentication.service';

@Injectable()
export class AdminAuthInterceptor implements HttpInterceptor {

  constructor(private adminAuthenticationService: AdminAuthenticationService) {}

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if (httpRequest.url.includes(`${this.adminAuthenticationService.host}/adminPortal/login`)) {
      return httpHandler.handle(httpRequest);
    }
    this.adminAuthenticationService.loadToken();
    const token = this.adminAuthenticationService.getToken();
    const request = httpRequest.clone({ setHeaders: { Authorization: `Bearer ${token}` }});
    return httpHandler.handle(request);
  }
}
