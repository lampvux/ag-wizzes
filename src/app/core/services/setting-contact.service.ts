import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { switchMap, mergeMap } from 'rxjs/operators';
import { User } from '../models/user';
import { SettingContact } from '../models/setting-contact';
import { AuthService } from './auth.service';
@Injectable()
export class SettingContactService {
    userRef: any;
    uid: any;
    user: any;
    constructor( private auth: AuthService, private afs: AngularFirestore) {
        // this.auth.getUserId() = this.auth.getUserId();

       // this.afs.doc(`users/${this.auth.getUserId()}`) = this.afs.doc(`users/${this.auth.getUserId()}`);
    }
    saveSetting(language, currency, push_noti, allow_lists, callback) {
        const data = {
            Language: language,
            Currency: currency,
            PushNotifications: push_noti,
            AllowFriendSeeLists: allow_lists
        };
        this.afs.doc(`users/${this.auth.getUserId()}`).update(data).then(res => {
            callback('Settingupdated');
        }).catch( err => {
            callback('Failed');
        });
    }
    getSetting() {
        return this.afs.doc<SettingContact>(`users/${this.auth.getUserId()}`).valueChanges();
    }
    sendContact(message, callback) {
        const today = new Date();
        let dd: any = today.getDate();
        let mm: any = today.getMonth() + 1; // January is 0!
        const yyyy: any = today.getFullYear();
        const h: any = today.getHours();
        const m: any = today.getMinutes();
        const s: any = today.getSeconds();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        const date_created = yyyy + '-' + mm + '-' + dd + ' ' + h + ':' + m + ':' + s;
        const data = {
            UserId: this.auth.getUserId(),
            Message: message,
            OpenDate: date_created
        };
        this.afs.doc(`admin/p1TcEZbkUH52NfbbGIWt/Messages/${this.auth.getUserId()}`).set(data).then(res => {
            callback('Contactmess');
        }).catch( res => {
            callback('Failed');
        });
    }

}
