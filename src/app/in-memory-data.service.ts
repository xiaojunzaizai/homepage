import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { SignInUser } from './signInuser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
   createDb() {
    const signInUsers = [
      {id:1, firstName:'first_name', middleName: 'middle_name',lastName: 'last_name',signDate:[
        new Date('2024-02-20T00:00:00'),
        new Date('2024-02-19T00:00:00'),
        new Date('2024-02-18T00:00:00')]},
      {id: 2, firstName: 'John', middleName: 'William', lastName: 'Doe', signDate: [
          this.createDate(2024, 2, 20),
          this.createDate(2024, 2, 19),
          this.createDate(2024, 2, 18)
        ]}
    ];
    return {signInUsers};
  }

  createDate(year: number, month: number, day: number): Date {
    return new Date(year, month - 1, day);
  }

  // Overrides the genId method to ensure that a signInUser always has an id.
  // If the signInUsers array is empty,
  // the method below returns the initial number (101).
  // if the signInUsers array is not empty, the method below returns the highest
  // signInUser id + 1.
  genId(signInUsers:SignInUser[]):number {
    return signInUsers.length>0? Math.max(...signInUsers.map(signInUser => signInUser.id))+1:101
  }

}