import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../model/user';
import { AdminAuthenticationService } from '../service/admin-authentication.service';
import { Router } from '@angular/router';
import { AdminService } from '../service/admin.service';
import { Admin } from '../model/admin';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
 
  public users: User[];
  
  public admin: Admin;
  public selectedUser: User;
  private subscriptions: Subscription[] = [];
  

  constructor(private router: Router, private adminAuthenticationService: AdminAuthenticationService,
              private adminService: AdminService) {}

  ngOnInit(): void { 
   
    this.getUsers(); 
  }
  public onLogOut(): void {
    this.adminAuthenticationService.logOut();
    this.router.navigate(['/adminPortal']);
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
   
    this.adminService.deleteUser(username);
    this.getUsers(); 
}


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
