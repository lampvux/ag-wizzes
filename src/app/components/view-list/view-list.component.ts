import { Component, OnInit, OnDestroy, NgZone, NgModule } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ListsService } from '../../core/services/lists.service';
import { Observable } from 'rxjs/Observable';

import { MouseEvent, MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';

import { Marker } from '../../core/models/marker';
import { ActivatedRoute } from '@angular/router';
import { Listitems } from '../../core/models/lists';
import { NgbModal, ModalDismissReasons, NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.css']
})
export class ViewListComponent implements OnInit, OnDestroy {
    private sub: any;
    myid;
    isblocked = false;
    blockedbyanother = false;
    timeblock;
    id: any;
    doubts;
    uid; any;
    zoom = 15;
    doubtscommend;
    errmess;
    giftMess;
    expy;
    address; description; checked_cat; expiry; lng; lat; others; price; title; website; opendate; imagesUrls;
    blockeduserId; timeBlocked; infoWindow;
    markers: Marker[] = [
        {
            lat: 51.673858,
            lng: 7.815982,
            label: '',
            draggable: true
        }
    ];
    constructor(
        private Listservice: ListsService,
        private auth: AuthService,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private route: ActivatedRoute,
        private modalService: NgbModal) {
        // this.auth.getUserId() = this.auth.getUserId();
         }
    doubtsCLick() {

    }
    sendDoubts() {
        const self = this;
        if (!this.doubtscommend) {
            this.errmess = 'Please say something !';
        } else {
            this.Listservice.sendDoubts(this.id, this.uid, this.doubtscommend , function(res) {
                self.errmess = res;
            });
        }
    }
    blockGift() {
        const self = this;
        this.Listservice.blockGift(this.id, this.uid, this.timeblock, function(res) {
            self.giftMess = res;
            self.isblocked = true;
            self.blockedbyanother = false;
        });
    }
    unblockGift() {
        const self = this;
        this.Listservice.unblockGift(this.id, this.uid, function(res) {
            self.giftMess = res;
            self.isblocked = false;
            self.blockedbyanother = false;

        });
    }
    confirmGiftBought() {

    }
    cancelGiftBought() {

    }
    /** MODAL SECTION */
    open(content, type) {

        if (type === 'sm') {
            this.modalService.open(content, { size: 'sm' }).result.then((result) => {
            }, (reason) => {
            });
        } else   if (type === 'lg') {
                this.modalService.open(content, { size: 'lg' }).result.then((result) => {
                    if (result === 'blockgift') {
                        this.blockGift();
                    }
                }, (reason) => {

                });
        } else {
            this.modalService.open(content).result.then((result) => {
            }, (reason) => {
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
    markerIconUrl() {
        return './assets/img/placemarker.png';
    }
    ngOnInit() {
        const self = this;
        this.sub = this.route.params.subscribe(params => {
            this.id = params.id;
            this.uid = params.uid;

            this.Listservice.viewOutsideList(this.id, this.uid).subscribe(list => {

                if (this.auth.getUserId() === list.IdUserBlock) {
                    this.isblocked = true;
                    var timeblocked = list.ExpiryTimeBlock.split(':')[0];
                    var opentimeblock = new Date(list.OpenTimeBlock);
                    opentimeblock.setHours(opentimeblock.getHours() + parseInt(timeblocked));
                    let dd: any = opentimeblock.getDate();
                    let mm: any = opentimeblock.getMonth() + 1; // January is 0!
                    const yyyy: any = opentimeblock.getFullYear();
                    const h: any = opentimeblock.getHours();
                    const m: any = opentimeblock.getMinutes();
                    const s: any = opentimeblock.getSeconds();
                    if (dd < 10) {
                        dd = '0' + dd;
                    }
                    if (mm < 10) {
                        mm = '0' + mm;
                    }
                    const expdate = yyyy + '-' + mm + '-' + dd + ' ' + h + ':' + m + ':' + s;

                    setInterval(function () {
                        self.getdatediff(expdate, function (res) {
                            self.expiry = res;
                        });
                    }, 1000);
                }  else if (list.IdUserBlock) {
                    this.blockedbyanother = true;
                    var timeblocked = list.ExpiryTimeBlock.split(':')[0];
                    var opentimeblock = new Date(list.OpenTimeBlock);
                    opentimeblock.setHours(opentimeblock.getHours() + parseInt(timeblocked));
                    let dd: any = opentimeblock.getDate();
                    let mm: any = opentimeblock.getMonth() + 1; // January is 0!
                    const yyyy: any = opentimeblock.getFullYear();
                    const h: any = opentimeblock.getHours();
                    const m: any = opentimeblock.getMinutes();
                    const s: any = opentimeblock.getSeconds();
                    if (dd < 10) {
                        dd = '0' + dd;
                    }
                    if (mm < 10) {
                        mm = '0' + mm;
                    }
                    const expdate = yyyy + '-' + mm + '-' + dd + ' ' + h + ':' + m + ':' + s;

                    setInterval(function () {
                        self.getdatediff(expdate, function (res) {
                            self.expiry = res;
                        });
                    }, 1000);
                }
                //console.log(this.isblocked );

                this.address = list.ShopAddress;
                this.description = list.Description;
                this.checked_cat = list.Category;
                const date = new Date(list.ExpiryDate);

                var day = date.getDate().toString();
                var month = (date.getMonth() + 1).toString();
                this.expy = date.getFullYear() + '-' + (month[1] ? month : '0' + month[0]) + '-' + (day[1] ? day : '0' + day[0]) ;

                

                const latlng = list.LatLon;
                this.lng = Number.parseFloat(latlng.substring(latlng.lastIndexOf(',') + 1, latlng.lastIndexOf(')')));
                this.lat = Number.parseFloat(latlng.substring(latlng.lastIndexOf('(') + 1, latlng.lastIndexOf(',')));
                this.others = list.OtherInformation;
                this.price = list.Price;
                this.title = list.Title;
                this.website = list.Websites;
                this.opendate = list.OpenDate;
                this.imagesUrls = list.Url;
                this.blockeduserId = list.IdUserBlock;
                // this.timeBlocked = list.ExpiryTimeBlock;
                this.markers = [
                    {
                        lat: this.lat,
                        lng: this.lng,
                        label: '',
                        draggable: true
                    }
                ];
                this.infoWindow = this.address;
                this.Listservice.viewDoubts(this.id, this.uid, function(res) {
                    self.doubts = res;
                });
            });
        });

        const body = document.getElementsByClassName('map')[0];
        body.classList.add('contact-us');

        const navbar = document.getElementsByTagName('nav')[0];
        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        // Scroll Down
        if (navbar.classList.contains('nav-up')) {
            navbar.classList.remove('nav-up');
            navbar.classList.add('nav-down');
        }

    }
    getdatediff(Expirydate, callback) {
        let diff = Math.abs((new Date()).getTime() - (new Date(Expirydate)).getTime());
        let daysDifference = Math.floor(diff / 1000 / 60 / 60 / 24);
        diff -= daysDifference * 1000 * 60 * 60 * 24;
        let hoursDifference = Math.floor(diff / 1000 / 60 / 60);
        diff -= hoursDifference * 1000 * 60 * 60;


        callback(daysDifference + ' days,  ' + hoursDifference + 'hours '
            );
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
