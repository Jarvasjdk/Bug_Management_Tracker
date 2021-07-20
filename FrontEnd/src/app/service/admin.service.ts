import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { NgForm } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.host}/user/list`);
  }
  public updateUserRole(user: FormData): Observable<User> {
    return this.http.post<User>(`${this.host}/adminPortal/updateUserRole`,user);
  }

  public deleteUser(username: string): Observable<User> {
    return this.http.delete<User>(`${this.host}/adminPortal/delete/${username}`);
 }

  public addUsersToLocalCache(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  public getUsersFromLocalCache(): User[] {
    if (localStorage.getItem('users')) {
        return JSON.parse(localStorage.getItem('users'));
    }
    return null;
  }
  public updateUserRoleForm(username: string,selectedUser: User): FormData
{
  const formData = new FormData();
  formData.append('role', selectedUser.role);
  formData.append('username', username);
  
return formData;
}

}