import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

    data: Date = new Date();
    email: string;
    password: string;
    message;
    constructor(public auth: AuthService,  private router: Router) {
        this.auth.user.subscribe(user => {
            if (user) {
                this.router.navigateByUrl('/profile');
            }
        });
    }

    ngOnInit() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('full-screen');
        body.classList.add('login');
        const navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
        if (navbar.classList.contains('nav-up')) {
            navbar.classList.remove('nav-up');
        }
    }
    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('full-screen');
        body.classList.remove('login');
        const navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }
    /// Social Login

    signInWithGoogle() {
        this.auth.googleLogin()
            .then((credential) => this.afterSignIn())
            .catch(err => {
                console.log('Something went wrong:', err.message);
            });
    }

    signInWithFacebook() {
        this.auth.facebookLogin()
            .then((credential) => this.afterSignIn())
            .catch(err => {
                console.log('Something went wrong:', err.message);
            });
    }

    signInWithTwitter() {
        this.auth.twitterLogin()
            .then((credential) => this.afterSignIn())
            .catch(err => {
                console.log('Something went wrong:', err.message);
            });
    }

    /// Anonymous Sign In
    signInWithEmail() {
        this.auth.error = 'Loading';
        this.auth.loginWithEmail(this.email, this.password)
            .then((credential) => this.afterSignIn())
            .catch(err => {
                console.log('Something went wrong:', err.message);
            });
        this.email = this.password = '';
    }

    /// Shared
    private afterSignIn() {
        // Do after login stuff here, such router redirects, toast messages, etc.
        // this.router.navigate(['/profile']);
    }

}
