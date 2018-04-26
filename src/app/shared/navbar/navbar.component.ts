import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;
    if_user = false;

    constructor(public location: Location,
        private element: ElementRef,
        private auth: AuthService) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        if (this.auth.uid) {
            this.if_user = true;
        } else {
            this.if_user = false;
        }
        this.auth.user.subscribe(user => {
            if (user) { this.if_user = true; } else {
                this.if_user = false;
            }
        });
        if (this.if_user) {

        }

        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        setTimeout(function () {
        toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    }
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];

        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    }
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
        this.sidebarOpen();
        } else {
        this.sidebarClose();
        }
    }
    isHome() {
        const titlee = this.location.prepareExternalUrl(this.location.path());

        if (titlee === '/home') {
        return true;
        }    else {
        return false;
        }
    }
    isDocumentation() {
        const titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee === '/documentation') {
        return true;
        }    else {
        return false;
        }
    }
}
