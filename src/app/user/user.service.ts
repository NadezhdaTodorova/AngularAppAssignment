import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserResponseData } from './user-response-data.model';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';


@Injectable({ providedIn: 'root' })
export class UserService {
    user = new BehaviorSubject<User>(null);
    

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
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            })
        );
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
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }));
    }

    autoLogin(){
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if(loadedUser.token){
          this.user.next(loadedUser);
        }
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
                localStorage.setItem('userData', JSON.stringify(user));
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