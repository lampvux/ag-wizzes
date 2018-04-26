import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage } from 'angularfire2/storage';
@Injectable()
export class ImageUploadService {
  fileupload: any[];
  uid;
  constructor(private auth: AuthService, private storage: AngularFireStorage) {
      this.uid = auth.getUserId();
   }

  handleSubmit(callback) {
    var imageurl = [];

    if (this.fileupload && this.fileupload.length > 0) {
        this.fileupload.forEach((filestate, index, array) => {
                if (filestate.imagePreviewUrl !== './assets/img/image_placeholder.jpg') {
                    if (typeof(filestate.file) == 'object') {
                        let file = filestate.file;
                        let filePath = this.uid + Date.now() + Math.floor((Math.random() * 1000) + 1);
                        const ref = this.storage.ref(`${this.auth.getUserId()}/${filePath}`);
                        const task = ref.put(file);
                        imageurl.push(task.downloadURL());
                    } else {
                        imageurl.push(Observable.of(filestate.imagePreviewUrl));
                    }
                }

        });
    }
    callback(imageurl);
  }
}
