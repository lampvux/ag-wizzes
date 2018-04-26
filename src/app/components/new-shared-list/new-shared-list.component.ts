import { Component, OnInit, OnDestroy } from '@angular/core';
import { Sharelists } from '../../core/models/sharelists';
import { Friend } from '../../core/models/friend';
import { FriendSharedlistService } from '../../core/services/friend-sharedlist.service';
import { AuthService } from '../../core/services/auth.service';
import { FriendsService } from '../../core/services/friends.service';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-shared-list',
  templateUrl: './new-shared-list.component.html',
  styleUrls: ['./new-shared-list.component.css']
})
export class NewSharedListComponent implements OnInit, OnDestroy {
    Member = [];
    Title: string;
    OtherInfo: string;
    ExpiryDate: any;
    UrlImage: any;
    Admin: string;
    error: string;
    infoMess: string;
    closeResult: string;
    selectedlist = [];
    dropdownList1 = [];
    dropdownSettings1 = {};
    friendlists = [];
    constructor(
        private sharelistservice: FriendSharedlistService,
         private modalService: NgbModal,
         private friendService: FriendsService,
        private router: Router) {
        this.Admin = sharelistservice.DisplayName;
    }
    /** MODAL SECTION */
    open(content, type) {
        if (type === 'sm') {
            this.modalService.open(content, { size: 'sm' }).result.then((result) => {
                if (result === 'cancel') { this.Member = []; this.selectedlist = []; }
            }, (reason) => {
                if (reason === 'cancel') { this.Member = []; this.selectedlist = []; }
            });
        } else {
            this.modalService.open(content).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
                
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                
            });
        }
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
    onItemSelect(e) {

        this.Member.push({'uid': e.userId, 'accept': false});
    }
    OnItemDeSelect(e) {
       this.Member = this.Member.filter(function (el) {
            return el !== e.userId;
        });
    }
    canceladdfriend() {

    }
    ngOnInit() {
        this.dropdownSettings1 = {
            singleSelection: false,
            text: 'Add Friend',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            classes: ''
        };
        const self = this;
        this.friendService.getFriends().subscribe( friend => {
            for (let index = 0; index < friend.length; index++) {
                let element = friend[index] as Friend;
                self.dropdownList1.push({ 'id': index, 'itemName': (element.Name || element.Email), 'userId': element.Id });
            }
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

        if (navbar.classList.contains('nav-up')) {
            navbar.classList.remove('nav-up');
            navbar.classList.add('nav-down');
        }
    }
    CreateShareList() {
        const self = this;
        this.error = 'Loading ...';
        if (this.Title && this.ExpiryDate ) {
            this.sharelistservice.pushSharelist(this.ExpiryDate, this.Member, this.OtherInfo, this.Title, this.UrlImage, function(mess) {

                self.infoMess = mess;
                self.router.navigate(['/my-share-list']);
            });
        } else {
            this.error = 'Failed to create share list ! \n Title and Expiry Date are required !' ;
        }
    }

}
