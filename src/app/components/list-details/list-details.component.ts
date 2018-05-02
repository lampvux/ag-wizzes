import { Component, OnInit, OnDestroy, NgZone, NgModule } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ListsService } from '../../core/services/lists.service';
import { Observable } from 'rxjs/Observable';
import { ImageUploadService } from '../../core/services/image-upload.service';
import { MouseEvent, MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../core/services/category.service';
import { Marker } from '../../core/models/marker';
import { ActivatedRoute, Router } from '@angular/router';
import { Listitems } from '../../core/models/lists';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.css']
})
export class ListDetailsComponent implements OnInit, OnDestroy {
    adminid;
    uid;
    id: any;
    sharelistid;
    myUrl;
    is_own = false;
    is_shared = false;
    doubts = [];
    doubtscommend;
    doubtsanswer;
    error: string;
    blockeduserId: any;
    timeBlocked: any;
    private sub: any;
    Listsitem: Listitems;
    zoom: number = 15;
    lat: number = 51.673858;
    lng: number = 7.815982;
    infoWindow: string;
    title: any;
    price: any;
    category: any;
    checked_cat: any;
    description: any;
    website: any;
    address: any;
    others: any;
    expiry: any;
    message: any;
    opendate: any;
    dropdownList1 = [];
    dropdownSettings1 = {};
    imagesUrls: any;
    markers: Marker[] = [
        {
            lat: 51.673858,
            lng: 7.815982,
            label: '',
            draggable: true
        }
    ];
    ll: any;
    ln: any;
    closeResult: string;
    constructor(
        private Listservice: ListsService,
        public auth: AuthService,
        private cateService: CategoryService,
        private imguploadservice: ImageUploadService,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private route: ActivatedRoute,
        private router: Router,
        private modalService: NgbModal) {
            /* this.auth.getUserId()  = auth.getUserId(); */
            this.myUrl = auth.getUserUrl();
         }
    /** MODAL SECTION */
    open(content, type) {
        if (type === 'sm') {
            this.modalService.open(content, { size: 'sm' }).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
    /** FOR MAP SECTION */
    markerIconUrl() {
        return './assets/img/placemarker.png';
    }
    clickedMarker(label: string, index: number) {
    }
    mapClicked($event: MouseEvent) {
        this.markers = [{
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            draggable: true
        }];
        this.lat = $event.coords.lat;
        this.lng = $event.coords.lng;
    }
    markerDragEnd(m: Marker, $event: MouseEvent) {
        this.markers = [{
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            draggable: true
        }];
        this.lat = $event.coords.lat;
        this.lng = $event.coords.lng;
    }
    /** FOR AUTO COMPLETE SECTION */
    // curent possition
    private setCurrentPosition() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.ll = position.coords.latitude;
                this.ln = position.coords.longitude;
               /*  this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
                this.zoom = 15;
                this.markers = [
                    {
                        lat: this.lat,
                        lng: this.lng,
                        label: '',
                        draggable: true
                    }
                ]; */
            });
        }
    }
    getCat() {
        this.cateService.getCategory().subscribe(cate => {
            this.dropdownList1.splice(0, this.dropdownList1.length);
            const categories = cate[0].title;
            for (let index = 0; index < categories.length; index++) {
                let element = cate[0].title[index];

               if (this.checked_cat === element) { this.category = [{ 'id': index, 'itemName': element }]; }
                this.dropdownList1.push({ 'id': index, 'itemName': element });
            }
        });
    }
    /** DOUBT SECTION */

    /** update list */
    updateList() {
        if (this.title && this.description && this.expiry) {
            let cat = (this.category) ? this.category[0]['itemName'] : '';
            this.lat = (this.lat) ? this.lat : this.ll;
            this.lng = (this.lng) ? this.lng : this.ln;
            if (this.adminid && this.sharelistid) {
                this.message = this.Listservice.updateList(this.imagesUrls, this.id, this.blockeduserId,
                    this.timeBlocked, this.opendate, this.title, this.price, cat,
                    // tslint:disable-next-line:max-line-length
                    this.description, this.website, this.address, this.lat, this.lng, this.others, this.expiry, this.sharelistid, this.adminid);
            } else {
                this.message = this.Listservice.updateList(this.imagesUrls, this.id, this.blockeduserId,
                   this.timeBlocked, this.opendate, this.title, this.price, cat,
                   this.description, this.website, this.address, this.lat, this.lng, this.others, this.expiry, null, null);
            }
        } else {
            this.error = 'Failcreatelist';
        }
    }
    /** delete list */
    deleteList() {
        if (!(this.adminid && this.sharelistid)) {
            this.message = this.Listservice.deletelist(this.id, null, null);
        } else {
            this.message = this.Listservice.deletelist(this.id, this.adminid, this.sharelistid);
        }
    }
    ngOnInit() {
        this.uid = this.auth.getUserId();
        const self = this;
        this.sub = this.route.params.subscribe(params => {
            this.adminid = params.adminid;
            this.id = params.id;
            this.sharelistid = params.sharelistid;

            if (!this.sharelistid) {
                this.Listservice.viewList(this.id).subscribe(list => {
                    if (!list) {
                        this.router.navigate(['my-list']);
                    }
                    this.Listservice.viewDoubts(this.id, this.auth.getUserId(), function(res) {
                        self.doubts = res;

                    });
                    this.is_own = true;
                    // this.doubts = this.Listservice.viewDoubts(this.id, this.auth.getUserId());

                    this.Listsitem = list;
                    this.address = list.ShopAddress;
                    this.description = list.Description;
                    this.checked_cat = list.Category;
                    this.getCat();
                    for (let index = 0; index < this.dropdownList1.length; index++) {
                        const element = this.dropdownList1[index].itemName;
                        if (this.checked_cat === element) { this.category = [{ 'id': index, 'itemName': element }]; break; }
                        this.category = [];
                    }
                    this.expiry = list.ExpiryDate;
                    const latlng = list.LatLon;
                    this.lng = Number.parseFloat( latlng.substring(latlng.lastIndexOf(',') + 1, latlng.lastIndexOf(')')));
                    this.lat = Number.parseFloat(latlng.substring(latlng.lastIndexOf('(') + 1, latlng.lastIndexOf(',')));
                    this.others = list.OtherInformation;
                    this.price = list.Price;
                    this.title = list.Title;
                    this.website = list.Websites;
                    this.opendate = list.OpenDate;
                    this.imagesUrls = list.Url;
                    this.blockeduserId = list.IdUserBlock;
                    this.timeBlocked = list.ExpiryTimeBlock;
                    this.markers = [
                        {
                            lat: this.lat,
                            lng: this.lng,
                            label: '',
                            draggable: true
                        }
                    ];
                    this.infoWindow = this.address;
    
                });
            } else {
                this.Listservice.viewSharedList(this.adminid, this.id, this.sharelistid).subscribe(list => {
                    if (!list) {
                        this.router.navigate(['my-share-list']);
                    }
                    this.Listservice.viewDoubtsinShareList(this.sharelistid, this.id, this.adminid, function (res) {
                        self.doubts = res;

                    });
                    if (this.auth.getUserId() === this.adminid) {
                        this.is_own = true;
                    } else {
                        this.is_own = false;
                        this.is_shared = true;
                    }

                    this.Listsitem = list;
                    this.address = list.ShopAddress;
                    this.description = list.Description;
                    this.checked_cat = list.Category;
                    this.getCat();
                    for (let index = 0; index < this.dropdownList1.length; index++) {
                        const element = this.dropdownList1[index].itemName;

                        if (this.checked_cat === element) { this.category = [{ 'id': index, 'itemName': element }]; break; }
                        this.category = [];
                    }

                    this.expiry = list.ExpiryDate;
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
                    this.timeBlocked = list.ExpiryTimeBlock;
                    this.markers = [
                        {
                            lat: this.lat,
                            lng: this.lng,
                            label: '',
                            draggable: true
                        }
                    ];
                    this.infoWindow = this.address;

                });
            }
        });



        this.dropdownSettings1 = {
            singleSelection: true,
            text: 'Select Category',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: false,
            classes: ''
        };

        // load Places Autocomplete
        this.mapsAPILoader.load().then((map) => {

            const autocomplete = new google.maps.places.Autocomplete(<HTMLInputElement>document.getElementById('searchaddress'));
            autocomplete.addListener('place_changed', () => {
                this.ngZone.run(() => {
                    // get the place result
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                    // verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    this.infoWindow = place.formatted_address;
                    // set latitude, longitude and zoom
                    this.address = place.formatted_address;
                    this.lat = place.geometry.location.lat();
                    this.lng = place.geometry.location.lng();
                    this.markers = [
                        {
                            lat: this.lat,
                            lng: this.lng,
                            label: '',
                            draggable: true
                        }
                    ];
                    this.zoom = 15;
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

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    replyDoubt(normal, doubid, message) {

        if (!message) {
            return false;
        } else {
            if (normal) {
                this.Listservice.answerDoubt(this.id, doubid, message);
            } else {
                this.Listservice.answerDoubtshareList(this.sharelistid, this.id, this.adminid, doubid, message );
            }
        }
    }

}
