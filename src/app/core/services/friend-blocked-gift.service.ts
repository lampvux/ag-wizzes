import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';


import { Observable } from 'rxjs/Rx';
import { switchMap, mergeMap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { User } from '../models/user';
@Injectable()
export class FriendBlockedGiftService {
    uid;
    Ref;
    blocked_gift;
    blockedlists = [];
    block_res;
    something;
    constructor(private auth: AuthService, private afs: AngularFirestore) {
       /*  this.uid = this.auth.getUserId();
        console.log(this.uid);
        this.Ref = this.afs.collection(`users/${this.auth.getUserId()}/Block_GIFT`); */

    }

    getBlockedGift(field, sorttype, callback) {
        this.Ref = this.afs.collection(`users/${this.auth.getUserId()}/Block_GIFT`);
        this.Ref.valueChanges().subscribe(blockedlist => {
            const st = [];
            for (let index = 0; index < blockedlist.length; index++) {
                const element = blockedlist[index];
                this.afs.doc<User>(`users/${element.IdUser}`).valueChanges().subscribe(user => {
                    this.afs.doc(`users/${element.IdUser}/MyList/${element.IdGift}`).valueChanges().subscribe(gift => {
                        let uid = element.IdUser;
                        let id = element.IdGift;
                        let dat = Object.assign({ user, id, uid }, gift);
                        st.push(dat);
                        if (index === blockedlist.length) {
                            this.block_res = st;
                            }
                    });
                });
            }
            callback(Observable.of(st).map(item => item.sort(
                (a, b) => {
                    if (a[field] < b[field]) { if (sorttype === 'asc') { return -1; } else { return 1; } }
                    if (a[field] > b[field]) { if (sorttype === 'asc') { return 1; } else { return -1; } }
                    return 0;
                }
            )));

        });
    }

}
