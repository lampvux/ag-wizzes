import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FriendsService } from '../../core/services/friends.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
    private sub;
    id;
    thisprofile;
    Url;
    Name;
    Email;
    Birth;
    Country;
    friendstat;
    request;
    friendseelist;
    isDisabled = false;
    constructor(
        private auth: AuthService,
        private friendService: FriendsService,
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient  ) { }
    addFriend() {
        this.friendService.addFriend(this.id);
        this.sendMessagepost(this.id, 'Friend Request', 'You have a new friend request');
        this.request = true;
        this.isDisabled = true;
    }
    public sendMessagepost(id, title, message) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        const params = new HttpParams()
            .set('id', id)
            .set('title', title)
            .set('message', message);

        const options = {
            headers,
            params,
            withCredentials: false
        };
        this.http.post('https://us-central1-wizzes-95363.cloudfunctions.net/addMessage', null, options)
            .subscribe(response => { });
    }
    cancelRequest() {

    }
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params.id;
            if (this.id === this.auth.getUserId()) {
                this.router.navigate(['profile']);
            }
            this.friendService.getUser(this.id).subscribe(thisuser => {
                if (thisuser) {

                    this.thisprofile = thisuser;
                    this.Url =  thisuser.Url;
                    this.Email = thisuser.Email;
                    this.Name = thisuser.Name;
                    this.Birth = thisuser.Birth;
                    this.Country = thisuser.Country;
                    this.friendseelist = thisuser.AllowFriendSeeLists;
                }   else {
                    this.router.navigate(['profile']);
                }

            });
            this.friendService.getFriendRequestStatus(this.id).subscribe(request => {
                this.request = request.length;
            });
            this.friendService.getFriendStatus(this.id).subscribe(friendstat => {
                this.friendstat = friendstat.length;
            });
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

}
