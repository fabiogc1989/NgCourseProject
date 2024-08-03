import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";

interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({providedIn:'root'})
export class AuthService {
    constructor(private http: HttpClient){}

    signup(email: string, password: string){
        return this.http
            .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBIo5jZd-P5VK9oonl2ZxmjfupVzNKH9JE ',
            {
                email,
                password,
                returnSecureToken: true
            })
            .pipe(catchError(errorRes => {
                let errorMessage = 'Unknown error occurred!';
                if (!errorRes.error || !errorRes.error.error) {
                    return throwError(errorMessage);
                }
                switch(errorRes.error.error.message){
                    case 'EMAIL_EXISTS':
                        errorMessage = 'This email already exists'
                        break;
                }
                return throwError(errorMessage);
            }));
    }
}