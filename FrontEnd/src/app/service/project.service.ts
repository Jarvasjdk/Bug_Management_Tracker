import { Injectable } from '@angular/core';
import { Project } from '../model/project';
import { User } from '../model/user';
import { ProjectComponent } from '../project/project.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Bug } from '../model/bug';



@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private host = environment.apiUrl;


  constructor(private http: HttpClient) { }

 
  public listProjectByUserName(username: string): FormData
{
  const formData = new FormData();

  formData.append('username', username);
  return formData;
 
}
public addProject(formData: FormData): Observable<Project> {
  console.log(formData);
  return this.http.post<Project>(`${this.host}/project/createProject`, formData);
}
public createProjectFormDate(project: Project): FormData {
    
  const formData = new FormData();
  
  formData.append('projectName', project.projectName);
  
  formData.append('projectDescription', project.projectDescription);
 
  return formData;
}
// public listProjectBugs(formData: FormData): Observable<Project>
// {
//     return this.http.post<Project>(`${this.host}/project/listProjectBugs`,formData);
//   }


public listProjectBugsForm(project: string): FormData
{
  const formData = new FormData();
  formData.append('projectName', project);
  
return formData;
}
public getProjects(formData: FormData): Observable<Project[]> {
  return this.http.post<Project[]>(`${this.host}/project/listUserAssignedProjects`,formData);
}
public listProjectBugs(formData: FormData): Observable<Bug[]>
{
    return this.http.post<Bug[]>(`${this.host}/project/listProjectBugs`,formData);
  }
}
