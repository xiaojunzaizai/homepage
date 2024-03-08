import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignInUserService } from '../sign-in-user.service';
import { SignInUser } from '../signInUser';
import { SignInAuthService } from '../sign-in-auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit{
homeToolTip = 'home';
selectedUserToolTip = '';
selectedUser=false;
signInUser: SignInUser | undefined;
userId: number | null = null;
private subscription: Subscription = new Subscription();

constructor(
  private route: ActivatedRoute,
  private signInUserService: SignInUserService,
  private signInAuthService: SignInAuthService
) {}

ngOnInit(): void{
  this.subscription.add(this.signInAuthService.userId$.subscribe(id => {
    this.userId = id;
    if (id) {
      this.getsignInUserDetail(id);
    } else {
      this.selectedUser=false;
    }
  }));
}
getsignInUserDetail(id: number): void {
  if(id>=0){
    this.signInUserService.getSignInUser(id)
    .subscribe(signInUser => {
      this.signInUser = signInUser;
      this.selectedUser=true;
      this.selectedUserToolTip = `${signInUser.firstName} ${signInUser.middleName} ${signInUser.lastName}`;
    });
  } else{
    this.selectedUser=false; 
  }
}
}
