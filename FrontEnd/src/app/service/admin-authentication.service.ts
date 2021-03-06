import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
 import { Admin } from '../model/admin';


@Injectable({providedIn: 'root'})
export class AdminAuthenticationService {
  public host = environment.apiUrl;
  private token: string;
  constructor(private http: HttpClient) {}
  public login(admin: Admin): Observable<HttpResponse<Admin>> { 
      
    return this.http.post<Admin>(`${this.host}/adminPortal/login`, admin, { observe: 'response' }); // observe will return headers which is where token is, it basically gives us access to headers, we needto return headers
  }

  public logOut(): void {
    this.token = null;
    localStorage.removeItem('token');
    
    
  }

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token); // store the actual token in the string
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  public getToken(): string {
    return this.token;
  }

  

}
