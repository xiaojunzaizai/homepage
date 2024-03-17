import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { SignInUser } from '../interface/signInUser';
import { signInUserColumns } from '../column-setup/sign-in-user-columns';
import { consoleLog, formatDateAndTimeList } from '../util-tool/utilManagement';
// import { ColumnItems } from '../interface/column-items';
// import { compareAsc, parseISO } from 'date-fns';


@Component({
  selector: 'app-sign-in-user-table',
  templateUrl: './sign-in-user-table.component.html',
  styleUrl: './sign-in-user-table.component.css'
})
export class SignInUserTableComponent implements OnInit, OnChanges{

  @Input() signInUser!: SignInUser;
  @Input() loading: boolean = false;
  signInDateList: string[] =[];
  widthConfig: string[] = ['100px', '1fr', '2fr'];

  
  listOfColumns=signInUserColumns;

  ngOnInit(): void {
    this.signInDateList = formatDateAndTimeList(this.signInUser.signDate);
  }

  ngOnChanges(): void {
    consoleLog('SignInUserTableComponent', this.signInUser);
    this.signInDateList = formatDateAndTimeList(this.signInUser.signDate);
  }

}
