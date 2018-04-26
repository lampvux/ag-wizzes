import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
    data: Date = new Date();
    email: string;
    password: string;
    repassword: string;
    message;
    constructor(public auth: AuthService,  private router: Router) {
        this.auth.user.subscribe( user => {
            if (user) {
                this.router.navigateByUrl('/profile');
            }
        });
    }

    ngOnInit() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('full-screen');
        body.classList.add('register');
        const navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
    }
    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('full-screen');
        body.classList.remove('register');

    }
    signInWithGoogle() {
        this.auth.googleLogin()
            .then(() => this.afterSignIn());
    }

    signInWithFacebook() {
        this.auth.facebookLogin()
            .then(() => this.afterSignIn());
    }

    signInWithTwitter() {
        this.auth.twitterLogin()
            .then(() => this.afterSignIn());
    }
    registerWithEmail() {
        if (!this.email) {
            this.message = 'Email is Required !' ;
        } else
        if (!this.password ) {
            this.message = 'Password is Required !' ;
        } else
        if (this.password !== this.repassword) {
            this.message = 'Password does not match !';
        } else {
            this.auth.emailSignUp(this.email, this.password)
                .then((success) => {
                    this.message = 'Registration successful.';
                     this.afterSignup(); })
                .catch((err) => {

                } );
        }
    }
    /// Shared
    private afterSignIn() {
        // Do after login stuff here, such router redirects, toast messages, etc.
        this.router.navigate(['/profile']);
    }
    private afterSignup() {
        // this.router.navigate(['/login']);
    }
    private wrongError(err) {

    }

}
