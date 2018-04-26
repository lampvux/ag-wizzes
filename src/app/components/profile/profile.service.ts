import { Injectable } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user';
import { Observable } from 'rxjs/Observable';
import { ImageUploadService } from '../../core/services/image-upload.service';
@Injectable()
export class ProfileService {

    constructor(private auth: AuthService, private imguploadservice: ImageUploadService ) { }

    updateUserData(uid, email, photoUrl, displayName, country, sex, birth, telephone) {

        const self = this;
        this.imguploadservice.handleSubmit(function(img) {

            if (img.length > 0 ) {
                img[0].subscribe(thisimg => {
                    photoUrl = (thisimg) ? thisimg : ((photoUrl) ? photoUrl : '');
                    const data = {
                        uid: uid,
                        email: email,
                        displayName: displayName,
                        photoURL: photoUrl,
                        country: (country) ? country : '',
                        sex: (sex) ? sex : '',
                        birth: birth,
                        telephone: (telephone) ? telephone : ''
                    };

                    self.auth.updateUserData(data).then(res => {
                        self.auth.getUserId();
                    });
                });
            } else {
                const data = {
                    uid: uid,
                    email: email,
                    displayName: displayName,
                    photoURL: photoUrl,
                    country: (country) ? country : '',
                    sex: (sex) ? sex : '',
                    birth: birth,
                    telephone: (telephone) ? telephone : ''
                };

                self.auth.updateUserData(data).then(res => {
                    self.auth.getUserId();
                });
            }
        });
    }
}
