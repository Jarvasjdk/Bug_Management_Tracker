import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  ɵHttpInterceptingHandler
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AdminAuthenticationService } from '../service/admin-authentication.service';
import { UserAuthenticationService } from '../service/user-authentication.service';

@Injectable()
export class AdminAuthInterceptor implements HttpInterceptor {

  constructor(private adminAuthenticationService: AdminAuthenticationService, userAuthenticationService: UserAuthenticationService) {}

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if (httpRequest.url.includes(`${this.adminAuthenticationService.host}/adminPortal/login`)) {
      return httpHandler.handle(httpRequest);
    }
    if(!httpRequest.url.includes(`${this.adminAuthenticationService.host}/user/login`) && !httpRequest.url.includes(`${this.adminAuthenticationService.host}/user/register`) && !httpRequest.url.includes(`${this.adminAuthenticationService.host}/adminPortal/login`)){
    this.adminAuthenticationService.loadToken();
    const token = this.adminAuthenticationService.getToken();
    const request = httpRequest.clone({ setHeaders: { Authorization: `Bearer ${token}` }}); // what is this
    return httpHandler.handle(request);
    }
   return httpHandler.handle(httpRequest);
    
  }
}
