import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Bug } from '../model/bug';
@Injectable({providedIn: 'root'})
export class UserService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getBugs(): Observable<Bug[]> {
    return this.http.get<Bug[]>(`${this.host}/bug/list`);
  }

  public addBug(formData: FormData): Observable<Bug> {
    console.log(formData);
    return this.http.post<Bug>(`${this.host}/bug/addBug`, formData);
  }

  public updateBug(formData: FormData): Observable<Bug> {
    return this.http.post<Bug>(`${this.host}/bug/updateBug`, formData);
  }

  
  
  public deleteBug(bugId: string): void {
     this.http.delete(`${this.host}/bug/delete/${bugId}`).subscribe();
  }
  
   

  public createBugFormDate(bug: Bug, str: string): FormData {
    
    const formData = new FormData();
    
    formData.append('bugDescription', bug.bugDescription);
    
    formData.append('bugLocation', bug.bugLocation);
    formData.append('bugPriority', bug.bugPriority);
    formData.append('bugType', str);
    formData.append('isActive', JSON.stringify(bug.isActive));
    
    
    return formData;
  }
  public updateBugFormDate(bug: Bug,currentBugId:string,str: string): FormData {
  
    const formData = new FormData();
    formData.append('bugId',currentBugId)
    formData.append('bugDescription', bug.bugDescription);
    formData.append('bugLocation', bug.bugLocation);
    formData.append('bugPriority', bug.bugPriority);
    formData.append('bugType', str);
    formData.append('isActive', JSON.stringify(bug.isActive));
    
    
    return formData;
  }

}
