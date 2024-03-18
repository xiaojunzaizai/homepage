import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged,switchMap } from 'rxjs/operators';
import { SignInUser } from '../interface/signInUser';
import { SignInUserService } from '../services/sign-in-user.service';
import { SignInAuthService } from '../services/sign-in-auth.service';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { consoleLog, consoleError } from '../util-tool/utilManagement';
import { TokenService } from '../services/token.service';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  signInToolTip = 'Sign In';

  private searchTerms = new Subject<string>();

  signInUsers!:SignInUser[];

  isLoading: boolean = false;

  isExisted: boolean = true;

  isShowError: boolean = false;

  validateSearchUserForm!: FormGroup<{
    selectedSignInUserId: FormControl<number |null>;
    isChecked: FormControl<boolean>;
  }>;


  constructor (private signInUserService: SignInUserService,
    private signInAuthService: SignInAuthService,
    private router: Router,
    private tokenService: TokenService,
    private storageService: StorageService,
    private fb: NonNullableFormBuilder){
      this.validateSearchUserForm=this.fb.group({
        selectedSignInUserId:this.fb.control<number | null>(null, Validators.required),
        isChecked:this.fb.control<boolean>(false,Validators.requiredTrue)
      });
    }

  ngOnInit(): void{
    // this.tokenService.clearToken();
    this.tokenService.clearSpecificToken('signInToken');
    this.storageService.clearLocalFlag('reloaded');
    this.searchTerms.pipe(

      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string)=>this.signInUserService.searchSignInUser(term)),
    ).subscribe(users => {
      // Directly update this.signInUsers with the new users
      this.signInUsers = users;
      this.isLoading = false;
    });
    this.signInAuthService.updateUserId(null);
  }

  search(term: string): void{
    this.searchTerms.next(term);
    this.isLoading = true;
  }

  // 这个函数接受用户的输入和每一个选项，返回一个布尔值表示该选项是否匹配
filterOption(searchValue: string, itemValue: any): boolean {
  // 这里的逻辑是忽略大小写地检查itemValue是否包含searchValue
  // return itemValue.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
  return true;
}

  submitForm():void{
    if(this.validateSearchUserForm.valid){
      if(this.validateSearchUserForm.value.selectedSignInUserId){
        this.isExisted = true;
        let token = null;
        if(this.validateSearchUserForm.value.isChecked){
          this.isShowError = false;
          token = this.tokenService.generateToken();
          consoleLog('HomeComponent', this.validateSearchUserForm.value.selectedSignInUserId);
        } else {
          this.isShowError = true;
        }
        this.router.navigate([`/signInDetail/${this.validateSearchUserForm.value.selectedSignInUserId}`],{ queryParams: { signInToken: token } });
      } else {
        this.isExisted = false;
        this.isShowError = true;
      }
      
    } else {
      Object.values(this.validateSearchUserForm.controls).forEach(control => {
        if (control.invalid) {
          this.isShowError = true;
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
          consoleError('HomeComponent','provide invalid input');
        }
      });
    }
  }


}
