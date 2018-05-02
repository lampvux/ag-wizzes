import { Component, OnInit, OnDestroy } from '@angular/core';
import { SettingContactService } from '../../core/services/setting-contact.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-settings-contact',
  templateUrl: './settings-contact.component.html',
  styleUrls: ['./settings-contact.component.css']
})
export class SettingsContactComponent implements OnInit, OnDestroy {

    constructor(private settingservice: SettingContactService, private router: ActivatedRoute) { }
    push_notification = true;
    friend_see_list = true;
    language;
    currency;
    contactMessage;
    message;
    contactmess;
    onChange(e) {}
    getSettings() {
        this.settingservice.getSetting().subscribe(user => {

            this.push_notification = user.PushNotifications;
            this.friend_see_list = user.AllowFriendSeeLists;
            this.language = user.Language || 'EN';
            this.currency = user.Currency || 'USD';

        } );
    }
    updateSettings() {
        const self = this;
        this.settingservice.saveSetting(this.language, this.currency, this.push_notification, this.friend_see_list, function(res){
            self.message = res;
        });
    }
    sendContactMess() {
        const self = this;
        if (!this.contactmess) {
            this.contactmess = 'Contactempty';
        } else {
            this.settingservice.sendContact(this.contactMessage, function(res) {
                self.contactmess = res;
            });
        }
    }
    ngOnInit() {
        this.getSettings();

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
