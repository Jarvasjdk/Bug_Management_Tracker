import { Component, OnInit } from '@angular/core';
import { Admin } from '../model/admin';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AdminAuthenticationService } from '../service/admin-authentication.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  private subscriptions: Subscription[] = []; // so we dont know the array here since we only call one subscribe method, but if we have multiple subscribe calls for like diff methods then yea an array would be best

  constructor(private router: Router, private adminAuthenticationService: AdminAuthenticationService,
              ) {}

  ngOnInit(): void {
    
  }

  public onLogin(admin: Admin): void {
    this.subscriptions.push(
      this.adminAuthenticationService.login(admin).subscribe(
        (response: HttpResponse<Admin>) => { // when we get a reponse perform this
          const token = response.headers.get("Jwt-Token");
          this.adminAuthenticationService.saveToken(token); // save it so we can pass token with user when user is authenticated
          this.router.navigateByUrl('/adminPage'); 
        } 
       
      )
    );
  }

 
  

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
