import { Component, ComponentFactoryResolver, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";

import { AuthResponseData, AuthService } from "./auth.service";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode: boolean = false;
    isLoading: boolean = false;
    error: string = null;
    closeSub: Subscription;
    @ViewChild(PlaceholderDirective, {static:false}) hostPlaceholder: PlaceholderDirective;

    constructor(private authService: AuthService, private router: Router){}

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
            this.router.navigate(['/recipes']);
        }, errorMessage => {
            // this.error = errorMessage;
            this.showError(errorMessage);
            this.isLoading = false;
        });
        
        form.reset();
    }

    onHandleError() {
        this.error = null;
    }

    private showError(message: string){
        const hostViewContainerRef = this.hostPlaceholder.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(AlertComponent);
        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(()=> {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        });
    }
}