import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from '../model/user';
import { NgForm } from '@angular/forms';
import { UserAuthenticationService } from '../service/user-authentication.service';
import { Router } from '@angular/router';
import { Bug } from '../model/bug';
import { NotificationService } from '../service/notification.service';
import { NotificationType } from '../enum/notification-type.enum';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { ProjectService } from '../service/project.service';
import { BugService } from '../service/bug.service';



@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.css']
})
export class BugComponent implements OnInit, OnDestroy {
  public bug: Bug;
  public selectedBugType = new Bug();
  private subscriptions: Subscription[] = [];
  public editUser = new User();
  public bugs: Bug[];
  public editBug = new Bug();
  public currentBugId: string;
  public currentProjectName: string = '';
  public formD: FormData;

  constructor(private bugService: BugService,private projectService: ProjectService,private router: Router, private authenticationService: UserAuthenticationService,
              private notificationService: NotificationService) {}

             
  ngOnInit(): void {
  this.currentProjectName =this.authenticationService.getProjectFromLocalCache();
    const formD = this.bugService.listProjectBugsForm(this.currentProjectName);
  
    this.subscriptions.push(
      this.projectService.listProjectBugs(formD).subscribe(
        (response: Bug[]) => {
          this.bugs = response;
          console.log(response);
         
        }
        
      )
    );
  
  }
  public listProjectBugs(projectName: FormData): void {
    
    this.subscriptions.push(
          this.bugService.listProjectBugs(projectName).subscribe(
            (response: Bug[]) => {
              this.bugs = response;
              console.log(response);
             
            }
            
          )
        );
  }
 
public selectChangeHandler(event: any){

  this.selectedBugType.bugType = event.target.value;
  console.log(this.selectedBugType);

}

  public onLogOut(): void {
    this.authenticationService.logOut();
    this.router.navigate(['/login']);
  }

  public stylefunc(str: string){
    var nstr = str.toLowerCase();
    if(nstr === 'high') return 1;
    else if (nstr === 'medium') return 2;
    else return 3;
  }
  public saveNewBug(): void {
    this.clickButton('new-bug-save');
  }

  public onAddNewBug(bugForm: NgForm): void {
    const formData = this.bugService.createBugFormDate(bugForm.value,this.selectedBugType); 
    console.log(formData);
    this.currentProjectName =this.authenticationService.getProjectFromLocalCache();
    const formD = this.projectService.listProjectBugsForm(this.currentProjectName);
  
    this.subscriptions.push(
      this.bugService.addBug(formData).subscribe( 
        (response: Bug) => {
          
          this.clickButton('new-bug-close'); // this will auto close the window by using DOM to click corrosponding to id in it
          bugForm.reset(); // resets what we put in entries, since when we input data, when we close pop-up and reopen it we want the form to be empty
          this.listProjectBugs(formD); 
          console.log(response);
          this.notificationService.sendNotification(NotificationType.SUCCESS, `Bug with ID ${response.bugId} added.`);

        },
        (error: HttpErrorResponse) => {
          this.notificationService.sendNotification(NotificationType.ERROR, error.error.message);
        }
      )
      );
  }
  
// created generic clickButton 
  private clickButton(buttonId: string): void {
    document.getElementById(buttonId).click();
  }

  public onUpdateBug(): void {
    const formData = this.bugService.updateBugFormDate(this.editBug,this.currentBugId,this.selectedBugType);
    this.currentProjectName =this.authenticationService.getProjectFromLocalCache();
    const formD = this.projectService.listProjectBugsForm(this.currentProjectName);
    console.log(formData);
    this.subscriptions.push(
      this.bugService.updateBug(formData).subscribe(
        (response: Bug) => {
          console.log(response);
          this.clickButton('closeEditBugModalButton');
          this.listProjectBugs(formD);

          this.notificationService.sendNotification(NotificationType.SUCCESS, `Bug with ID ${response.bugId} updated.`);

        },
        (error: HttpErrorResponse) => {
          this.notificationService.sendNotification(NotificationType.ERROR, error.error.message);
        }
        
      )
      );
  }
  
  public onDeleteBug(bugId: string): void {
    this.currentProjectName =this.authenticationService.getProjectFromLocalCache();
    const formD = this.projectService.listProjectBugsForm(this.currentProjectName);
    this.subscriptions.push(this.bugService.deleteBug(bugId).subscribe(
      (response: String) => {
          console.log(response);
          this.listProjectBugs(formD);
          this.notificationService.sendNotification(NotificationType.SUCCESS, `Bug with ID ${response} deleted.`);
      },
      (error: HttpErrorResponse) => {
        this.notificationService.sendNotification(NotificationType.ERROR, error.error.message);
      }
    )
    );
    
}

  public onEditBug(editBug: Bug): void {
    console.log(editBug);
    this.editBug = editBug;
    this.currentBugId = editBug.bugId;
    this.clickButton('openBugEdit');
  }
  private getUserRole(): string {
    return this.authenticationService.getUserFromLocalCache().role;
     
  }
 public get isManager(): boolean {
    return this.getUserRole() === 'ROLE_MANAGER';
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
 

}
