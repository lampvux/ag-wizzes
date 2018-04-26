import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { AgmCoreModule } from '@agm/core';

import { AngularFireStorage } from 'angularfire2/storage';
import { ProfileService } from './profile/profile.service';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MylistComponent } from './mylist/mylist.component';
import { NewlistComponent } from './newlist/newlist.component';
import { ProfileComponent } from './profile/profile.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { FriendsComponent } from './friends/friends.component';
import { FriendBlockedGiftComponent } from './friend-blocked-gift/friend-blocked-gift.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TrendyComponent } from './trendy/trendy.component';
import { SettingsContactComponent } from './settings-contact/settings-contact.component';
import { NewSharedListComponent } from './new-shared-list/new-shared-list.component';
import { MyShareListsComponent } from './my-share-lists/my-share-lists.component';
import { FriendRequestsComponent } from './friend-requests/friend-requests.component';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ListDetailsComponent } from './list-details/list-details.component';
import { ShareListDetailsComponent } from './share-list-details/share-list-details.component';
import { AddFriendPipe } from './add-friend/add-friend.pipe';
import { TrendyDetailsComponent } from './trendy-details/trendy-details.component';
import { NouisliderModule } from 'ng2-nouislider';

import { JWBootstrapSwitchModule } from 'jw-bootstrap-switch-ng2';
import { ViewListComponent } from './view-list/view-list.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ListsComponent } from './lists/lists.component';
import { NotificationDetailsComponent } from './notification-details/notification-details.component';

@NgModule({
  imports: [
    AngularMultiSelectModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    NouisliderModule,
    RouterModule,
    NgbModule,
    JWBootstrapSwitchModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyBxr_IlEZqDvGbK5yS9TCLyDk1lXLY4tvo',
      libraries: ['places']
    })
  ],
  declarations: [ComponentsComponent, LoginComponent,  MylistComponent,
     NewlistComponent, ProfileComponent, ImageUploadComponent, FriendsComponent, FriendBlockedGiftComponent,
      NotificationsComponent, TrendyComponent, SettingsContactComponent, NewSharedListComponent,
       SignupComponent,
       MyShareListsComponent,
       FriendRequestsComponent,
       AddFriendComponent,
       UserDetailsComponent,
       ListDetailsComponent,
       ShareListDetailsComponent,
       AddFriendPipe,
       TrendyDetailsComponent,
       ViewListComponent,
       NotfoundComponent,
       ListsComponent,
       NotificationDetailsComponent,
      ],
  exports: [ComponentsComponent],
  providers: [ ProfileService, AngularFireStorage ]
})
export class ComponentsModule { }
