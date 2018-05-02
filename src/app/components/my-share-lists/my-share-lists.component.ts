import { Component, OnInit, OnDestroy } from '@angular/core';
import { Sharelists } from '../../core/models/sharelists';
import { FriendSharedlistService } from '../../core/services/friend-sharedlist.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-my-share-lists',
  templateUrl: './my-share-lists.component.html',
  styleUrls: ['./my-share-lists.component.css']
})
export class MyShareListsComponent implements OnInit, OnDestroy {
    SharelistsTime;
    SharelistsTitle;
    SharelistsExpiry;
    constructor(private sharelistservice: FriendSharedlistService, private router: Router) {
        
    }

    ngOnInit() {
        const self = this;
        this.sharelistservice.getShareLists('OpenDate', 'desc', function (res) {
            res.subscribe(val => {
                self.SharelistsTime = val;
                console.log(val);
            });
        });
        this.sharelistservice.getShareLists('Title', 'desc', function (res) {
            res.subscribe(val => {
                self.SharelistsTitle = val;
            });
        });
        this.sharelistservice.getShareLists('ExpiryDate', 'desc', function (res) {
            res.subscribe(val => {
                self.SharelistsExpiry = val;
            });
        });
        const navbar = document.getElementsByTagName('app-navbar')[0];
        if (navbar.classList.contains('nav-up')) {
            navbar.classList.remove('nav-up');
            navbar.classList.add('nav-down');
        }
    }
    sortOpenAsc() {
        this.SharelistsTime = this.getShareListTime('asc');
    }
    sortOpenDesc() {
        this.SharelistsTime = this.getShareListTime('asc');
    }
    sortTitleAsc() {
        this.SharelistsTitle = this.getShareListTitle('asc');
    }
    sortTitleDesc() {
        this.SharelistsTitle = this.getShareListTitle('asc');
    }
    sortExpiryAsc() {
       this.SharelistsExpiry = this.getShareListExpiry('asc');
    }
    sortExpiryDesc() {
        this.SharelistsExpiry = this.getShareListExpiry('asc');
    }
    getShareListTime(sorttype) {
        return this.SharelistsTime.map(item => item.sort(
            (a, b) => {
                if (a.OpenDate < b.OpenDate) { if (sorttype === 'asc') { return -1; } else { return 1; } }
                if (a.OpenDate > b.OpenDate) { if (sorttype === 'asc') { return 1; } else { return -1; } }
                return 0;
            }
        ));
    }

    getShareListTitle(sorttype) {
        return this.SharelistsTime.map(item => item.sort(
            (a, b) => {
                if (a.Title < b.Title) { if (sorttype === 'asc') { return -1; } else { return 1; } }
                if (a.Title > b.Title) { if (sorttype === 'asc') { return 1; } else { return -1; } }
                return 0;
            }
        ));
    }
    getShareListExpiry(sorttype) {
        return this.SharelistsTime.map(item => item.sort(
            (a, b) => {
                if (a.ExpiryDate < b.ExpiryDate) { if (sorttype === 'asc') { return -1; } else { return 1; } }
                if (a.ExpiryDate > b.ExpiryDate) { if (sorttype === 'asc') { return 1; } else { return -1; } }
                return 0;
            }
        ));
    }

    goToShareListDetails(id) {
        this.router.navigate(['/share-list-details', id]);
    }

    ngOnDestroy() {

        const navbar = document.getElementsByTagName('nav')[0];

        if (navbar.classList.contains('nav-up')) {
            navbar.classList.remove('nav-up');
            navbar.classList.add('nav-down');
        }
    }

}
