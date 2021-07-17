import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import {  Subscription } from 'rxjs';
import { UserAuthenticationService } from '../service/user-authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../service/notification.service';
import { NotificationType } from '../enum/notification-type.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private subscriptions: Subscription[] = []; 

  constructor(private router: Router, private userAuthenticationService: UserAuthenticationService,
    private notificationService: NotificationService) {}

  ngOnInit(): void {
   
  }

 
  public onLogin(user: User): void {
    
    this.subscriptions.push(
      this.userAuthenticationService.login(user).subscribe(
        (response: HttpResponse<User>) => { 
          const token = response.headers.get("Jwt-Token");
          this.userAuthenticationService.saveToken(token); 
          this.userAuthenticationService.addUserToLocalCache(response.body);

          this.router.navigateByUrl('/project'); 
        },
        (errorResponse: HttpErrorResponse) => {
          this.notificationService.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          //this.showLoading = false;
        }
        
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
