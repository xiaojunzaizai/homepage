import { Component, Input } from '@angular/core';
import { SignInUser } from '../signInUser';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {

    @Input() signInUser?: SignInUser;
}
