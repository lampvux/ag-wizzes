import { Component, OnInit } from '@angular/core';
import { FriendBlockedGiftService } from '../../core/services/friend-blocked-gift.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-friend-blocked-gift',
  templateUrl: './friend-blocked-gift.component.html',
  styleUrls: ['./friend-blocked-gift.component.css']
})
export class FriendBlockedGiftComponent implements OnInit {
    friendBlockedGift;
    friendBlockedGiftByPrice;
    friendBlockedGiftByName;
    friendBlockedGiftByEmail;
    constructor(private friendblockedservice: FriendBlockedGiftService) {
       
     }

    sortPriceAsc() {
       this.friendBlockedGiftByPrice = this.getBlockedGiftPrice('asc');
    }
    sortPriceDesc() {
        this.friendBlockedGiftByPrice = this.getBlockedGiftPrice('desc');
    }
    sortDateAsc() {
       this.friendBlockedGift = this.getBlockedGiftTime('asc');
    }
    sortDateDesc() {
        this.friendBlockedGift = this.getBlockedGiftTime('desc');
        this.friendBlockedGift.subscribe(st => {

        });
    }
    sortNameAsc() {
        this.friendBlockedGiftByName = this.getBlockedGiftName('asc');
    }
    sortNameDesc() {
        this.friendBlockedGiftByName = this.getBlockedGiftName('asc');
    }
    sortEmailAsc() {
        this.friendBlockedGiftByEmail = this.friendBlockedGiftByEmail('asc');
    }
    sortEmailDesc() {
        this.friendBlockedGiftByEmail = this.friendBlockedGiftByEmail('desc');
    }

    getBlockedGiftTime(sorttype) {

        return this.friendBlockedGift.map(item => item.sort(
            (a, b) => {
                if (a.OpenDate < b.OpenDate) { if (sorttype === 'asc') { return -1; } else { return 1; } }
                if (a.OpenDate > b.OpenDate) { if (sorttype === 'asc') { return 1; } else { return -1; } }
                return 0;
            }
        ));
    }
    getBlockedGiftPrice(sorttype) {

        return this.friendBlockedGift.map(item => item.sort(
            (a, b) => {
                if (a.Price < b.Price) { if (sorttype === 'asc') { return -1; } else { return 1; } }
                if (a.Price > b.Price) { if (sorttype === 'asc') { return 1; } else { return -1; } }
                return 0;
            }
        ));
    }
    getBlockedGiftName(sorttype) {
        return this.friendBlockedGift.map(item => item.sort(
            (a, b) => {
                if (a.Name < b.Name) { if (sorttype === 'asc') { return -1; } else { return 1; } }
                if (a.Name > b.Name) { if (sorttype === 'asc') { return 1; } else { return -1; } }
                return 0;
            }
        ));
    }
    getBlockedGiftUserName(sorttype) {
        return this.friendBlockedGift.map(item => item.sort(
            (a, b) => {
                if (a.Email < b.Email) { if (sorttype === 'asc') { return -1; } else { return 1; } }
                if (a.Email > b.Email) { if (sorttype === 'asc') { return 1; } else { return -1; } }
                return 0;
            }
        ));
    }


    ngOnInit() {
        const self = this;
        this.friendblockedservice.getBlockedGift('OpenDate', 'asc', function (res) {
            self.friendBlockedGift = res;
        });
        this.friendblockedservice.getBlockedGift('Price', 'asc', function (res) {
            self.friendBlockedGiftByPrice = res;
        });
        this.friendblockedservice.getBlockedGift('Name', 'asc', function (res) {
            self.friendBlockedGiftByName = res;
        });
        this.friendblockedservice.getBlockedGift('Email', 'asc', function (res) {
            self.friendBlockedGiftByEmail = res;
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
