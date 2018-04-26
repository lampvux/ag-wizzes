import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { NotifyService } from './notify.service';

import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

import { User } from '../models/user';

@Injectable()
export class AuthService {

    user: Observable<User | null>;
    uid:  any;
    name: any;
    email: any;
    url: any;
    error: string;
    message;
    constructor(private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router,
        public notify: NotifyService) {

        this.user = this.afAuth.authState
            .switchMap((user) => {
                if (user) {

                    this.afs.doc<User>(`users/${user.uid}`).valueChanges().subscribe(us => {
                        this.uid = us.Uid;
                        this.name = us.Name;
                        this.email = us.Email;
                        this.url = us.Url;
                    });
                    return this.afs.doc(`users/${user.uid}`).valueChanges();
                } else {
                    return Observable.of(null);
                }
            });
       
    }
    getUserId() {
        return this.uid;
    }
    getUserName() {
        return this.name;
    }
    getUseremail() {
        return this.email;
    }
    getUserUrl() {
        return this.url;
    }
    setSessionnew(val) {
        this.uid = val.uid;
        this.name = val.Name;
        this.email = val.Email;
        this.url = val.Url;
    }
    setSessionUser() {
        this.afAuth.authState
            .switchMap((user) => {
                if (user) {
                    this.uid =  user.uid;
                    return this.afs.doc(`users/${user.uid}`).valueChanges();
                } else {
                    return Observable.of(null);
                }
            }).subscribe(val => {
                this.name =  val.Name;
                this.email =  val.Email;
                this.url =  val.Url;
            });
    }

    ////// OAuth Methods /////
    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.oAuthLogin(provider);
    }


    facebookLogin() {
        const provider = new firebase.auth.FacebookAuthProvider();
        return this.oAuthLogin(provider);
    }

    twitterLogin() {
        const provider = new firebase.auth.TwitterAuthProvider();
        return this.oAuthLogin(provider);
    }

    private oAuthLogin(provider: firebase.auth.AuthProvider) {
        return this.afAuth.auth.signInWithPopup(provider)
            .then((credential) => {
                this.notify.update('Welcome to Wizzes!!!', 'success');
                if (!credential.additionalUserInfo.isNewUser) {
                    this.updateUserDataAfterlogin(credential.user);
                    this.setSessionUser();
                    this.afterSignIn();
                } else {

                    this.setSessionnew(credential.user);
                     this.setUserData(credential.user);
                    this.afterSignIn();
                }
            })
            .catch((error) => {
                this.error = error.message;
                this.handleError(error);
            });
    }

    //// Anonymous Auth ////
    loginWithEmail(email, password) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                this.notify.update('Welcome to Wizzes!!!', 'success');
                 this.updateUserDataAfterlogin(user); // if using firestore
                this.setSessionUser();
                this.afterSignIn();
            })
            .catch((error) => {
                this.error = error.message;
                this.handleError(error);
            });
    }

    //// Email/Password Auth ////
    emailSignUp(email: string, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((user) => {
                this.notify.update('Welcome to Wizzes!!!', 'success');
                return this.setUserData(user); //  firestore
            })
            .catch((error) => {
                this.error = error.message;
                 this.handleError(error);
            });
    }

    // Sends email allowing user to reset password
    resetPassword(email: string) {
        const fbAuth = firebase.auth();

        return fbAuth.sendPasswordResetEmail(email)
            .then(() => this.notify.update('Password update email sent', 'info'))
            .catch((error) => {
                this.error = error.message;
                this.handleError(error);
            });
    }

    signOut() {
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('url');
        this.afAuth.auth.signOut().then(() => {
            this.router.navigate(['/login']);
        });
    }
    private afterSignIn() {
        // Do after login stuff here, such router redirects, toast messages, etc.
        this.router.navigate(['/profile']);
    }
    // If error, console log and notify user
    private handleError(error: Error) {
        this.notify.update(error.message, 'error');
    }

    getUser(id) {
        return this.afs.doc<User>(`users/${id}`).valueChanges();
    }
    updateUserDataAfterlogin(user) {
        const userRef = this.afs.doc(`users/${user.uid}`);
        const data = {
            Uid: user.uid,
            Email: user.email,
            Name: (user.displayName !== null && user.displayName !== 'undefined' && user.displayName !== '')
                ? user.displayName : ''
        };
        this.notify.update('Profile Updated', 'success');
        return userRef.update(data);
    }
    // update user data to firestore after succesful update
     updateUserData(user) {
        const userRef =  this.afs.doc(`users/${user.uid}`);
        const data = {
            Uid: user.uid,
            Email: user.email,
            Name: ( user.displayName !== null && user.displayName !== 'undefined' && user.displayName !== '')
             ? user.displayName : '',
            Url: (user.photoURL !== null && user.photoURL !== 'undefined' && user.photoURL !== '') ? user.photoURL : '',
            Country: (user.country && user.country !== null && user.country !== 'undefined' && user.country !== '' ) ? user.country : '',
            Sex: (user.sex && user.sex !== null && user.sex !== 'undefined' && user.sex !== '' ) ? user.sex : '',
            Birth: (user.birth && user.birth !== null && user.birth !== 'undefined' && user.birth !== '' ) ? user.birth : '',
            Telephone: (user.telephone && user.telephone  !== null && user.telephone !== 'undefined' &&  user.telephone !== '' )
            ? user.telephone : ''
        };
        this.notify.update('Profile Updated', 'success');

        return userRef.update(data);
    }
    // update user data to firestore after succesful update
    setUserData(user) {

        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
        const data: User = {
            Uid: user.uid,
            Email: user.email,
            Name: (user.displayName !== null && user.displayName !== 'undefined' && user.displayName !== '')
                ? user.displayName : 'Wizzes UserName',
            Url: (user.photoURL !== null && user.photoURL !== 'undefined' && user.photoURL !== '') ? user.photoURL : '',
            Country: (user.country && user.country !== null && user.country !== 'undefined' && user.country !== '') ? user.country : '',
            Sex: (user.sex && user.sex !== null && user.sex !== 'undefined' && user.sex !== '') ? user.sex : '',
            Birth: (user.birth && user.birth !== null && user.birth !== 'undefined' && user.birth !== '') ? user.birth : '',
            Telephone: (user.telephone && user.telephone !== null && user.telephone !== 'undefined' && user.telephone !== '')
                ? user.telephone : '',
            // tslint:disable-next-line:max-line-length
            AllowFriendSeeLists: (user.AllowFriendSeeLists)  ? true : false ,
            Currency: (user.Currency)  ? user.Currency : '' ,
            Language: (user.Language)   ? user.Language : '' ,
            PushNotifications: (user.PushNotifications)  ? true : false
        };
        this.notify.update('Profile Updated', 'success');
        return userRef.set(data);
    }
}
