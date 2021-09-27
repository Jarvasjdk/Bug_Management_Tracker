import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { UserAuthenticationService } from '../service/user-authentication.service';
import { Router } from '@angular/router';
import { Project } from '../model/project';
import { Bug } from '../model/bug';
import { User } from '../model/user';


import { NotificationService } from '../service/notification.service';
import { NotificationType } from '../enum/notification-type.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { ProjectService } from '../service/project.service';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private userAuthenticationService: UserAuthenticationService,private router: Router, private authenticationService: UserAuthenticationService, private projectService: ProjectService, private notificationService:  NotificationService,private userService: UserService
    
) {}
  public project: Project;
  public selectedProjectType: string = '';
  private subscriptions: Subscription[] = []; 
  public projects: Project[];
  public currentUsername: string = '';
  public test: boolean;
  public t: string = '';
  public bugs: Bug[];
  public role: User;

  
  ngOnInit(): void {
    if(this.getUserRole() === 'ROLE_MANAGER'){
      this.t = 'Manager';
      this.getProjects();
    }
    else{
      this.t = 'User';
      this.getProjectsAssignedToUser(); 
    }
   
  }
  public getProjects(): void {
this.subscriptions.push(
  this.projectService.getProjects().subscribe(
    (response: Project[]) => {
        this.projects = response;
    }
  )
);
  }

public getRole(): void {
  
  
} 
public selectChangeHandler(event: any){

  this.selectedProjectType = event.target.value;
  console.log(this.selectedProjectType);

}

  public onLogOut(): void {
    this.authenticationService.logOut();
   
    localStorage.removeItem('proj');
    this.router.navigate(['/login']);
  }
  private getUserRole(): string {
    
   return  this.authenticationService.getUserFromLocalCache().role;
   
  }
 public get isManager(): boolean {
   this.test =this.getUserRole() === 'ROLE_MANAGER'; 
   console.log(this.test);
    return this.getUserRole() === 'ROLE_MANAGER'; 
  }

public ManageUsers():void{

}
// get projects assigned to user
  public getProjectsAssignedToUser(): void {
    this.currentUsername = this.authenticationService.getUserFromLocalCache().username; // returns a string
    
    const formData =this.projectService.listProjectByUserName(this.currentUsername); 

    this.subscriptions.push(
      this.projectService.getProjectsAssignedToUser(formData).subscribe(
        (response: Project[]) => {
          this.projects = response;
          console.log(response);
         
        }
        
      )
    );

  }
  // list bugs // want to list users assigned to project, and project name/description
  public navToBug(projectName:string,projectDescription:string): void {
    localStorage.removeItem('projectName');
    localStorage.removeItem('projectDescription');
    this.userAuthenticationService.addProjectNameToLocalCache(projectName);
    this.userAuthenticationService.addProjectDescriptionToLocalCache(projectDescription);
    this.t = this.userAuthenticationService.getProjectNameFromLocalCache();

    this.router.navigate(['/bug']);

 }
 public navToManager(project:string): void {
  this.userAuthenticationService.addProjectNameToLocalCache(project);
  this.t = this.userAuthenticationService.getProjectNameFromLocalCache();
  this.router.navigate(['/user']);

}

public listProjectBugs(projectName: Project): void {
  
  console.log(projectName);
  localStorage.setItem('projectName',JSON.stringify(projectName));
  this.router.navigate(['/bug']);

  
  }
  
  public stylefunc(str: string){
    var nstr = str.toLowerCase();
    if(nstr === 'high') return 1;
    else if (nstr === 'medium') return 2;
    else return 3;
  }
  public saveNewProject(): void {
    this.clickButton('new-project-save');
  }
  

  public onAddNewProject(projectForm: NgForm): void {
    
    const formData = this.projectService.createProjectFormDate(projectForm.value); 
    console.log(formData);
    this.subscriptions.push(
      this.projectService.addProject(formData).subscribe( 
        (response: Project) => {
          
          this.clickButton('new-project-close'); 
          projectForm.reset(); 
          this.getProjects(); 
          console.log(response);
          this.notificationService.sendNotification(NotificationType.SUCCESS, ` ${response.projectName} added.`);

        },
        (error: HttpErrorResponse) => {
          this.notificationService.sendNotification(NotificationType.ERROR, error.error.message);
        }
      )
      );
  }
  
  private clickButton(buttonId: string): void {
    document.getElementById(buttonId).click();
  }

  

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  
    
}


  
 


