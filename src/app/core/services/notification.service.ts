import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';


import { User } from '../models/user';
import { Notification } from '../models/notification';
import { AuthService } from './auth.service';
@Injectable()
export class NotificationService {
    uid: any;
    notificationRef: AngularFirestoreCollection<Notification>;
    constructor(private auth: AuthService, private afs: AngularFirestore) {
        // this.auth.getUserId() = this.auth.getUserId();

        // tslint:disable-next-line:max-line-length
        // this.afs.collection(`users/${this.auth.getUserId()}/Notification`) = this.afs.collection(`users/${this.auth.getUserId()}/Notification`);
     }

    getNotificationsTime(sorttype) {
        return this.afs.collection(`users/${this.auth.getUserId()}/Notification`).snapshotChanges().map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as Notification;
                const id = a.payload.doc.id;
                return { id, ...data };
            });
        }).map(item => item.sort(
            (a, b) => {
                if (a.Date < b.Date) { if (sorttype === 'asc') { return -1; } else { return 1; } }
                if (a.Date > b.Date) { if (sorttype === 'asc') { return 1; } else { return -1; } }
                return 0;
            }
        ));
    }
    getNotificationsRead(sorttype) {
        return this.afs.collection(`users/${this.auth.getUserId()}/Notification`).snapshotChanges().map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as Notification;
                const id = a.payload.doc.id;
                return { id, ...data };
            });
        }).map(item => item.sort(
            (a, b) => {
                if (a.Read < b.Read) { if (sorttype === 'asc') { return -1; } else { return 1; } }
                if (a.Read > b.Read) { if (sorttype === 'asc') { return 1; } else { return -1; } }
                return 0;
            }
        ));
    }
    getNotificationsCate(sorttype) {
        return this.afs.collection(`users/${this.auth.getUserId()}/Notification`).snapshotChanges().map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as Notification;
                const id = a.payload.doc.id;
                return { id, ...data };
            });
        }).map(item => item.sort(
            (a, b) => {
                if (a.Type < b.Type) { if (sorttype === 'asc') { return -1; } else { return 1; } }
                if (a.Type > b.Type) { if (sorttype === 'asc') { return 1; } else { return -1; } }
                return 0;
            }
        ));
    }
    getNoti(notid) {
        return this.afs.doc<Notification>(`users/${ this.auth.getUserId() }/Notification/${notid}`).valueChanges();
    }
    markReadNotifi(id, callback) {
        this.afs.doc(`users/${this.auth.getUserId()}/Notification/${id}`).update({Read: true})
        .then( () => {
            callback('Mark read');
        }).catch( () => {
            callback('Failed');
        });
    }
    createNotifi(type, uid, data) {
        const datecreated = this.getDateCreated();
        data.Type = type;
        data.Date = datecreated;
        this.afs.collection(`users/${uid}/Notification`).add(data);
    }
    deleteNotifi(id, callback) {
        this.afs.doc(`users/${ this.auth.getUserId() }/Notification/${id}`).delete().then( () => {
            callback('Deleted');
        }).catch( () => {
            callback('Error failed');
        });
    }
    getDateCreated() {
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
        return yyyy + '-' + mm + '-' + dd + ' ' + h + ':' + m + ':' + s;
    }

}
