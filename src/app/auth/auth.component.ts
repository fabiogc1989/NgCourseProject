import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

import { AuthResponseData, AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode: boolean = false;
    isLoading: boolean = false;
    error: string = null;

    constructor(private authService: AuthService){}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if(form.invalid){
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;
        if (this.isLoginMode) {
            authObs = this.authService.signin(email, password);
        } else {
            authObs = this.authService.signup(email, password);
        }

        authObs.subscribe(authData => {
            console.log(authData);
            this.isLoading = false;
        }, errorMessage => {
            console.log(errorMessage);
            this.isLoading = false;
            this.error = errorMessage;
        });
        
        form.reset()
    }
}