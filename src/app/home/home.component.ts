import { Component,OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged,switchMap } from 'rxjs/operators';
import { SignInUser } from '../signInUser';
import { SignInUserService } from '../sign-in-user.service';
import { SignInAuthService } from '../sign-in-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  signInToolTip = 'Sign In';

  searchInput: string = '';

  private searchTerms = new Subject<string>();

  signInUsers$!:Observable<SignInUser[]>;

  selectedSignInUser : SignInUser | null = null;

  constructor (private signInUserService: SignInUserService,
    private signInAuthService: SignInAuthService){}

  ngOnInit(): void{
    this.signInUsers$ = this.searchTerms.pipe(
           // wait 300ms after each keystroke before considering the term
           debounceTime(300),

           // ignore new term if same as previous term
           distinctUntilChanged(),
     
           // switch to new search observable each time the term changes
           switchMap((term: string)=>this.signInUserService.searchSignInUser(term)),
    );
    this.signInAuthService.updateUserId(null);
  }

  search(term: string): void{
    this.searchTerms.next(term);
  }

  selectSignInUser(signInUser: SignInUser): void{
    this.selectedSignInUser = signInUser;
    this.searchInput = `${signInUser.firstName} ${signInUser.middleName} ${signInUser.lastName}`; // 更新input字段
    this.searchTerms.next('');
  }


}
