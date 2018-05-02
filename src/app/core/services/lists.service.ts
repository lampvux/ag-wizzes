import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';


import { Observable } from 'rxjs/Observable';
import { switchMap, mergeMap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { ImageUploadService } from './image-upload.service';
import { NotificationService} from './notification.service';

import { Doubts } from '../models/doubts';
import { User } from '../models/user';
import { Listitems } from '../models/lists';
import { Sharelists } from '../models/sharelists';
@Injectable()
export class ListsService {
    listCollection: AngularFirestoreCollection<Listitems>;
    list: Observable<Listitems[]>;
    listDoc: AngularFirestoreDocument<Listitems>;
    sharelistCollection: AngularFirestoreCollection<Sharelists>;
    uid: any;
    constructor(
        private auth: AuthService,
        private afs: AngularFirestore,
        private imgup: ImageUploadService,
        private notificationService: NotificationService,
        private router: Router,
        private http: HttpClient
        ) {
        // this.auth.getUserId() = this.auth.getUserId();
       
            /* 
            const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.auth.getUserId()}`);

            this.sharelistCollection = userRef.collection<Sharelists>('ShareList');
            this.list = this.afs.collection<Listitems>(`users/${this.auth.getUserId()}/MyList`).snapshotChanges().map(changes => {
                return changes.map(a => {
                    const data = a.payload.doc.data() as Listitems;
                    const id = a.payload.doc.id;
                    data.Price = parseFloat(data.Price);
                    return {id, ...data};
                });
            }); */
        }
    // Function to compare two objects by comparing their `unwrappedName` property.
    public sendMessagepost(id, title, message) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        const params = new HttpParams()
            .set('id', id)
            .set('title', title)
            .set('message', message);

        const options = {
            headers,
            params,
            withCredentials: false
        };
        this.http.post('https://us-central1-wizzes-95363.cloudfunctions.net/addMessage', null, options)
            .subscribe(response => console.log(response));
    }
    getListUserPrice(uid, sorttype) {
        return this.afs.collection<Listitems>(`users/${uid}/MyList`).snapshotChanges().map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as Listitems;
                const id = a.payload.doc.id;
                data.Price = parseFloat(data.Price);
                return { id, ...data };
            });
        }).map(item => item.sort(
            (a, b) => {
                if (a.Price < b.Price) { if (sorttype === 'asc') { return -1; } else { return 1; } }
                if (a.Price > b.Price) { if (sorttype === 'asc') { return 1; } else { return -1; } }
                return 0;
            }
        ));
    }
    getListUserTime(uids, sorttype) {

        return this.afs.collection<Listitems>(`users/${uids}/MyList`).snapshotChanges().map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as Listitems;
                const id = a.payload.doc.id;
                data.Price = parseFloat(data.Price);
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
    getListUserCategory(uid, sorttype) {
        return this.afs.collection<Listitems>(`users/${uid}/MyList`).snapshotChanges().map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as Listitems;
                const id = a.payload.doc.id;
                data.Price = parseFloat(data.Price);
                return { id, ...data };
            });
        }).map(item => item.sort(
            (a, b) => {
                if (a.Category < b.Category) { if (sorttype === 'asc') { return -1; } else { return 1; } }
                if (a.Category > b.Category) { if (sorttype === 'asc') { return 1; } else { return -1; } }
                return 0;
            }
        ));
    }
    getListsbyPrice(sorttype) {
        return this.afs.collection<Listitems>(`users/${this.auth.getUserId()}/MyList`).snapshotChanges().map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as Listitems;
                const id = a.payload.doc.id;
                data.Price = parseFloat(data.Price);
                return { id, ...data };
            });
        }).map( item => item.sort(
            (a, b) => {
                if (a.Price < b.Price) { if (sorttype === 'asc') { return -1; } else { return 1; } }
                if (a.Price > b.Price) { if (sorttype === 'asc') { return 1; } else { return -1; } }
                return 0;
            }
        ));
    }
    getListsbyTime(sorttype) {
        return this.afs.collection<Listitems>(`users/${this.auth.getUserId()}/MyList`).snapshotChanges().map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as Listitems;
                const id = a.payload.doc.id;
                data.Price = parseFloat(data.Price);

                return { id, ...data };
            });
        }).map(item => item.sort(
            (a, b) => {
            if (a.OpenDate < b.OpenDate) { if (sorttype === 'asc') { return -1; } else { return 1; } }
            if (a.OpenDate > b.OpenDate) { if (sorttype === 'asc') { return 1; } else { return -1; } }
            return 0;
        }));
    }
    getListbyCategory(sorttype) {
        return this.afs.collection<Listitems>(`users/${this.auth.getUserId()}/MyList`).snapshotChanges().map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as Listitems;
                const id = a.payload.doc.id;
                data.Price = parseFloat(data.Price);
                return { id, ...data };
            });
        }).map(item => item.sort(
            (a, b) => {
                if (a.Category < b.Category) { if (sorttype === 'asc') { return -1; } else { return 1; } }
                if (a.Category > b.Category) { if (sorttype === 'asc') { return 1; } else { return -1; } }
                return 0;
            }
        ));
    }
    addlist(list: Listitems) {
        this.afs.collection<Listitems>(`users/${this.auth.getUserId()}/MyList`).add(list);
    }

    viewList(listId) {
        return this.afs.collection<Listitems>(`users/${this.auth.getUserId()}/MyList`).doc<Listitems>(`${listId}`).valueChanges();
    }
    viewSharedList(adminid, listid, sharelistid) {
        return this.afs.doc<Listitems>(`users/${adminid}/ShareList/${sharelistid}/MyList/${listid}`).valueChanges();
    }
    viewOutsideList(listId, uid) {
        return this.afs.doc<Listitems>(`users/${uid}/MyList/${listId}`).valueChanges();
    }
    /** DOUBTS SECTION */
    viewDoubts(listId, uid, callback) {
        return this.afs.collection<Doubts>(`users/${uid}/MyList/${listId}/Doubts`).snapshotChanges().map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return {id, data};
            });
        }).subscribe(allval => {
            const st = [];

            allval.forEach(element => {
                const id = element.id;
                const data = element.data;
                this.afs.doc<User>(`users/${element.data.IdSend}`).valueChanges().subscribe(sender => {
                    let dat =  Object.assign({ id, data }, sender);
                    st.push(dat);
                });
            });
            callback(st);

        });
    }
    viewDoubtsinShareList(listId, mylistid, uid, callback) {
        return this.afs.collection<Doubts>(`users/${uid}/ShareList/${listId}/MyList/${mylistid}/Doubts`).snapshotChanges().map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, data };
            });
        }).subscribe(allval => {
            const st = [];

            allval.forEach(element => {
                const id = element.id;
                const data = element.data;
                this.afs.doc<User>(`users/${element.data.IdSend}`).valueChanges().subscribe(sender => {
                    let dat = Object.assign({ id, data }, sender);
                    st.push(dat);
                });
            });
            callback(st);

        });
    }
    viewDoubtid(listId, uid, doubtId) {
        return this.afs.doc<Doubts>(`users/${uid}/MyList/${listId}/Doubts/${doubtId}`).valueChanges();
    }
    deleteDoubt(listId, uid, doubtId) {
        return this.afs.doc<Doubts>(`users/${uid}/MyList/${listId}/Doubts/${doubtId}`).delete();
    }
    sendDoubts(listId, uid, message, callback ) {
        const doubtsRef = this.afs.collection(`users/${uid}/MyList/${listId}/Doubts`);
        const date_created = this.getDateCreated();

        const dat = {
            Date: date_created,
            IdSend: this.auth.getUserId(),
            Question: message,
            Request: ''
        };

        doubtsRef.add(dat).then(ref => {
            this.notificationService.createNotifi('GiftDoubt', uid, {
                DoubtId: ref.id,
                IdFriend: this.auth.getUserId(),
                IdGift: listId,
                Read: false,
                Title: message
            });
            this.sendMessagepost(uid, 'New Doubt in your gift', 'An User sent you a doubt on your Gift');
            /* this.http.getHttpReq( {
                id: uid,
                title: 'New Doubt in your gift',
                message: 'An User sent you a doubt on your Gift'
            }); */
            callback('Doubtcreated');
        }).catch(err => {
            callback('Doubterror');
        });
    }
    answerDoubt(listId, doubtId,  message) {
        return this.afs.doc<Doubts>(`users/${this.auth.getUserId()}/MyList/${listId}/Doubts/${doubtId}`).update({ Request: message});
    }
    answerDoubtshareList(sharelistId, listId, doubtId, adminId, message) {
        // tslint:disable-next-line:max-line-length
        return this.afs.doc<Doubts>(`users/${adminId}/ShareList/${sharelistId}/MyList/${listId}/Doubts/${doubtId}`).update({ Request: message });
    }
    /** */
    blockGift(listId, friend_uid , timeblock, callback) {
        const datecreated = new Date();
        // datecreated.setHours(datecreated.getHours() - timeblock);
        let dd: any = datecreated.getDate();
        let mm: any = datecreated.getMonth() + 1; // January is 0!
        const yyyy: any = datecreated.getFullYear();
        const h: any = datecreated.getHours();
        const m: any = datecreated.getMinutes();
        const s: any = datecreated.getSeconds();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        const createdate =  yyyy + '-' + mm + '-' + dd + ' ' + h + ':' + m + ':' + s;

        const giftRef = this.afs.doc(`users/${friend_uid}/MyList/${listId}`);
        // tslint:disable-next-line:max-line-length
        giftRef.update({ IdUserBlock: this.auth.getUserId(), OpenTimeBlock: createdate, ExpiryTimeBlock: timeblock + ':00:00' }).then(ref => {
            this.afs.collection(`users/${this.auth.getUserId()}/Block_GIFT`).add({ IdGift: listId, IdUser: friend_uid})
            callback('Blockedgift');
        }).catch(err => {
            callback('Failblockedgift');
        });
    }
    unblockGift(listId, uid, callback) {
        const giftRef = this.afs.doc(`users/${uid}/MyList/${listId}`);
        // tslint:disable-next-line:max-line-length
        this.afs.collection(`users/${this.auth.getUserId()}/Block_GIFT`, ref => ref.where('IdGift', '==', listId)).snapshotChanges().map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, data };
            });
        }).subscribe(onlygift => {
            if (onlygift) {
                this.afs.doc(`users/${this.auth.getUserId()}/Block_GIFT/${onlygift[0].id}`).delete().then(aa => {
                    giftRef.update({ IdUserBlock: '', OpenTimeBlock: '', ExpiryTimeBlock: '' }).then(ref => {
                        callback('Unblocked');
                    }).catch(err => {
                        callback('Failunblockedgift');
                    });
                }).catch(ee => {
                });
            }
        });
    }
    deletelist(id, adminid, sharelistid) {
        if (!(adminid && sharelistid)) {
            this.afs.collection<Listitems>(`users/${this.auth.getUserId()}/MyList`).doc<Listitems>(`${id}`).delete().then(function () {
                 return 'Deletelist';
             }).catch(function (error) {
                return 'Faildeletelist';
             });
        } else {
            this.afs.doc<Listitems>(`users/${adminid}/ShareList/${sharelistid}/MyList/${id}`).delete().then(function () {
                return 'Deletelist';
            }).catch(function (error) {
                return 'Faildeletelist';
            });
        }
    }
    /** Update list */
    updateList(imagesUrl, docid, IdUserBlock, TimeBlock, date_created, title, price, category,
        description, website, address, lat, long, others, expiry, sharelistid, adminid) {
        const self = this;
        /* if (imagesUrl.length > 0) {
            self.updateDatawithImage(docid, IdUserBlock, TimeBlock, imagesUrl, title, price,
                category, date_created, description, website,
                address, lat, long, others, expiry);
        }  else { */
            var imgarray = [];
            this.imgup.handleSubmit(function (img) {

                if (img.length > 0) {
                    for (let index = 0; index < img.length; index++) {
                        img[index].subscribe(thisimg => {
                            imgarray.push(thisimg);
                            if (imgarray.length === img.length) {
                                if (sharelistid && adminid) {
                                    self.updateDatawithImageShareList(docid, IdUserBlock, TimeBlock, imgarray, title, price,
                                        category, date_created, description, website,
                                        address, lat, long, others, expiry, sharelistid, adminid);
                                } else {
                                    self.updateDatawithImage(docid, IdUserBlock, TimeBlock, imgarray, title, price,
                                        category, date_created, description, website,
                                        address, lat, long, others, expiry);

                                }
                                return true;
                            }
                        });
                    }
                } else {
                    self.updateDatawithImage(docid, IdUserBlock, TimeBlock, imgarray, title, price,
                        category, date_created, description, website,
                        address, lat, long, others, expiry);
                }
            });
        // }

        return true;
    }
    /** Push new list */
    pushList(title, price, category, description, website, address, lat, long, others, expiry, sharelistid, adminsharelistid) {
        const self = this;
        var imgarray = [];
        this.imgup.handleSubmit(function (img) {

            if (img.length > 0) {
                for (let index = 0; index < img.length; index++) {
                    img[index].subscribe(thisimg => {
                        imgarray.push(thisimg);
                        if (imgarray.length === img.length) {
                            if (!(sharelistid && adminsharelistid)) {

                                self.pushDatawithImage(imgarray, title, price, category, description, website,
                                     address, lat, long, others, expiry);
                            } else {
                                self.pushDataSharelistwithImage(imgarray, title, price, category, description, website,
                                    address, lat, long, others, expiry, sharelistid, adminsharelistid);
                            }
                           // return true;
                        }
                    });
                }
            } else {
                if (!(sharelistid && adminsharelistid)) {
                    self.pushDatawithImage(imgarray, title, price, category, description, website,
                        address, lat, long, others, expiry);
                } else {
                    self.pushDataSharelistwithImage(imgarray, title, price, category, description, website,
                        address, lat, long, others, expiry, sharelistid, adminsharelistid);
                }
            }
        });
        return 'Success';
    }
    /**
     *  Update list with data
     * @param docid : id of list
     * @param IdUserBlock id of user blocked list
     * @param TimeBlock  time of the blocked list
     * @param image images of list
     * @param title title of list
     * @param price price of list
     * @param category category of list
     * @param date_created date created of list
     * @param description description of list
     * @param website website of list
     * @param address address where to buy list
     * @param lat lat of list
     * @param long lng of list
     * @param others other informations of list
     * @param expiry expiry date of list
     */
    updateDatawithImage(docid, IdUserBlock, TimeBlock, image, title, price, category, date_created,
         description, website, address, lat, long, others, expiry) {
        const photoUrl = (image) ? image : '';
        price = (price !== null && price !== 'undefined' && price !== '') ? price : '';
        category = (category !== null && category !== 'undefined' && category !== '') ? category : '';
        description = (description !== null && description !== 'undefined' && description !== '') ? description : '';
        website = (website !== null && website !== 'undefined' && website !== '') ? website : '';
        address = (address !== null && address !== 'undefined' && address !== '') ? address : '';
        others = (others !== null && others !== 'undefined' && others !== '') ? others : '';
        const data = {
            Title: title,
            Url: photoUrl,
            Price: price,
            Category: category,
            Description: description,
            Websites: website,
            ShopAddress: address,
            LatLon: 'lat/lng:(' + lat + ',' + long + ')',
            OtherInformation: others,
            OpenDate: date_created,
            ExpiryDate: expiry,
            IdUserBlock: IdUserBlock,
            TimeBlock: TimeBlock
        };

        this.listDoc = this.afs.collection<Listitems>(`users/${this.auth.getUserId()}/MyList`).doc<Listitems>(`${docid}`);
        this.listDoc.update(data);
        this.router.navigate(['/mylist']);
    }
    updateDatawithImageShareList(docid, IdUserBlock, TimeBlock, image, title, price, category, date_created,
        description, website, address, lat, long, others, expiry, sharelistid, adminid) {
        const photoUrl = (image) ? image : '';
        price = (price !== null && price !== 'undefined' && price !== '') ? price : '';
        category = (category !== null && category !== 'undefined' && category !== '') ? category : '';
        description = (description !== null && description !== 'undefined' && description !== '') ? description : '';
        website = (website !== null && website !== 'undefined' && website !== '') ? website : '';
        address = (address !== null && address !== 'undefined' && address !== '') ? address : '';
        others = (others !== null && others !== 'undefined' && others !== '') ? others : '';
        const data = {
            Title: title,
            Url: photoUrl,
            Price: price,
            Category: category,
            Description: description,
            Websites: website,
            ShopAddress: address,
            LatLon: 'lat/lng:(' + lat + ',' + long + ')',
            OtherInformation: others,
            OpenDate: date_created,
            ExpiryDate: expiry,
            IdUserBlock: IdUserBlock,
            TimeBlock: TimeBlock
        };

        this.listDoc = this.afs.doc<Listitems>(`users/${adminid}/ShareList/${sharelistid}`);
        this.listDoc.update(data);
        this.router.navigate(['/mylist']);
    }
    // tslint:disable-next-line:max-line-length
    pushDataSharelistwithImage(image, title, price, category, description, website, address, lat, long, others, expiry, sharelistid, adminsharelistid) {
        const date_created = this.getDateCreated();
        const photoUrl = (image) ? image : '';
        price = (price) ? price : '';
        category = (category) ? category : '';
        description = (description) ? description : '';
        website = (website) ? website : '';
        address = (address) ? address : '';
        others = (others) ? others : '';
        const data: Listitems = {
            Title: title,
            Url: photoUrl,
            Price: price,
            Category: category,
            Description: description,
            Websites: website,
            ShopAddress: address,
            LatLon: 'lat/lng:(' + lat + ',' + long + ')',
            OtherInformation: others,
            OpenDate: date_created,
            ExpiryDate: expiry,
            IdUserBlock: '',
            ExpiryTimeBlock: '',
            OpenTimeBlock: ''
        };

        this.afs.doc(`users/${adminsharelistid}/ShareList/${sharelistid}`).collection<Listitems>('MyList').add(data).then (res => {

        }).catch( err => console.log(err));
        this.router.navigate(['/share-list-details', sharelistid, adminsharelistid]);
    }
    /**
     *  upload new list with image
     * @param image images of list
     * @param title title of list
     * @param price price of list
     * @param category category of list
     * @param date_created date created of list
     * @param description description of list
     * @param website website of list
     * @param address address where to buy list
     * @param lat lat of list
     * @param long lng of list
     * @param others other informations of list
     * @param expiry expiry date of list
     */
    pushDatawithImage(image, title, price, category, description, website, address, lat, long, others, expiry) {
        const date_created = this.getDateCreated();
        const photoUrl = (image) ? image : '';
        price =  (price) ? price : '';
        category =  (category) ? category : '';
        description = (description) ? description : '';
        website = (website) ? website : '';
        address =  (address) ? address : '';
        others = (others) ? others : '';
        const data: Listitems = {
            Title: title,
            Url: photoUrl,
            Price: price,
            Category: category,
            Description: description,
            Websites: website,
            ShopAddress: address,
            LatLon: 'lat/lng:(' + lat + ',' + long + ')',
            OtherInformation: others,
            OpenDate: date_created,
            ExpiryDate: expiry,
            IdUserBlock: '',
            ExpiryTimeBlock: '',
            OpenTimeBlock: ''
        };

        this.afs.collection<Listitems>(`users/${this.auth.getUserId()}/MyList`).add(data);
        this.router.navigate(['/mylist']);
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
