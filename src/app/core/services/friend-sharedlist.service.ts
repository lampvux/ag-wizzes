import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import { ImageUploadService } from './image-upload.service';

import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

import { User } from '../models/user';
import { Listitems } from '../models/lists';
import { Sharelists } from '../models/sharelists';
import { MemberShareList} from '../models/membersharelist';
@Injectable()
export class FriendSharedlistService {
    sharelistCollection: AngularFirestoreCollection<Sharelists>;
    sharelist: Observable<Sharelists[]>;
    sharelistDoc: AngularFirestoreDocument<Sharelists>;
    uid: any;
    DisplayName: any;
    userRef: AngularFirestoreDocument<User>;
    constructor(private auth: AuthService,
        private afs: AngularFirestore,
        private router: Router,
        private imgup: ImageUploadService) {
       // this.auth.getUserId() = this.auth.getUserId();
       
        // this.auth.getUserName() = this.auth.getUserName();
       /*  this.afs.doc(`users/${this.auth.getUserId()}`) = this.afs.doc(`users/${this.auth.getUserId()}`);
        this.afs.collection<Sharelists>(`users/${this.auth.getUserId()}/ShareList`)
        = this.afs.doc(`users/${this.auth.getUserId()}`).collection<Sharelists>('ShareList');
 */
    }
    viewListInShareList(sharelistid, listid) {

    }
    getShareLists(field, sorttype, callback) {
        const st = [];
        this.afs.collection<Sharelists>(`users/${this.auth.getUserId()}/ShareList`).snapshotChanges().map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as Listitems;
                const id = a.payload.doc.id;
                data.Price = parseFloat(data.Price);
                let adminid = this.auth.getUserId();
                st.push({ adminid, id, ...data });
                return { adminid, id, ...data };
            });
        });
        // tslint:disable-next-line:max-line-length
        this.afs.doc(`users/${this.auth.getUserId()}`).collection<MemberShareList>('MemberShareList').valueChanges().subscribe(acceptsharelist => {

            for (let index = 0; index < acceptsharelist.length; index++) {
                const element = acceptsharelist[index];
                if (element.Accept === true) {
                    const id = element.ShareListId;
                    let adminid = element.AdminId;
                    console.log(element);
                    // tslint:disable-next-line:max-line-length
                    this.afs.doc(`users/${element.AdminId}/ShareList/${element.ShareListId}`).valueChanges().subscribe(newacceptlist => {
                        st.push({ adminid, id, ...newacceptlist });
                    });
                }
            }
        });
        callback(Observable.of(st).map(item => item.sort(
            (a, b) => {
                if (a[field] < b[field]) { if (sorttype === 'asc') { return -1; } else { return 1; } }
                if (a[field] > b[field]) { if (sorttype === 'asc') { return 1; } else { return -1; } }
                return 0;
            }
        )));
    }
    // Function to compare two objects by comparing their `unwrappedName` property.


    getsharelists(sorttype) {
        return this.afs.collection<Sharelists>(`users/${this.auth.getUserId()}/ShareList`).snapshotChanges().map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as Sharelists;
                const id = a.payload.doc.id;
                return { id, ...data };
            });
        }).map(item => item.sort(
            (a, b) => {
                if (a.OpenDate < b.OpenDate) { if (sorttype === 'asc') { return -1; } else { return 1; } }
                if (a.OpenDate > b.OpenDate) { if (sorttype === 'asc') { return 1; } else { return -1; } }
                return 0;
            }
        ));
    }
    getSharelistbyTitle(sorttype) {
        return this.afs.collection<Sharelists>(`users/${this.auth.getUserId()}/ShareList`).snapshotChanges().map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as Sharelists;
                const id = a.payload.doc.id;
                return { id, ...data };
            });
        }).map(item => item.sort(
            (a, b) => {
                if (a.Title < b.Title) { if (sorttype === 'asc') { return -1; } else { return 1; } }
                if (a.Title > b.Title) { if (sorttype === 'asc') { return 1; } else { return -1; } }
                return 0;
            }
        ));
    }
    getSharelistbyExpiry(sorttype) {
        return this.afs.collection<Sharelists>(`users/${this.auth.getUserId()}/ShareList`).snapshotChanges().map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as Sharelists;
                const id = a.payload.doc.id;
                return { id, ...data };
            });
        }).map(item => item.sort(
            (a, b) => {
                if (a.ExpiryDate < b.ExpiryDate) { if (sorttype === 'asc') { return -1; } else { return 1; } }
                if (a.ExpiryDate > b.ExpiryDate) { if (sorttype === 'asc') { return 1; } else { return -1; } }
                return 0;
            }
        ));
    }
    addSharelist(sharelist: Sharelists) {
        this.afs.collection<Sharelists>(`users/${this.auth.getUserId()}/ShareList`).add(sharelist);
    }
    viewSharedList(adminId, sharelistId) {
        if (adminId === this.auth.getUserId() ) {
            // tslint:disable-next-line:max-line-length
            return this.afs.collection<Sharelists>(`users/${this.auth.getUserId()}/ShareList`).doc<Sharelists>(`${sharelistId}`).valueChanges();
        } else {
            return this.afs.doc<Sharelists>(`users/${adminId}/ShareList/${sharelistId}`).valueChanges();
        }
    }
    viewListinSharedListLastest(adminId, sharelistId, sorttype) {
        if (adminId === this.auth.getUserId()) {
            // tslint:disable-next-line:max-line-length
            return this.afs.collection<Sharelists>(`users/${this.auth.getUserId()}/ShareList`).doc<Sharelists>(`${sharelistId}`).collection<Listitems>('MyList').snapshotChanges().map(changes => {
                return changes.map(a => {
                    const data = a.payload.doc.data() as Listitems;
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
            }).map(item => item.sort(
                (a, b) => {
                    if (a.OpenDate < b.OpenDate) { if (sorttype === 'asc') { return -1; } else { return 1; } }
                    if (a.OpenDate > b.OpenDate) { if (sorttype === 'asc') { return 1; } else { return -1; } }
                    return 0;
                }
            ));
        } else {
            // tslint:disable-next-line:max-line-length
            return this.afs.doc(`users/${adminId}/ShareList/${sharelistId}`).collection<Listitems>('MyList').snapshotChanges().map(changes => {
                return changes.map(a => {
                    const data = a.payload.doc.data() as Listitems;
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
            }).map(item => item.sort(
                (a, b) => {
                    if (a.OpenDate < b.OpenDate) { if (sorttype === 'asc') { return -1; } else { return 1; } }
                    if (a.OpenDate > b.OpenDate) { if (sorttype === 'asc') { return 1; } else { return -1; } }
                    return 0;
                }
            ));
        }
    }
    viewListinSharedListTitle(adminId,  sharelistId, sorttype) {
        if (adminId === this.auth.getUserId()) {
            // tslint:disable-next-line:max-line-length
            return this.afs.collection<Sharelists>(`users/${this.auth.getUserId()}/ShareList`).doc<Sharelists>(`${sharelistId}`).collection<Listitems>('MyList').snapshotChanges().map(changes => {
                return changes.map(a => {
                    const data = a.payload.doc.data() as Listitems;
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
            }).map(item => item.sort(
                (a, b) => {
                    if (a.Title < b.Title) { if (sorttype === 'asc') { return -1; } else { return 1; } }
                    if (a.Title > b.Title) { if (sorttype === 'asc') { return 1; } else { return -1; } }
                    return 0;
                }
            ));
        } else {
            // tslint:disable-next-line:max-line-length
            return this.afs.doc(`users/${adminId}/ShareList/${sharelistId}`).collection<Listitems>('MyList').snapshotChanges().map(changes => {
                return changes.map(a => {
                    const data = a.payload.doc.data() as Listitems;
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
            }).map(item => item.sort(
                (a, b) => {
                    if (a.Title < b.Title) { if (sorttype === 'asc') { return -1; } else { return 1; } }
                    if (a.Title > b.Title) { if (sorttype === 'asc') { return 1; } else { return -1; } }
                    return 0;
                }
            ));
        }
    }
    viewListinSharedListExpiry(adminId, sharelistId, sorttype) {
        if (adminId === this.auth.getUserId()) {
            // tslint:disable-next-line:max-line-length
            return this.afs.collection<Sharelists>(`users/${this.auth.getUserId()}/ShareList`).doc<Sharelists>(`${sharelistId}`).collection<Listitems>('MyList').snapshotChanges().map(changes => {
                return changes.map(a => {
                    const data = a.payload.doc.data() as Listitems;
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
            }).map(item => item.sort(
                (a, b) => {
                    if (a.ExpiryDate < b.ExpiryDate) { if (sorttype === 'asc') { return -1; } else { return 1; } }
                    if (a.ExpiryDate > b.ExpiryDate) { if (sorttype === 'asc') { return 1; } else { return -1; } }
                    return 0;
                }
            ));
        } else {
            // tslint:disable-next-line:max-line-length
            return this.afs.doc(`users/${adminId}/ShareList/${sharelistId}`).collection<Listitems>('MyList').snapshotChanges().map(changes => {
                return changes.map(a => {
                    const data = a.payload.doc.data() as Listitems;
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
            }).map(item => item.sort(
                (a, b) => {
                    if (a.ExpiryDate < b.ExpiryDate) { if (sorttype === 'asc') { return -1; } else { return 1; } }
                    if (a.ExpiryDate > b.ExpiryDate) { if (sorttype === 'asc') { return 1; } else { return -1; } }
                    return 0;
                }
            ));
        }
    }
    async deletelist(sharelistid) {
        // tslint:disable-next-line:max-line-length
        const qry = await this.afs.collection(`users/${this.auth.getUserId()}/ShareList/${sharelistid}/MyList`).ref.get();
        const batch = this.afs.firestore.batch();
        // You can use the QuerySnapshot above like in the example i linked
        qry.forEach(doc => {
            batch.delete(doc.ref);
        });

        batch.commit().then(res => {
            this.afs.doc(`users/${this.auth.getUserId()}/ShareList/${sharelistid}`).delete().then(ress => {
                this.router.navigate(['my-share-list']);
            }).catch(error => {

            });
        }).catch(err => {

        });

    }

    updatelist(id, data) {
        this.afs.collection<Sharelists>(`users/${this.auth.getUserId()}/ShareList`).doc(`${id}`).update(data);
    }
    /** Push new list */
    acceptShareList(sharelistid, uid) {
        // tslint:disable-next-line:max-line-length
        this.afs.collection(`users/${this.auth.getUserId()}/MemberShareList`, ref => ref.where('ShareListid', '==', sharelistid)).snapshotChanges().map(changes => {
            return changes.map(a => {
                const id = a.payload.doc.id;
                return {id};
            });
        }).subscribe(membershare => {

            if (membershare) {
                this.afs.doc(`users/${this.auth.getUserId()}/MemberShareList/${membershare[0].id}`).update({Accept: true});
            }
        });
        this.afs.doc<Sharelists>(`users/${uid}/ShareList/${sharelistid}`).valueChanges().subscribe(sharelist => {
            const members = sharelist.Members;

            if (members) {
                var count = 0;
                members.forEach(element => {
                    // tslint:disable-next-line:max-line-length
                    if (count === members.length) { this.afs.doc<Sharelists>(`users/${uid}/ShareList/${sharelistid}`).update({ Members: members }).then(res => console.log(res)); }
                    if (element.uid === this.auth.getUserId()) { element.accept = true; }
                    count++;
                });
            }
        });
    }
    denytShareList(sharelistid, uid) {
        // tslint:disable-next-line:max-line-length
        this.afs.collection(`users/${this.auth.getUserId()}/MemberShareList`, ref => ref.where('ShareListid', '==', sharelistid)).snapshotChanges().map(changes => {
            return changes.map(a => {
                const id = a.payload.doc.id;
                return { id };
            });
        }).subscribe(membershare => {
            if (membershare) {
                this.afs.doc(`users/${this.auth.getUserId()}/MemberShareList/${membershare[0].id}`).delete();
            }
        });
    }
    pushSharelist( ExpiryDate, Members, OtherInfo, Title, UrlImage, callback) {

        // const sharelists = this.afs.collection<Sharelists>(`users/${this.auth.getUserId()}/ShareList`);
        let message: any;
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
        UrlImage = (UrlImage) ? UrlImage : '';
        ExpiryDate = (ExpiryDate) ? ExpiryDate : '';
        Members = (Members) ? Members : '';
        OtherInfo = (OtherInfo) ? OtherInfo : '';
        Title = (Title) ? Title : '';
        const self = this;

        let imgarray = [];
        let data: Sharelists = {
            AdminId: this.auth.getUserId(),
            AdminName: this.auth.getUserName(),
            ExpiryDate: ExpiryDate,
            Members: Members,
            OpenDate: date_created,
            OtherInfo: OtherInfo,
            Title: Title,
            Url: imgarray[0]

        };
        this.imgup.handleSubmit(function (img) {

            if (img.length > 0) {
                for (let index = 0; index < img.length; index++) {
                    img[index].subscribe(thisimg => {
                        imgarray.push(thisimg);
                        if (imgarray.length === img.length) {
                            data.Url = imgarray[0];
                            self.afs.collection<Sharelists>(`users/${self.auth.getUserId()}/ShareList`).add(data).then((mess) => {

                                if (Members) {

                                    Members.forEach(element => {
                                        self.afs.collection(`users/${element.uid}/MemberShareList`).add({
                                            Accept: false,
                                            AdminId: self.auth.getUserId(),
                                            ShareListId: mess.id
                                        }).then(res => {}).catch(err => console.log(err));

                                        self.afs.collection(`users/${element.uid}/Notification`).add({
                                            DoubtId: '',
                                            IdFriend: self.auth.getUserId(),
                                            IdGift: mess.id,
                                            Read: false,
                                            Title: 'New Invited to the Share List',
                                            Type: 'ShareList',
                                            Date: date_created
                                        }).then(res => {}).catch(err => console.log(err));
                                    });
                                }
                                message = 'Listcreated';
                                callback(message);
                            }).catch((mess) => {
                                message = 'Failcreatelist';
                                callback(message);
                            });
                        }
                    });
                }
            } else {
                data.Url = '';
                self.afs.collection<Sharelists>(`users/${self.auth.getUserId()}/ShareList`).add(data).then(_mess => {
                    if (Members) {
                        Members.forEach(mess => {
                            self.afs.collection(`users/${mess.uid}/MemberShareList`).add({
                                Accept: false,
                                AdminId: self.auth.getUserId(),
                                ShareListId: _mess.id
                            });
                        });
                    }
                    message = 'Listcreated';
                    callback(message);
                }).catch((mess) => {
                    message = 'Failcreatelist';
                    callback(message);
                });
            }
        });
    }

}
