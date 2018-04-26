import { Component, OnInit } from '@angular/core';
import { TrendyService } from '../../core/services/trendy.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trendy-details',
  templateUrl: './trendy-details.component.html',
  styleUrls: ['./trendy-details.component.css']
})
export class TrendyDetailsComponent implements OnInit {
    private sub;
    id;
    TrendyDetails;
    constructor(private route: ActivatedRoute, private trendyservice: TrendyService) { }

    ngOnInit() {
        const self = this;
        this.sub = this.route.params.subscribe(params => {
            this.id = params.id;
            this.trendyservice.viewTrendy(this.id).subscribe(trendy => {

                this.TrendyDetails = trendy;
            });
        });

        const navbar = document.getElementsByTagName('nav')[0];
        navbar.children[0].classList.remove('navbar-transparent');
        if (navbar.classList.contains('nav-up')) {
            navbar.classList.remove('nav-up');
            navbar.classList.add('nav-down');
        }
    }

}
