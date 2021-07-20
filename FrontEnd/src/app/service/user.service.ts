import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Bug } from '../model/bug';
import { User } from '../model/user';

import { ProjectService } from '../service/project.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Injectable({providedIn: 'root'})
export class UserService {
  private host = environment.apiUrl;
  private subscriptions: Subscription[] = [];
  public bugs: Bug[];
 

    constructor(private router: Router,private http: HttpClient, private projectService: ProjectService) {}


//   public getBugs(): Observable<Bug[]> {
//     return this.http.get<Bug[]>(`${this.host}/bug/list`);
//   }
  
//   public listProjectBugs(projectName: FormData): Observable<Bug[]>
// {
//     return this.http.post<Bug[]>(`${this.host}/bug/listProjectBugs`,projectName);
//   }



// public listProjectBugsForm(project: string): FormData
// {
//   const formData = new FormData();
//   formData.append('projectName', project);
  
// return formData;
// }
// public getProjectName(form: FormData): void
// {

//    localStorage.setItem('form-data', JSON.stringify(form));
//    this.router.navigate(['/user']);
   
// }


//   public addBug(formData: FormData): Observable<Bug> {
//     console.log(formData);
//     return this.http.post<Bug>(`${this.host}/bug/addBug`, formData);
//   }
 

//   public updateBug(formData: FormData): Observable<Bug> {
//     return this.http.post<Bug>(`${this.host}/bug/updateBug`, formData);
//   }

  
  
//   public deleteBug(bugId: string): Observable<any> {
//      return this.http.delete(`${this.host}/bug/delete/${bugId}`);
//   }
  

//   public createBugFormDate(bug: Bug, str: string): FormData {
    
//     const formData = new FormData();
    
//     formData.append('bugDescription', bug.bugDescription);
    
//     formData.append('bugLocation', bug.bugLocation);
//     formData.append('bugPriority', bug.bugPriority);
//     formData.append('bugType', str);
//     formData.append('isActive', JSON.stringify(bug.isActive));
//     formData.append('projectName',bug.projectName);
    
    
//     return formData;
//   }
 
//   public updateBugFormDate(bug: Bug,currentBugId:string,str: string): FormData {
  
//     const formData = new FormData();
//     formData.append('bugId',currentBugId)
//     formData.append('bugDescription', bug.bugDescription);
//     formData.append('bugLocation', bug.bugLocation);
//     formData.append('bugPriority', bug.bugPriority);
//     formData.append('bugType', str);
//     formData.append('isActive', JSON.stringify(bug.isActive));
    
    
//     return formData;
//   }
//   public getBugs(): Observable<Bug[]> {
//     return this.http.get<Bug[]>(`${this.host}/bug/list`);
//   }
public getProjectUsers(str: FormData): Observable<User[]> {
  return this.http.post<User[]>(`${this.host}/user/listProjectUsers`,str);
}
public getUsers(): Observable<User[]> {
  return this.http.get<User[]>(`${this.host}/user/list`);
}

public assignProjectAndUser(form: FormData): Observable<User> {
  return this.http.post<User>(`${this.host}/project/assignProjectToUser`,form);
}
public assignUserToProject(project: string,user: User): FormData
{
  const formData = new FormData();
  formData.append('projectName', project);
  formData.append('username', user.username);
  
return formData;
}
public listProjectUsers(project: string): FormData
{
  const formData = new FormData();
  formData.append('projectName', project);
  
return formData;
}


}
