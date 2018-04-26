import { Component, OnInit, OnDestroy } from '@angular/core';
import { Listitems } from '../../core/models/lists';
import { ListsService } from '../../core/services/lists.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-mylist',
    templateUrl: './mylist.component.html',
    styleUrls: ['./mylist.component.css']
})
export class MylistComponent implements OnInit, OnDestroy {
    Listsitem;
    ListsitemPrice;
    ListsitemCategory;
    is_list;
    private sub;
    constructor(private Listservice: ListsService, private router: Router, private rout: ActivatedRoute) {

     }
    getallList() {
        this.Listservice.getListsbyTime('asc').subscribe(lists => {
                this.Listsitem = lists;
            this.is_list = lists.length;

        });
        this.Listservice.getListsbyPrice('asc').subscribe(listprice => {
            this.ListsitemPrice = listprice;
        });
        this.Listservice.getListbyCategory('asc').subscribe(listcate => {
            this.ListsitemCategory = listcate;
        });
    }
    ngOnInit() {

       this.getallList();
        const navbar = document.getElementsByTagName('nav')[0];
        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        // Scroll Down
        if (navbar.classList.contains('nav-up')) {
            navbar.classList.remove('nav-up');
             navbar.classList.add('nav-down');
        }
    }
    ngOnDestroy() {

    }
    sortPriceAsc() {
        this.Listservice.getListsbyPrice('asc').subscribe(listprice => {
            this.ListsitemPrice = listprice;

        });
    }
    sortPriceDesc() {
        this.Listservice.getListsbyPrice('desc').subscribe(listprice => {
            this.ListsitemPrice = listprice;
        });
    }
    sortDateAsc() {
        this.Listservice.getListsbyTime('asc').subscribe(lists => {
            this.Listsitem = lists;
        });
    }
    sortDateDesc() {
        this.Listservice.getListsbyTime('desc').subscribe(lists => {
            this.Listsitem = lists;
        });
    }
    sortCatAsc() {
        this.Listservice.getListbyCategory('asc').subscribe(listcate => {
            this.ListsitemCategory = listcate;
        });
    }
    sortCatDesc() {
        this.Listservice.getListbyCategory('desc').subscribe(listcate => {
            this.ListsitemCategory = listcate;
        });
    }

    goToListDetails(id) {
        this.router.navigate(['/list-details', id]);
    }

}
