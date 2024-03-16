import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SignInUserService } from '../services/sign-in-user.service';
import { SignInAuthService } from '../services/sign-in-auth.service';
import { SignInUser } from '../interface/signInUser';
import { cleanUpDateAndTime, adjustMinutes, adjustDay ,compareDateAndTime, setDivVisibility, consoleLog, consoleError } from '../util-tool/utilManagement';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { differenceInCalendarDays } from 'date-fns';
import { disableDate } from '../util-tool/dateTimeUtil';
declare var $: any;

@Component({
  selector: 'app-sign-in-detail',
  templateUrl: './sign-in-detail.component.html',
  styleUrls: ['./sign-in-detail.component.css'],
})
export class SignInDetailComponent implements OnInit, AfterViewInit{

  signInUser?: SignInUser;
  IsAbleToCheckIn?: boolean = false;
  loading: boolean = true;
  defaultTimeOpenValue = new Date(0, 0, 0, 0, 0, 0);
  
  validateSelectDateAndTimeForm!: FormGroup<{
    selectDate: FormControl<Date|undefined>;
    selectTime: FormControl<Date|undefined>;
  }>;

  disabledDate = disableDate();

  constructor(
    private route: ActivatedRoute,
    private signInUserService: SignInUserService,
    private signInAuthService: SignInAuthService,
    private fb: NonNullableFormBuilder,
    private location: Location,
  ) {
    this.validateSelectDateAndTimeForm=this.fb.group({
      selectDate:this.fb.control<Date|undefined>(adjustDay(new Date()), Validators.required),
      selectTime:this.fb.control<Date|undefined>(adjustMinutes(new Date()),Validators.required)
    });
  }

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
      });
  }

  // add some check condition to prevernt when nothing selected , user can click check in button.
  verifyDateAndTime():void{
    const selectedDate = this.validateSelectDateAndTimeForm.value.selectDate;
    const selectedTime = this.validateSelectDateAndTimeForm.value.selectTime;
    if(this.signInUser?.signDate && 
      selectedDate && selectedTime){
        if(this.signInUser.signDate.length>=0 ){
          this.IsAbleToCheckIn = compareDateAndTime(this.signInUser?.signDate,selectedDate, selectedTime);
        } else {
          // sign in user date has error. length  is negative
          this.IsAbleToCheckIn=false;
        }
      }
      else {
        this.IsAbleToCheckIn=false;
      }
  }

  verifyTime():void{
    this.validateSelectDateAndTimeForm.controls.selectTime.patchValue(adjustMinutes(this.validateSelectDateAndTimeForm.value.selectTime),{ emitEvent: false });
    this.verifyDateAndTime();
  }

  reload():void{
    // window.location.reload();
    this.loading = true;
    setDivVisibility(this.loading);
    this.getsignInUserDetail();
  }

  submitForm():void{
    if(this.validateSelectDateAndTimeForm.valid){
      const selectedDateAndTime = cleanUpDateAndTime(this.validateSelectDateAndTimeForm.value.selectDate,this.validateSelectDateAndTimeForm.value.selectTime);
      if (this.IsAbleToCheckIn && this.signInUser && selectedDateAndTime !== ''){
        this.signInUser.signDate.push(selectedDateAndTime);
        this.signInUserService.updateSignInUser(this.signInUser).subscribe(()=>this.reload());
      }
      
    } else {
      Object.values(this.validateSelectDateAndTimeForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
          consoleError('SignInDetailComponent','check in failed due to invalid input');
        }
      });
    }
  }
}
