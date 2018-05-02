import { Component, OnInit, OnDestroy } from '@angular/core';

import { FriendsService } from '../../core/services/friends.service';
import { AddFriendPipe } from './add-friend.pipe';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit, OnDestroy {
    allusers: any;
    allres = [];
    searchText;
    constructor(private friendservice: FriendsService, private translate: TranslateService) {

     }

    clickst() {
      //  this.allusers.subscribe(ss => console.log(ss));
    }
    ngOnInit() {

        const self = this;
         this.friendservice.getAllUsers().subscribe(user => {
             this.allusers = user;
         });
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('search');
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
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('search');

    }

}
