import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SignInUserService } from '../sign-in-user.service';
import { SignInUser } from '../signInuser';
import DataTable from 'datatables.net-dt';
declare var $: any;



@Component({
  selector: 'app-sign-in-detail',
  templateUrl: './sign-in-detail.component.html',
  styleUrls: ['./sign-in-detail.component.css']
})
export class SignInDetailComponent implements OnInit, AfterViewInit{

  signInUser: SignInUser | undefined;

  constructor(
    private route: ActivatedRoute,
    private signInUserService: SignInUserService,
    private location: Location
  ) {}


  ngOnInit(): void{
    this.getsignInUserDetail();

  }

  ngAfterViewInit(): void {
    new DataTable('#example', {
      language: {
          entries: {
              _: 'people',
              1: 'person'
          }
      }
  });
  }

  getsignInUserDetail(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.signInUserService.getSignInUser(id)
      .subscribe(signInUser => this.signInUser = signInUser);
  }


}
