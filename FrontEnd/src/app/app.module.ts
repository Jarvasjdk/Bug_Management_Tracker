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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    AdminComponent,
    AdminLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
    
    
  ],
  providers: [  UserAuthenticationService,AdminAuthenticationService, UserService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  {provide: HTTP_INTERCEPTORS, useClass: AdminAuthInterceptor, multi: true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
