import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrendyService } from '../../core/services/trendy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trendy',
  templateUrl: './trendy.component.html',
  styleUrls: ['./trendy.component.css']
})
export class TrendyComponent implements OnInit, OnDestroy {
    trendyByTime;
    trendyByBrand;
    tendyByCountry;
    constructor(private trendyservice: TrendyService, private router: Router) { }


    ngOnInit() {

        this.trendyservice.gettrendyByTime('asc').subscribe(trendy => {
            this.trendyByTime = trendy;

        });
        this.trendyservice.gettrendyByBrand('asc').subscribe(trendy => {
            this.trendyByBrand = trendy;
        });
        this.trendyservice.gettrendyByCountry('asc').subscribe(trendy => {
            this.tendyByCountry = trendy;
        });
        const navbar = document.getElementsByTagName('nav')[0];
        navbar.children[0].classList.remove('navbar-transparent');
        if (navbar.classList.contains('nav-up')) {
            navbar.classList.remove('nav-up');
            navbar.classList.add('nav-down');
        }
    }
    ngOnDestroy() {

        const navbar = document.getElementsByTagName('nav')[0];

    }
    sortPriceAsc() {
        this.trendyservice.gettrendyByTime('asc').subscribe(trendy => {
            this.trendyByTime = trendy;

        });
    }
    sortPriceDesc() {
        this.trendyservice.gettrendyByTime('desc').subscribe(trendy => {
            this.trendyByTime = trendy;
        });
    }
    sortDateAsc() {
        this.trendyservice.gettrendyByBrand('asc').subscribe(trendy => {
            this.trendyByBrand = trendy;
        });
    }
    sortDateDesc() {
        this.trendyservice.gettrendyByBrand('desc').subscribe(trendy => {
            this.trendyByBrand = trendy;
        });
    }
    sortCatAsc() {
        this.trendyservice.gettrendyByCountry('asc').subscribe(trendy => {
            this.tendyByCountry = trendy;
        });
    }
    sortCatDesc() {
        this.trendyservice.gettrendyByCountry('desc').subscribe(trendy => {
            this.tendyByCountry = trendy;
        });
    }

    goToListDetails(id) {
        this.router.navigate(['/trendy-details', id]);
    }

}
