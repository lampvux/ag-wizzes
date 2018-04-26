import { NgModule , Component, OnInit } from '@angular/core';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { FriendSharedlistService } from '../../core/services/friend-sharedlist.service';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Listitems } from '../../core/models/lists';
import { Sharelists } from '../../core/models/sharelists';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-share-list-details',
  templateUrl: './share-list-details.component.html',
  styleUrls: ['./share-list-details.component.css']
})
export class ShareListDetailsComponent implements OnInit {
    id: any;
    uid;
    private sub: any;
    Member = [];
    Title;
    OtherInfo;
    ExpiryDate: any;
    UrlImage: any;
    Admin;
    AdminId;
    error;
    infoMess;
    OpenDate: any;
    message;
    closeResult;
    is_join = false;
    is_deny = false;
    ListsshareditemLastest;
    ListsshareditemTitle;
    ListsshareditemExpiry;
    constructor(private auth: AuthService,
        private route: ActivatedRoute,
        private sharedlistservice: FriendSharedlistService,
        private router: Router,
        private modalService: NgbModal) {
        this.uid = this.auth.getUserId();
     }
    /** MODAL SECTION */
    open(content, type) {
        if (type === 'sm') {
            this.modalService.open(content, { size: 'sm' }).result.then((result) => {
                if (result === 'delete') {
                    this.deleteShareList();
                }
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
    deleteShareList() {
        this.sharedlistservice.deletelist(this.id);
    }
    acceptShareList() {
        this.sharedlistservice.acceptShareList(this.id, this.AdminId);
        this.is_join = true;
    }
    denyShareList() {
        this.sharedlistservice.denytShareList(this.id, this.AdminId);
        this.is_deny = true;
    }
    ngOnInit() {
        const self = this;
        this.sub = this.route.params.subscribe(params => {
            this.id = params.id;
            this.AdminId = params.adminid;
        });
        if (this.AdminId === this.auth.getUserId()) { this.is_join = true; }
        this.sharedlistservice.viewSharedList(this.AdminId , this.id).subscribe(sharedlist => {
            if (!sharedlist) {
                this.router.navigate(['my-share-list']);
            }

            sharedlist.Members.forEach(element => {
                const memuid = element.uid;

                if (element.accept) {
                    if (memuid === this.auth.getUserId()) { this.is_join = true; }
                    this.auth.getUser(memuid).subscribe(us => {
                        this.Member.push(us.Name || us.Email);
                    });
                }
            });
            this.OtherInfo = sharedlist.OtherInfo;
            this.OpenDate = sharedlist.OpenDate.split(' ')[0];
            this.Title = sharedlist.Title;
            this.ExpiryDate = sharedlist.ExpiryDate;
            this.Admin = sharedlist.AdminName;
        });

        this.sharedlistservice.viewListinSharedListLastest(this.AdminId , this.id, 'desc').subscribe( mylist => {
            this.ListsshareditemLastest = mylist;


        });
        this.sharedlistservice.viewListinSharedListTitle(this.AdminId , this.id, 'desc').subscribe(mylist => {
            this.ListsshareditemTitle = mylist;

        });
        this.sharedlistservice.viewListinSharedListExpiry(this.AdminId , this.id, 'desc').subscribe(mylist => {
            this.ListsshareditemExpiry = mylist;

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
    UpdateshareList() {
        if (!this.Title) {
            this.message = 'Failed to update !';
        } else {
            let data = {
                    ExpiryDate: this.ExpiryDate,

                    OpenDate: this.OpenDate,
                    OtherInfo: this.OtherInfo,
                    Title: this.Title
            };
            this.sharedlistservice.updatelist(this.id, data);
            this.message = 'Share List updated !';
        }
    }

    /* sortDateAsc() {
        this.ListsshareditemLastest = this.getListsbyTime('asc');
    }
    sortDateDesc() {
        this.ListsshareditemLastest = this.getListsbyTime('desc');
    }
    sortPriceAsc() {
        this.ListsshareditemPrice = this.getListsbyPrice('asc');
    }
    sortPriceDesc() {
        this.ListsshareditemPrice = this.getListsbyPrice('desc');
    }
    sortCatAsc() {
        this.ListsshareditemCategory = this.getListbyCategory('asc');
    }
    sortCatDesc() {
        this.ListsshareditemCategory = this.getListbyCategory('desc');
    } */


}
