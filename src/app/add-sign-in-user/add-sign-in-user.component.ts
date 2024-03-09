import { Component, OnInit } from '@angular/core';
import { SignInAuthService } from '../sign-in-auth.service';

@Component({
  selector: 'app-add-sign-in-user',
  templateUrl: './add-sign-in-user.component.html',
  styleUrl: './add-sign-in-user.component.css'
})
export class AddSignInUserComponent implements OnInit {

  constructor(private signInAuthService: SignInAuthService){}

  ngOnInit(): void {
    this.signInAuthService.updateUserId(-1);
  }

}
