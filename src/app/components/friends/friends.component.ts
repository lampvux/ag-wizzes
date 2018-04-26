import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../../core/services/friends.service';
@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
    allFriend;
    friendRequestCount = 0;
    is_count;
    constructor(private friendservice: FriendsService) { }
    getFriends() {
        this.friendservice.getFriends().subscribe(friend => {

            this.allFriend = friend;
            this.is_count = friend.length;

        });
    }

    ngOnInit() {
        this.getFriends();
        this.friendservice.getFriendRequests().subscribe(request => {
            this.friendRequestCount = request.length;
        });
        const navbar = document.getElementsByTagName('nav')[0];
        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        // Scroll Down
        if (navbar.classList.contains('nav-up')) {
        navbar.classList.remove('nav-up');
        navbar.classList.add('nav-down');
        }
  }

}
