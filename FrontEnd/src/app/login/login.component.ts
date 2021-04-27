import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import {  Subscription } from 'rxjs';
import { UserAuthenticationService } from '../service/user-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private subscriptions: Subscription[] = []; 

  constructor(private router: Router, private userAuthenticationService: UserAuthenticationService
            ) {}

  ngOnInit(): void {
   
  }

 
  public onLogin(user: User): void {
    
    this.subscriptions.push(
      this.userAuthenticationService.login(user).subscribe(
        (response: HttpResponse<User>) => { 
          const token = response.headers.get("Jwt-Token");
          this.userAuthenticationService.saveToken(token); 
          this.router.navigateByUrl('/user'); 
        } 
        
      )
    );
  }

 

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
