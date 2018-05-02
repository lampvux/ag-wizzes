import { NgModule } from '@angular/core';

import { AuthService } from './services/auth.service';


import { FriendSharedlistService } from './services/friend-sharedlist.service';
import { FriendsService } from './services/friends.service';
import { ListsService } from './services/lists.service';
import { NotificationService } from './services/notification.service';
import { SettingContactService } from './services/setting-contact.service';
import { TrendyService } from './services/trendy.service';
import { ImageUploadService } from './services/image-upload.service';
import { CategoryService } from './services/category.service';
import { FriendBlockedGiftService } from './services/friend-blocked-gift.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [AuthService,  FriendSharedlistService, FriendsService, ListsService, NotificationService,
    SettingContactService, TrendyService, ImageUploadService, CategoryService, FriendBlockedGiftService],
})
export class CoreModule { }
