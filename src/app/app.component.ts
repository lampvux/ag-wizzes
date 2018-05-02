import { Component, OnInit, Inject, Renderer, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { DOCUMENT } from '@angular/platform-browser';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { TranslateService } from '@ngx-translate/core';
import {AuthService} from './core/services/auth.service';
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = 0;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    private _router: Subscription;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    url: string;
    @ViewChild(NavbarComponent) navbar: NavbarComponent;

  constructor(private renderer: Renderer, private router: Router,
     @Inject(DOCUMENT, ) private document: any, private element: ElementRef,
     public location: Location, private auth: AuthService,
      private translate: TranslateService) {

      translate.setDefaultLang('en');
       }

    @HostListener('window:scroll', ['$event'])
    hasScrolled() {

        const st = window.pageYOffset;
        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop - st) <= delta) {
            return;
        }
        const navbar = document.getElementsByTagName('nav')[0];

        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight) {
        // Scroll Down
        /* if (navbar.classList.contains('nav-down')) {
            navbar.classList.remove('nav-down');
            navbar.classList.add('nav-up');
        } */
        // $('.navbar.nav-down').removeClass('nav-down').addClass('nav-up');
        } else {
        // Scroll Up
        //  $(window).height()
        if (st + window.innerHeight < document.body.scrollHeight) {
            // $('.navbar.nav-up').removeClass('nav-up').addClass('nav-down');
            if (navbar.classList.contains('nav-up')) {
            navbar.classList.remove('nav-up');
            navbar.classList.add('nav-down');
            }
        }
        }

        lastScrollTop = st;
    }
    switchLanguage(language: string) {
        this.translate.use(language);
    }
    ngOnInit() {
        this.auth.user.subscribe(user => {
            if (user) {
                this.switchLanguage(user.Language.toLowerCase());
            }
        });
        const navbar: HTMLElement = this.element.nativeElement.children[0].children[0];
        if (this.location.path() !== '/sections') {
        this.location.subscribe((ev: PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });
        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationStart) {
            if (event.url != this.lastPoppedUrl) {
                this.yScrollStack.push(window.scrollY);
            }
            } else if (event instanceof NavigationEnd) {
                if (event.url == this.lastPoppedUrl) {
                    this.lastPoppedUrl = undefined;
                    window.scrollTo(0, this.yScrollStack.pop());
                }  else {
                    window.scrollTo(0, 0);
                }
            }
        });
        }

        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
        this.navbar.sidebarClose();

        this.renderer.listenGlobal('window', 'scroll', (event) => {
            const number = window.scrollY;
            var _location = this.location.path();
            _location = _location.split('/')[1];
            if (this.location.path() !== '/sections') {

            if (number > 150 || window.pageYOffset > 150) {
                // add logic
                navbar.classList.remove('navbar-transparent');
            } else if (_location === 'login'
                || _location === 'signup' || _location === 'profile' || _location === '' ) {
                // remove logic
                navbar.classList.add('navbar-transparent');
            }
            }
        });
        });

        var ua = window.navigator.userAgent;
        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        var version = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }
        if (version) {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('ie-background');

        }
        this.hasScrolled();
    }
    removeFooter() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.slice(1);
        if (titlee === 'signup' || titlee === 'nucleoicons') {
        return false;
        } else {
            return true;
        }
    }


}
