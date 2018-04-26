import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';

/** components */
import { ComponentsComponent } from './components/components.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MylistComponent } from './components/mylist/mylist.component';
import { NewlistComponent } from './components/newlist/newlist.component';
import { FriendsComponent } from './components/friends/friends.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NotificationDetailsComponent } from './components/notification-details/notification-details.component';
import { TrendyComponent } from './components/trendy/trendy.component';
import { FriendBlockedGiftComponent } from './components/friend-blocked-gift/friend-blocked-gift.component';
import { SettingsContactComponent } from './components/settings-contact/settings-contact.component';
import { NewSharedListComponent } from './components/new-shared-list/new-shared-list.component';
import { MyShareListsComponent } from './components/my-share-lists/my-share-lists.component';
import { FriendRequestsComponent } from './components/friend-requests/friend-requests.component';
import { AddFriendComponent } from './components/add-friend/add-friend.component';
import { SignupComponent } from './components/signup/signup.component';
import { ListDetailsComponent } from './components/list-details/list-details.component';
import { ShareListDetailsComponent } from './components/share-list-details/share-list-details.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { TrendyDetailsComponent } from './components/trendy-details/trendy-details.component';
import { ViewListComponent } from './components/view-list/view-list.component';
import { ListsComponent } from './components/lists/lists.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [
    { path: '', component: ComponentsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'mylist', component: MylistComponent, canActivate: [AuthGuard] },
    { path: 'newlist', component: NewlistComponent, canActivate: [AuthGuard] },
    { path: 'friends', component: FriendsComponent, canActivate: [AuthGuard] },
    { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard],
        children: [
            { path: '', component: NotificationsComponent, canActivate: [AuthGuard]},
            { path: ':id', component: NotificationDetailsComponent, canActivate: [AuthGuard] }
        ] },
    { path: 'trendy', component: TrendyComponent, canActivate: [AuthGuard] },
    { path: 'friend-blocked-gifts', component: FriendBlockedGiftComponent, canActivate: [AuthGuard] },
    { path: 'settings-contact', component: SettingsContactComponent, canActivate: [AuthGuard] },
    { path: 'new-share-list', component: NewSharedListComponent, canActivate: [AuthGuard] },
    { path: 'my-share-list', component: MyShareListsComponent, canActivate: [AuthGuard] },
    { path: 'friend-requests', component: FriendRequestsComponent, canActivate: [AuthGuard] },
    { path: 'add-friend', component: AddFriendComponent, canActivate: [AuthGuard] },
    { path: 'newlist/:id/:adminid', component: NewlistComponent, canActivate: [AuthGuard] },
    { path: 'list-details/:id', component: ListDetailsComponent, canActivate: [AuthGuard] },
    { path: 'list-details/:adminid/:id/:sharelistid', component: ListDetailsComponent, canActivate: [AuthGuard] },

    { path: 'share-list-details/:id/:adminid', component: ShareListDetailsComponent, canActivate: [AuthGuard] },
    { path: 'user-details/:id', component: UserDetailsComponent, canActivate: [AuthGuard]},
    { path: 'user-details/:id/lists', component: ListsComponent, canActivate: [AuthGuard]},
    { path: 'trendy-details/:id', component: TrendyDetailsComponent, canActivate: [AuthGuard] },
    { path: 'view-list/:id/:uid', component: ViewListComponent, canActivate: [AuthGuard] },
    { path: 'signup', component: SignupComponent },
    { path: '404', component: NotfoundComponent },
    /* { path: '**', redirectTo: '/404' } */
];
@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, { useHash: false })
    ],
    exports: [
        RouterModule
    ],
})
export class AppRoutingModule { }

