import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { switchMap, mergeMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class CategoryService {
    uid: any;
    category: any;
    something: any;
    constructor(
        private auth: AuthService,
        private afs: AngularFirestore) {

        this.uid = auth.getUserId();

            const categoryRef = this.afs.collection(`category`);
            this.category = categoryRef.snapshotChanges().map(changes => {
                return changes.map(a => {
                    const data = a.payload.doc.data() ;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                });
            });

        }
    getCategory() {
        return this.category;
    }
    updateCategory(item) {
        const categoryRef = this.afs.doc(`category/${this.category.id}`);
        categoryRef.update(item);
    }
    deleteCategory(item) {
        const categoryRef = this.afs.doc(`category/${this.category.id}`);
        categoryRef.update(item);
    }
}
