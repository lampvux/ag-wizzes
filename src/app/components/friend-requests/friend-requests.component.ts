import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../../core/services/friends.service';
@Component({
  selector: 'app-friend-requests',
  templateUrl: './friend-requests.component.html',
  styleUrls: ['./friend-requests.component.css']
})
export class FriendRequestsComponent implements OnInit {
    friendRequests;
    is_request;
    constructor(private friendservice: FriendsService) { }

    getFriendRequest() {
       this.friendservice.getFriendRequests().subscribe(request => {

           this.friendRequests =  request;
           this.is_request = request.length;
        });
    }
    denyFriendRequest(id) {
        return this.friendservice.denyFriend(id);
    }
    acceptFriendRequest(request, email, friendid, name, url) {
        return this.friendservice.acceptFriend(request, email, friendid, name, url);
    }
    ngOnInit() {
        this.getFriendRequest();
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
