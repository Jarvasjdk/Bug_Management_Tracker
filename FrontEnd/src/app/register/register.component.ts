import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserAuthenticationService } from '../service/user-authentication.service';
import { User } from '../model/user';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../service/notification.service';
import { NotificationType } from '../enum/notification-type.enum';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private userAuthenticationService: UserAuthenticationService,private notificationService: NotificationService) {}

  ngOnInit(): void { 
    
  }

  // public onRegister(user: User): void {
    
  //     this.subscriptions.push(
  //       this.userAuthenticationService.register(user).subscribe(
  //       (response: User) => {
  //        // this.showLoading = false;
  //        console.log(response);
  //         this.sendNotification(NotificationType.SUCCESS, `A new account was created for ${response.firstName}. Please check your email for password to log in.`);
  //       },
  //       (errorResponse: HttpErrorResponse) => {
  //         this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
  //         //this.showLoading = false;
  //       }
  //       )
  //     );
    
  //     }

   public onRegister(user: User): void {
    
      this.subscriptions.push(
        this.userAuthenticationService.register(user).subscribe(
        (response: User) => {
         // this.showLoading = false;
         console.log(response);
          this.notificationService.sendNotification(NotificationType.SUCCESS, `A new account was created for ${response.firstName}.`);
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





