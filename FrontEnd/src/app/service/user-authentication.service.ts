import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../model/user';


@Injectable({providedIn: 'root'})
export class UserAuthenticationService {
  public host = environment.apiUrl;
  private token: string;
  private loggedInUsername: string;
  constructor(private http: HttpClient) {}
 
  public login(user: User): Observable<HttpResponse<User>> { // its diff since were getting the token, since we need to obtain the token
       return this.http.post<User>(`${this.host}/user/login`, user, { observe: 'response' });
     }

    
     public logOut(): void {
      this.token = null;
      this.loggedInUsername = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('users');
    }
  
   public register(user: User): void {
     this.http.post<User>(`${this.host}/user/register`, user).subscribe();
  }
  
  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  public getToken(): string {
    return this.token;
  }

 

}
