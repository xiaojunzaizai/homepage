import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignInAuthService {

  private userIdSource = new BehaviorSubject<number | null>(null);
  userId$ = this.userIdSource.asObservable();

  constructor() { }

  updateUserId(id: number | null) {
    this.userIdSource.next(id);
  }

}
