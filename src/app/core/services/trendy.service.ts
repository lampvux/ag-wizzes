import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { switchMap, mergeMap } from 'rxjs/operators';

import { AuthService } from './auth.service';
@Injectable()
export class TrendyService {
    trendy: any;
    trendyByBrand: any;
    trendyByCountry: any;
    TrendyRef;
    constructor(private afs: AngularFirestore) {
        this.TrendyRef = this.afs.collection(`trendy`);
     }
    gettrendyByTime(sorttype) {
        return this.TrendyRef.snapshotChanges().map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data();
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
    gettrendyByBrand(sorttype) {
        return this.TrendyRef.snapshotChanges().map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data();
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
    gettrendyByCountry(sorttype) {
        return this.TrendyRef.snapshotChanges().map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
            });
        }).map(item => item.sort(
            (a, b) => {
                if (a.Country < b.Country) { if (sorttype === 'asc') { return -1; } else { return 1; } }
                if (a.Country > b.Country) { if (sorttype === 'asc') { return 1; } else { return -1; } }
                return 0;
            }
        ));
    }

    viewTrendy(id) {
        return this.afs.doc(`trendy/${id}`).valueChanges();
    }
}
