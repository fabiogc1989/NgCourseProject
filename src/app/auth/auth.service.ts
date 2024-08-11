import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { Router } from "@angular/router";

import { User } from "./user.model";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn:'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient, private router: Router){}

    signin(email: string, password: string){
        return this.http
            .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBIo5jZd-P5VK9oonl2ZxmjfupVzNKH9JE ',
            {
                email,
                password,
                returnSecureToken: true
            })
            .pipe(
                catchError(this.handleError), 
                tap(resData => {
                    this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                })
            );
    }

    signup(email: string, password: string){
        return this.http
            .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBIo5jZd-P5VK9oonl2ZxmjfupVzNKH9JE ',
            {
                email,
                password,
                returnSecureToken: true
            })
            .pipe(
                catchError(this.handleError), 
                tap(resData => {
                    this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                })
            );
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
    }

    private handleError(errorRes: HttpErrorResponse){
        let errorMessage = 'Unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage = 'This email already exists'
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist'
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'The password is not correct'
                break;
            case 'USER_DISABLED':
                errorMessage = 'This account has been disabled by the administrator'
                break;
            case 'INVALID_LOGIN_CREDENTIALS':
                errorMessage = 'The credentials are invalid'
                break;
        }
        console.log("handler: ", errorRes)
        return throwError(errorMessage);
    }
}