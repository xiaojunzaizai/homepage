import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignInUser } from './signInuser';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

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
         this.log(`found SignInUsers matching "${term}"`) :
         this.log(`no SignInUsers matching "${term}"`)),
      catchError(this.handleError<SignInUser[]>('searchSignInUsers', []))
    );
  }

  getSignInUser(id: number): Observable<SignInUser> {
    const url = `${this.signInUsersUrl}/${id}`;
    return this.http.get<SignInUser>(url).pipe(
      tap(_ => this.log(`fetched SignInUser id = ${id}`)),
      catchError(this.handleError<SignInUser>(`getSignInUser id =${id}`))
    );
  }

  private handleError<T>(operation='operation', result?:T){
    return (error:any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.

      return of(result as T);
    }
  }

  private log (message:string ){
    console.log(`SignInUserService: ${message}`);
  }

}
