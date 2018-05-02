import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../core/services/auth.service';
import { ProfileService } from './profile.service';
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    providers: [NgbDatepickerConfig] // add NgbDatepickerConfig to the component providers
})
export class ProfileComponent implements OnInit, OnDestroy {


    data: Date = new Date();
    uid: string;
    email: string;
    photoUrl: string;
    displayName: string;
    country: string;
    sex = [];
    birth;
    telephone: string;
    dropdownList1 = [];
    dropdownSettings1 = {};
    message;
    constructor(public auth: AuthService, public pf: ProfileService,
        private router: Router, private config: NgbDatepickerConfig) {
        const now = new Date();
        // customize default values of datepickers used by this component tree
        config.minDate = { year: 1900, month: 1, day: 1 };
        config.maxDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };

        // days that don't belong to current month are not visible
        config.outsideDays = 'hidden';
         }

    ngOnInit() {

        this.getCurrentUser();

        this.dropdownList1 = [
            { 'id': 1, 'itemName': 'Male' },
            { 'id': 2, 'itemName': 'Female' },
            { 'id': 3, 'itemName': 'Other' },
        ];

        this.dropdownSettings1 = {
            singleSelection: true,
            text: 'Select Sex',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: false,
            classes: ''
        };

        const body = document.getElementsByTagName('body')[0];
        body.classList.add('profile');
        const navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
        if (navbar.classList.contains('nav-up')) {
            navbar.classList.remove('nav-up');
            navbar.classList.add('nav-down');
        }
    }

    onItemSelect(item: any) {


    }
    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('profile');
        const navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');


    }
    updateUserData() {
        if (!(this.email && this.displayName)) {
            this.message = 'Fillemailname';
        } else {
            // tslint:disable-next-line:max-line-length
            this.pf.updateUserData(this.uid, this.email, this.photoUrl, this.displayName, this.country, (this.sex[0] ? this.sex[0]['itemName']: ''),
           this.birth['day'] + '/' + this.birth['month'] + '/' + this.birth['year'], this.telephone);
           this.message = 'Profileupdated';
        }


    }
    getCurrentUser() {
        return this.auth.user.subscribe(data => {
            if (data) {

                this.uid = data.Uid;
                this.email = data.Email;
                this.photoUrl = data.Url;
                this.displayName = data.Name;
                this.country = data.Country;
                if ((data.Sex.length > 0)) {
                    switch (data.Sex) {
                        case 'Male':
                            this.sex = [{ 'id': 1, 'itemName': 'Male' }];
                            break;
                        case 'Female':
                            this.sex = [{ 'id': 2, 'itemName': 'Female' }];
                            break;
                        case 'Other':
                            this.sex = [{ 'id': 3, 'itemName': 'Other' }];
                            break;
                        default:
                            break;
                    }
                } else {
                    this.sex = [];
                }

                let bi = data.Birth.split('/');
                this.birth = { year: parseInt(bi[2]), month: parseInt(bi[1]), day: parseInt(bi[0]) };

                this.telephone = data.Telephone;
            }

        });
    }

}
