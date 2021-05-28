import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuthenticationService } from '../service/user-authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userAuthenticationService: UserAuthenticationService) {}

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if (httpRequest.url.includes(`${this.userAuthenticationService.host}/user/login`)) {
      return httpHandler.handle(httpRequest);
    }
    if (httpRequest.url.includes(`${this.userAuthenticationService.host}/user/register`)) {
      return httpHandler.handle(httpRequest);
    }
    if(!httpRequest.url.includes(`${this.userAuthenticationService.host}/adminPortal/login`) && !httpRequest.url.includes(`${this.userAuthenticationService.host}/user/login`) && !httpRequest.url.includes(`${this.userAuthenticationService.host}/user/register`) ){
    this.userAuthenticationService.loadToken();
    const token = this.userAuthenticationService.getToken();
    const request = httpRequest.clone({ setHeaders: { Authorization: `Bearer ${token}` }});
    return httpHandler.handle(request);
    }
    return httpHandler.handle(httpRequest);
  }
}
