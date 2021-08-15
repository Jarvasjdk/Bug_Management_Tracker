import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { Project } from '../model/project';



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
    // this cannot be of type void since the interceptor needs something to return
  // this doesnt return an observable and it should since my interceptor must return an observable
   public register(user: User): Observable<User> {
    return this.http.post<User>(`${this.host}/user/register`, user);
  
  }
  // note you dont want to subscibe here since you would need to unsubsribe, its best to keep everythin organized
  // so do not subscribe here
  
  
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
  public addUserToLocalCache(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }
public getUserFromLocalCache(): User {
    return JSON.parse(localStorage.getItem('user')); 
  }

  public addUserNameToLocalCache(user: string): void {
    localStorage.setItem('username', JSON.stringify(user));
  }
public getUserNameFromLocalCache(): string {
    return JSON.parse(localStorage.getItem('username')); 
  }

  public addProjectNameToLocalCache(project: string): void {
    localStorage.setItem('projectName', JSON.stringify(project));
  }
public getProjectNameFromLocalCache(): string {
    return JSON.parse(localStorage.getItem('projectName')); 
  }
  public addProjectDescriptionToLocalCache(project: string): void {
     localStorage.setItem('projectDescription', JSON.stringify(project));
  }
public getProjectDescriptionToLocalCache(): string {
    return JSON.parse(localStorage.getItem('projectDescription')); 
  }
 

}
