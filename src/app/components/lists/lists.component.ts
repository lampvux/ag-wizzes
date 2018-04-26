import { Component, OnInit } from '@angular/core';
import { Listitems } from '../../core/models/lists';
import { AuthService } from '../../core/services/auth.service';
import { ListsService } from '../../core/services/lists.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FriendsService } from '../../core/services/friends.service';
import { FriendsComponent } from '../friends/friends.component';
@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
    private sub;
    id;
    Name;
    friendseelist;
    listsTime;
    listsPrice;
    listsCategory;
    today;
    constructor(
        private auth: AuthService,
        private listService: ListsService,
        private route: ActivatedRoute,
        private router: Router,
        private friendService: FriendsService) {

     }


    ngOnInit() {
        this.today = this.listService.getDateCreated();
        this.sub = this.route.params.subscribe(params => {
            this.id = params.id;
            if (this.id === this.auth.getUserId()) {
                this.router.navigate(['mylist']);
            }
            this.friendService.getUser(this.id).subscribe(thisuser => {
                if (thisuser) {

                    this.Name = thisuser.Name;
                    this.friendseelist = thisuser.AllowFriendSeeLists;
                    if (!this.friendseelist) {
                        this.router.navigate(['friends']);
                    }
                }
            });
            this.friendService.getFriendStatus(this.id).subscribe(friendstat => {
                if (!friendstat) {
                    this.router.navigate(['friends']);
                } else {
                }
            });
            this.listService.getListUserTime(this.id, 'asc').subscribe(lists => {
                this.listsTime = lists;
            });
            this.listService.getListUserPrice(this.id, 'asc').subscribe(listprice => {
                this.listsPrice = listprice;
            });
            this.listService.getListUserCategory(this.id, 'asc').subscribe(listcate => {
                this.listsCategory = listcate;
            });

        });
        const navbar = document.getElementsByTagName('nav')[0];
        navbar.children[0].classList.remove('navbar-transparent');
        if (navbar.classList.contains('nav-up')) {
            navbar.classList.remove('nav-up');
            navbar.classList.add('nav-down');
        }
    }
    sortPriceAsc() {
        this.listService.getListUserPrice(this.id, 'asc').subscribe(listprice => {
            this.listsPrice = listprice;
        });
    }
    sortPriceDesc() {
        this.listService.getListUserPrice(this.id, 'desc').subscribe(listprice => {
            this.listsPrice = listprice;
        });
    }
    sortDateAsc() {
        this.listService.getListUserTime(this.id, 'asc').subscribe(lists => {
            this.listsTime = lists;
        });
    }
    sortDateDesc() {
        this.listService.getListUserTime(this.id, 'desc').subscribe(lists => {
            this.listsTime = lists;
        });
    }
    sortCatAsc() {
        this.listService.getListUserCategory(this.id, 'asc').subscribe(listcate => {
            this.listsCategory = listcate;
        });
    }
    sortCatDesc() {
        this.listService.getListUserCategory(this.id, 'desc').subscribe(listcate => {
            this.listsCategory = listcate;
        });
    }

}
