import { Component,  OnInit, OnDestroy, NgZone,  NgModule } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ListsService } from '../../core/services/lists.service';
import { FriendSharedlistService } from '../../core/services/friend-sharedlist.service';
import { Observable } from 'rxjs/Observable';
import { ImageUploadService } from '../../core/services/image-upload.service';
import { MouseEvent, MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../core/services/category.service';
import { Marker } from '../../core/models/marker';
import { ActivatedRoute, Router} from '@angular/router';

// declare var google: any;
@Component({
  selector: 'app-newlist',
  templateUrl: './newlist.component.html',
  styleUrls: ['./newlist.component.css']
})

export class NewlistComponent implements OnInit, OnDestroy {
    data: Date = new Date();
    /* tagItems = ['Minimal', 'Light', 'New', 'Friends'];
    categories = ['Food', 'Drink'];
    */
    sharelistid: any = null;
    adminsharelistid: any = null;
    private sub: any;
    zoom: number = 15;
    lat: number = 51.673858;
    lng: number = 7.815982;
    infoWindow: string;
    title: any;
    price: any;
    category: any;
    description: any;
    website: any;
    address: any;
    others: any;
    expiry: any;
    message: any;
    imagesUrl: any;
    dropdownList1 = [];
    dropdownSettings1 = {};
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
    today;
    constructor(
        private Listservice: ListsService,
        private sharelistService: FriendSharedlistService,
        public auth: AuthService,
        private cateService: CategoryService,
        private imguploadservice: ImageUploadService,
        private mapsAPILoader: MapsAPILoader,
        private route: ActivatedRoute,
        private router: Router,
        private ngZone: NgZone) { }
/** FOR MAP SECTION */
    markerIconUrl() {
        return './assets/img/place-marker-64.png';
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
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
                this.zoom = 15;
                this.markers = [
                    {
                        lat: this.lat,
                        lng: this.lng,
                        label: '',
                        draggable: true
                    }
                ];
                this.ll = this.lat;
                this.ln = this.lng;
            });
        }
    }
    /** upload list */
    Pushupload() {
        this.message = 'Uploadnewlist';
        if (this.title && this.description && this.expiry ) {
            let cat = (this.category) ? this.category[0]['itemName'] : '';
            this.lat = (this.lat) ? this.lat : this.ll;
            this.lng = (this.lng) ? this.lng : this.ln;
            if (!(this.sharelistid && this.adminsharelistid)) {
                this.message = this.Listservice.pushList(
                    this.title, this.price, cat, this.description,
                    this.website, this.address, this.lat, this.lng, this.others, this.expiry, null, null);
            } else {

                this.message = this.Listservice.pushList(
                    this.title, this.price, cat, this.description,
                    this.website, this.address, this.lat, this.lng, this.others, this.expiry, this.sharelistid, this.adminsharelistid);
            }
        } else {

            this.message = 'Failcreatelistrequired';
        }
    }
    ngOnInit() {
        this.today = this.Listservice.getDateCreated();

        const self = this;
        this.sub = this.route.params.subscribe(params => {
            this.sharelistid = params.id;
            this.adminsharelistid = params.adminid;
            if (this.adminsharelistid) {

                this.sharelistService.viewSharedList(this.adminsharelistid , this.sharelistid).subscribe(shared => {
                    if (!shared) {
                        this.router.navigate(['my-share-list']);
                    }
                });
            }

        });
        this.cateService.getCategory().subscribe(cate => {
            const categories = cate[0].title;
            for (let index = 0; index < categories.length; index++) {
                let element = cate[0].title[index];
                self.dropdownList1.push({'id': index, 'itemName': element});
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

        this.setCurrentPosition();
        // load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
            const autocompletefield = document.getElementById('searchaddress');
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
        var body = document.getElementsByClassName('map')[0];
        body.classList.add('contact-us');
        const navbar = document.getElementsByTagName('nav')[0];
        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is 'behind' the navbar.
        // Scroll Down
        if (navbar.classList.contains('nav-up')) {
            navbar.classList.remove('nav-up');
            navbar.classList.add('nav-down');
        }
    }
    ngOnDestroy() {
        const navbar = document.getElementsByTagName('nav')[0];
        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        // Scroll Down

    }

}
