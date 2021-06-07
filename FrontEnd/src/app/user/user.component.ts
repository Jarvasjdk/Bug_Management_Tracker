import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { NgForm } from '@angular/forms';
import { UserAuthenticationService } from '../service/user-authentication.service';
import { Router } from '@angular/router';
import { Bug } from '../model/bug';
import { NotificationService } from '../service/notification.service';
import { NotificationType } from '../enum/notification-type.enum';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
 
  public bug: Bug;
  public selectedBugType: string = '';
  private subscriptions: Subscription[] = [];
  public editUser = new User();
  public bugs: Bug[];
  public editBug = new Bug();
  public currentBugId: string;

  constructor(private router: Router, private authenticationService: UserAuthenticationService,
              private userService: UserService,private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.getBugs(); 
  }
public selectChangeHandler(event: any){

  this.selectedBugType = event.target.value;
  console.log(this.selectedBugType);

}

  public onLogOut(): void {
    this.authenticationService.logOut();
    this.router.navigate(['/login']);
  }

  public getBugs(): void {
    
    this.subscriptions.push(
      this.userService.getBugs().subscribe(
        (response: Bug[]) => {
          this.bugs = response;
          console.log(response);
         
        },
        
      )
    );

  }
  

  public stylefunc(str: string){
    var nstr = str.toLowerCase();
    if(nstr === 'high') return 1;
    else if (nstr === 'medium') return 2;
    else return 3;
  }
  public saveNewBug(): void {
    this.clickButton('new-bug-save');
  }

  public onAddNewBug(bugForm: NgForm): void {
    
    const formData = this.userService.createBugFormDate(bugForm.value,this.selectedBugType); 
    console.log(formData);
    this.subscriptions.push(
      this.userService.addBug(formData).subscribe( 
        (response: Bug) => {
          
          this.clickButton('new-bug-close'); // this will auto close the window by using DOM to click corrosponding to id in it
          bugForm.reset(); // resets what we put in entries, since when we input data, when we close pop-up and reopen it we want the form to be empty
          this.getBugs(); 
          console.log(response);
          this.notificationService.sendNotification(NotificationType.SUCCESS, `Bug with ID ${response.bugId} added.`);

        },
        
      )
      );
  }
  
// created generic clickButton 
  private clickButton(buttonId: string): void {
    document.getElementById(buttonId).click();
  }

  

  public onUpdateBug(): void {
    const formData = this.userService.updateBugFormDate(this.editBug,this.currentBugId,this.selectedBugType);
    console.log(formData);
    this.subscriptions.push(
      this.userService.updateBug(formData).subscribe(
        (response: Bug) => {
          console.log(response);
          this.clickButton('closeEditBugModalButton');
          this.getBugs();

          this.notificationService.sendNotification(NotificationType.SUCCESS, `Bug with ID ${response.bugId} updated.`);

        }
        
      )
      );
  }
  
  public onDeleteBug(bugId: string): void {
   
    this.userService.deleteBug(bugId);
    this.getBugs();
}

  public onEditBug(editBug: Bug): void {
    console.log(editBug);
    this.editBug = editBug;
    this.currentBugId = editBug.bugId;
    this.clickButton('openBugEdit');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
 

}
