import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserAuthenticationService } from '../service/user-authentication.service';
import { User } from '../model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private userAuthenticationService: UserAuthenticationService) {}

  ngOnInit(): void { 
    
  }

  public onRegister(user: User): void {
    
      this.subscriptions.push(
        this.userAuthenticationService.register(user).subscribe()
        );
        
  }



  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
