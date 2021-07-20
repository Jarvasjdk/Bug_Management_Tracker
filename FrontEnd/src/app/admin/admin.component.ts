import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../model/user';
import { AdminAuthenticationService } from '../service/admin-authentication.service';
import { Router } from '@angular/router';
import { AdminService } from '../service/admin.service';
import { Admin } from '../model/admin';
import { UserAuthenticationService } from '../service/user-authentication.service';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
 
  public users: User[];
  
  public admin: Admin;
  public selectedUser = new User();
  private subscriptions: Subscription[] = [];
  public userName: string;
  

  constructor(private userService: UserService,private userAuthenticationService: UserAuthenticationService ,private router: Router, private adminAuthenticationService: AdminAuthenticationService,
              private adminService: AdminService) {}

  ngOnInit(): void { 
   
    this.getUsers(); 
  }
  public onLogOut(): void {
    this.adminAuthenticationService.logOut();
    this.router.navigate(['/adminPortal']);
  }
  public selectChangeHandler(event: any){

    this.selectedUser.role = event.target.value;
    console.log(this.selectedUser);
  
  }
  public saveUsername(username: string): void{
   // localStorage.removeItem('user');
    this.userAuthenticationService.addUserNameToLocalCache(username);
    this.userName = this.userAuthenticationService.getUserNameFromLocalCache();
    console.log(username);
  }
  private clickButton(buttonId: string): void {
    document.getElementById(buttonId).click();
  }
  public updateUserRole(): void {
this.userName = this.userAuthenticationService.getUserNameFromLocalCache();
const form = this.adminService.updateUserRoleForm(this.userName,this.selectedUser);
    this.subscriptions.push(
      this.adminService.updateUserRole(form).subscribe(
        (response: User) => {
            this.getUsers();
            this.clickButton('close');
        }
      )
    );
  }

  public getUsers(): void {
  
   
    this.subscriptions.push(
      this.adminService.getUsers().subscribe(
        (response: User[]) => {
          this.users = response;
        
        }
      )
    );

  }


  public onDeleteUser(username: string): void {
   
    this.subscriptions.push(this.adminService.deleteUser(username).subscribe(
      (response: User) =>{
        console.log(response);
        this.getUsers();
      }
    )
    );
    
}

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
