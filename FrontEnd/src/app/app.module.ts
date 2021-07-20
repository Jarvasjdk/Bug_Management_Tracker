import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { UserAuthenticationService } from './service/user-authentication.service';
import { AdminAuthenticationService } from './service/admin-authentication.service';
import { UserService } from './service/user.service';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminAuthInterceptor } from './interceptor/auth.admin-interceptor';
import { NotificationModule } from './notification.module';
import { NotificationService } from './service/notification.service';
import { ProjectComponent } from './project/project.component';
import { ProjectService } from './service/project.service';
import { BugComponent } from './bug/bug.component';
import { BugService } from './service/bug.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    AdminComponent,
    AdminLoginComponent,
    ProjectComponent,
    BugComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NotificationModule,
    
    
  ],
  providers: [ NotificationService, UserAuthenticationService,AdminAuthenticationService, UserService, ProjectService, BugService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  {provide: HTTP_INTERCEPTORS, useClass: AdminAuthInterceptor, multi: true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
