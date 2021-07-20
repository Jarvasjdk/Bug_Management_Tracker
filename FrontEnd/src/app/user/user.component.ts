import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { NgForm } from '@angular/forms';
import { UserAuthenticationService } from '../service/user-authentication.service';
import { Router } from '@angular/router';
import { Bug } from '../model/bug';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy 
  {
  public bug: Bug;
  public users: User[];
  public projectUsers: User[];
  public selectedUser = new User();
  private subscriptions: Subscription[] = [];
  public editUser = new User();
  public bugs: Bug[];
  public editBug = new Bug();
  public currentBugId: string;
  public currentProjectName: string = '';
  public formD: FormData;
  public currentProjectN = this.authenticationService.getProjectFromLocalCache();

  constructor(private router: Router, private authenticationService: UserAuthenticationService,
              private userService: UserService) {}
             
  ngOnInit(): void { 
    
this.listProjectUsers();
  this.getUsers();
  
  }
  public getUsers(): void {
  
   
    this.subscriptions.push(
      this.userService.getUsers().subscribe(
        (response: User[]) => {
          this.users = response;
        
        }
      )
    );

  }
  public listProjectUsers(): void {
  
    this.currentProjectName = this.authenticationService.getProjectFromLocalCache();
    const formD = this.userService.listProjectUsers(this.currentProjectName);

    this.subscriptions.push(
      this.userService.getProjectUsers(formD).subscribe(
        (response: User[]) => {
          this.projectUsers = response;
        
        }
      )
    );

  }


  public onLogOut(): void {
    this.authenticationService.logOut();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  // assign project and user to itself
  public assignProjectAndUser(username: NgForm): void
  {
    this.currentProjectName=this.authenticationService.getProjectFromLocalCache();
    console.log(this.selectedUser)
    const formD = this.userService.assignUserToProject(this.currentProjectName,this.selectedUser);
    this.subscriptions.push(
      this.userService.assignProjectAndUser(formD).subscribe(
        (response: User) =>{
          console.log(response);
          this.clickButton('close')
          this.listProjectUsers();
        }
      )
    );
    
  }
  public saveAssignedUser(): void {
    this.clickButton('save-assigned-user');
  }
  private clickButton(buttonId: string): void {
    document.getElementById(buttonId).click();
  }
  
  
  public selectChangeHandler(event: any){

    this.selectedUser.username = event.target.value;
    console.log(this.selectedUser);
  
  }
 
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
 

}
