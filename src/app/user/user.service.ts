import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserResponseData } from './user-response-data.model';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { User } from './user.model';


@Injectable({ providedIn: 'root' })
export class UserService {
    user = new Subject<User>();

    constructor(private http: HttpClient) { }

    public saveUser(email: string, password: string, returnSecureToken: boolean) {
        return this.http.post<UserResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBxBahEESgMwCjbzkUsdK53zyoPxFPcmh8',
            {
                email: email,
                password: password,
                returnSecureToken: returnSecureToken
            }
        ).pipe(catchError(this.handleError),
            tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
            })
        )
    }

    public enterUser(email: string, password: string, returnSecureToken: boolean){
        return this.http.post<UserResponseData>(
         'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBxBahEESgMwCjbzkUsdK53zyoPxFPcmh8',
         {
            email: email,
            password: password,
            returnSecureToken: returnSecureToken
         }
      ).pipe(catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }))
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number){
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
                const user = new User(
                    email, 
                    userId, 
                    token, 
                    expirationDate
                );
                this.user.next(user);
    }

    private handleError(errorRes: HttpErrorResponse){
        let errorMessage = 'An unknown error ocurred!';
            if(!errorRes.error || !errorRes.error.error){
                return throwError(errorMessage);
            }
            switch(errorRes.error.error.message){
                case 'EMAIL_EXISTS':
                    errorMessage = 'The email exists already!';
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'This email does not exists';
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = 'Wrong password';
                    break;
            }
            return throwError(errorMessage);
    }
}