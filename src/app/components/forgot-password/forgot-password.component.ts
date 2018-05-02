import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
    code;
    email;
    password;
    repassword;
    message;

    private sub;
    constructor(public auth: AuthService, private route: ActivatedRoute, private router: Router) {
        this.auth.user.subscribe(user => {
        if (user) {
            this.router.navigateByUrl('/profile');
        }
        });
    }
    Sendemailreset() {
        this.auth.resetPassword(this.email).then(res => {
        this.message = 'Checkemail';
        }).catch(err => {
        this.message = err;
        });
    }
    
    ngOnInit() {

        const self = this;
        this.sub = this.route.params.subscribe(params => {
        this.code = params.code;
        });
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('full-screen');
        body.classList.add('login');
        const navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
        if (navbar.classList.contains('nav-up')) {
        navbar.classList.remove('nav-up');
        }
    }

}
