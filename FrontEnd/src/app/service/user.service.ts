import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Bug } from '../model/bug';

import { ProjectService } from '../service/project.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({providedIn: 'root'})
export class UserService {
  private host = environment.apiUrl;
  private subscriptions: Subscription[] = [];
  public bugs: Bug[];
 

    constructor(private router: Router,private http: HttpClient, private projectService: ProjectService) {}


  public getBugs(): Observable<Bug[]> {
    return this.http.get<Bug[]>(`${this.host}/bug/list`);
  }
  
  public listProjectBugs(formData: FormData): Observable<Bug[]>
{
    return this.http.post<Bug[]>(`${this.host}/project/listProjectBugs`,formData);
  }



public listProjectBugsForm(project: string): FormData
{
  const formData = new FormData();
  formData.append('projectName', project);
  
return formData;
}
public getProjectName(form: FormData): void
{
  
  
   localStorage.setItem('form-data', JSON.stringify(form));
   this.router.navigate(['/user']);
   
}


  public addBug(formData: FormData): Observable<Bug> {
    console.log(formData);
    return this.http.post<Bug>(`${this.host}/bug/addBug`, formData);
  }
 

  public updateBug(formData: FormData): Observable<Bug> {
    return this.http.post<Bug>(`${this.host}/bug/updateBug`, formData);
  }

  
  
  public deleteBug(bugId: string): Observable<any> {
     return this.http.delete(`${this.host}/bug/delete/${bugId}`);
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
