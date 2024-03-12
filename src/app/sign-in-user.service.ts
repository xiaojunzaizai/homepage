import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignInUser } from './signInUser';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { consoleLog, consoleError } from './util-tool/messageConsoleUtil';


@Injectable({
  providedIn: 'root'
})
export class SignInUserService {

  private signInUsersUrl = 'api/signInUsers';

  httpOptions = {
    headers : new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  searchSignInUser(term: string): Observable<SignInUser[]> {
    if (!term.trim()) {
      // 如果没有搜索词，直接返回空数组。
      return of([]);
    }
    return this.http.get<SignInUser[]>(this.signInUsersUrl).pipe(
      map(signInUsers => signInUsers.filter(signInUser => 
        signInUser.firstName.toLowerCase().includes(term.toLowerCase()) ||
        signInUser.middleName.toLowerCase().includes(term.toLowerCase()) ||
        signInUser.lastName.toLowerCase().includes(term.toLowerCase())
      )),
      tap(x => x.length ?
        consoleLog('SignInUserService',`found SignInUsers matching "${term}"`) :
        consoleLog('SignInUserService',`no SignInUsers matching "${term}"`)),
      catchError(this.handleError<SignInUser[]>('searchSignInUsers', []))
    );
  }

  getSignInUser(id: number): Observable<SignInUser> {
    const url = `${this.signInUsersUrl}/${id}`;
    return this.http.get<SignInUser>(url).pipe(
      tap(_ => consoleLog('SignInUserService',`fetched SignInUser id = ${id}`)),
      catchError(this.handleError<SignInUser>(`getSignInUser id =${id}`))
    );
  }

  updateSignInUser(signInUser:SignInUser): Observable<any>{
    return this.http.put<SignInUser>(this.signInUsersUrl, signInUser, this.httpOptions).pipe(
      tap(_ =>consoleLog('SignInUserService',`update signInUser id = ${signInUser.id}`)),
      catchError(this.handleError<any>(`updateSignInUser ${signInUser.firstName} ${signInUser.middleName} ${signInUser.lastName}`))
    )
  }

  addSignInUser(signInUser:SignInUser): Observable<SignInUser>{
    consoleLog('SignInUserService',signInUser);
    return this.http.post<SignInUser>(this.signInUsersUrl, signInUser, this.httpOptions).pipe(
      tap( (newSignInUser: SignInUser)=>consoleLog('SignInUserService',`add SignInUser w/ id = ${newSignInUser.id}`)),
      catchError(this.handleError<any>(`addSignInUser failed`))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      consoleError('SignInUserService',error); // log to console instead
  
      // Adding more detailed error information
      consoleError(`${operation} failed`, error.message);
      if (error.error) {
        consoleError(`Server response`, error.error);
      }
  
      consoleLog(`${operation} failed`, error.message);
  
      return of(result as T);
    };
  }

}
