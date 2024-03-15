import { Component, Input } from '@angular/core';
import DataTable from 'datatables.net-dt';
import { SignInUser } from '../signInUser';


@Component({
  selector: 'app-sign-in-user-table',
  standalone: true,
  imports: [],
  templateUrl: './sign-in-user-table.component.html',
  styleUrl: './sign-in-user-table.component.css'
})
export class SignInUserTableComponent {
  @Input() signInUser?: SignInUser;
}
