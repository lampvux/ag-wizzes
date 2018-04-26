import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';


import { Observable } from 'rxjs/Observable';
import { switchMap, mergeMap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { User } from '../models/user';
import { Friend } from '../models/friend';
@Injectable()
export class FriendsService {
    uid: any;
    thisuserRef: AngularFirestoreDocument<User>;
    friend: AngularFirestoreCollection<Friend>;
    friendrequest: any;
    email: any;
    name: any;
    url: any;
    allusers: Observable<any>;
    constructor(private auth: AuthService,
         private route: Router,
         private afs: AngularFirestore,
         private notificationService: NotificationService) {
    }
    getUser(uid) {
        return this.afs.doc<User>(`users/${uid}`).valueChanges();
    }
    getAllUsers() {
        return this.afs.collection<User>(`users`).snapshotChanges().map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
            });
        });
    }
    getFriends() {
        return this.afs.collection<Friend>(`users/${this.auth.getUserId()}/Friends`).snapshotChanges().map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as Friend;
                const id = a.payload.doc.id;
                return { id, ...data };
            });
        });
    }
    removeFriend(frienddocid) {
        return this.afs.collection<Friend>(`users/${this.auth.getUserId()}/Friends`).doc(`${frienddocid}`).delete();
    }
    getFriendRequests() {
        return this.afs.doc(`users/${this.auth.getUserId()}`).collection('PendingRequest').snapshotChanges().map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
            });
        });
    }
    getFriendRequestStatus(idfriend) {
        return this.afs.collection(`users/${idfriend}/PendingRequest`, ref => ref.where('Id', '==', this.auth.getUserId())).valueChanges();
    }
    getFriendStatus(idfriend) {
        // tslint:disable-next-line:max-line-length
        return this.afs.doc(`users/${this.auth.getUserId()}`).collection<Friend>('Friends', ref => ref.where('Id', '==', idfriend)).valueChanges();
    }
    denyFriend(idrequest) {
        this.afs.doc(`users/${this.auth.getUserId()}`).collection('PendingRequest').doc(`${idrequest}`).delete().then(function () {
            return 'Request Denied !';
        }).catch(function (error) {
            return 'Failed  !';
        });
    }
    acceptFriend(requestid, email, friendid, name, url, ) {
        this.afs.doc(`users/${this.auth.getUserId()}`).collection('PendingRequest').doc(`${requestid}`).delete();

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
            Email: email || '',
            Id: friendid,
            Name: name,
            Url: url || ''
        };
        const data2 = {
            Email: this.auth.getUseremail() || '',
            Id: this.auth.getUserId(),
            Name: this.auth.getUserName(),
            Url: this.auth.getUserUrl() || ''
        };
        this.afs.collection<Friend>(`users/${this.auth.getUserId()}/Friends`).add(data);
        this.afs.collection<Friend>(`users/${friendid}/Friends`).add(data2);
    }
    addFriend(friendid) {
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
        const useradddata = {
            Id: this.auth.getUserId(),
            Email: this.auth.getUseremail(),
            Name: this.auth.getUserName(),
            Url: this.auth.getUserUrl(),
            OpenDate: date_created
        };
        this.afs.doc(`users/${friendid}`).collection('PendingRequest').add(useradddata);
        this.notificationService.createNotifi('New Friend', friendid, {
            DoubtId: '',
            IdFriend: this.auth.getUserId(),
            IdGift: '',
            Read: false,
            Title: 'You have new friend request \n check the friend request box !'
        });
    }

}
