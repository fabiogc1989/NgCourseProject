import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";

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
    constructor(private http: HttpClient){}

    signin(email: string, password: string){
        return this.http
            .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBIo5jZd-P5VK9oonl2ZxmjfupVzNKH9JE ',
            {
                email,
                password,
                returnSecureToken: true
            })
            .pipe(catchError(this.handleError));
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
            .pipe(catchError(this.handleError));
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