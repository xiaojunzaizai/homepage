import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SignInUserService } from '../sign-in-user.service';
import { SignInAuthService } from '../sign-in-auth.service';
import { SignInUser } from '../signInUser';
import { cleanUpDateAndTime, adjustMinutes, compareDateAndTime, setDivVisibility } from '../util-tool/utilManagement';
import DataTable from 'datatables.net-dt';
declare var $: any;

@Component({
  selector: 'app-sign-in-detail',
  templateUrl: './sign-in-detail.component.html',
  styleUrls: ['./sign-in-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignInDetailComponent implements OnInit, AfterViewInit{

  signInUser: SignInUser | undefined;
  selectedDate= new Date();
  selectedTime= adjustMinutes(new Date());
  defaultTimeOpenValue = new Date(0, 0, 0, 0, 0, 0);
  IsAbleToCheckIn?: boolean = false;
  loading: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private signInUserService: SignInUserService,
    private signInAuthService: SignInAuthService,
    private location: Location,
  ) {}

  ngOnInit(): void{
    setDivVisibility(this.loading);
    this.getsignInUserDetail();
  }

  ngAfterViewInit(): void {
  }

  getsignInUserDetail(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.signInAuthService.updateUserId(id);
    this.signInUserService.getSignInUser(id)
      .subscribe(signInUser => {
        this.signInUser = signInUser;
        this.verifyDateAndTime();
        this.loading = false;
        setDivVisibility(this.loading);
        console.log(this.signInUser);
      });
  }

  // add some check condition to prevernt when nothing selected , user can click check in button.
  verifyDateAndTime():void{
    if(this.signInUser?.signDate && 
      this.selectedDate && this.selectedTime){
        if(this.signInUser.signDate.length>=0 ){
          this.IsAbleToCheckIn = compareDateAndTime(this.signInUser?.signDate,this.selectedDate, this.selectedTime);
        } else {
          // sign in user date has error. length  is negative
          this.IsAbleToCheckIn=false;
        }
      }
      else {
        this.IsAbleToCheckIn=false;
      }
  }

  reload():void{
    // window.location.reload();
    this.loading = true;
    setDivVisibility(this.loading);
    this.getsignInUserDetail();
  }

  //check in button
  checkIn(){
    const selectedDateAndTime = cleanUpDateAndTime(this.selectedDate,this.selectedTime);
    if (this.IsAbleToCheckIn && this.signInUser){
      this.signInUser.signDate.push(selectedDateAndTime);
      this.signInUserService.updateSignInUser(this.signInUser).subscribe(()=>this.reload());
    }
    
  }
}
