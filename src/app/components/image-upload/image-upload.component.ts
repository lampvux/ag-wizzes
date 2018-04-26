import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ImageUploadService } from '../../core/services/image-upload.service';
import { ActivatedRoute } from '@angular/router';
import { ListsService } from '../../core/services/lists.service';
@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html'
})
export class ImageUploadComponent implements OnInit {
    @Input() isRound:  false;
    @Input() image: string;
    @Input() multiple: false;
    error: string;
    state: any = [{}];
    private sub: any;
    adminid;
    sharelistid;
    id;
    uploadPercent: Observable<number>;
    downloadURL: Observable<string>;

    constructor(private auth: AuthService, private Listservice: ListsService, public imgservice: ImageUploadService,
        private route: ActivatedRoute) {
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }
    getUsers() {
        return this.auth.user
        .map(
            (users) => {
                this.image = users.Url;
            });
    }

    ngOnInit() {
        const self = this;
        if (this.route.params.subscribe(params => {
            this.id = params.id;
            this.sharelistid = params.sharelistid;
            this.adminid = params.adminid;
            
            if (this.id) {
                if (!(this.adminid && this.sharelistid)) {
                    self.state = [{}];
                    this.Listservice.viewList(params.id).subscribe(list => {
                        if (list) {
                            const Imageurl = list.Url;
                            for (let index = 0; index < Imageurl.length; index++) {
                                const element = Imageurl[index];
                                self.state[index] = { 'file': element, 'imagePreviewUrl': element };
                            }
                        } else {
                            this.state = [{
                                file: null,
                                imagePreviewUrl: (this.image) ? this.image :
                                    (this.isRound ? './assets/img/placeholder.jpg' : './assets/img/image_placeholder.jpg')
                            }];
                        }
                    });
                } else {
                    self.state = [{}];
                    this.Listservice.viewSharedList(this.adminid, this.id, this.sharelistid).subscribe(list => {
                        if (list) {
                            const Imageurl = list.Url;
                            for (let index = 0; index < Imageurl.length; index++) {
                                const element = Imageurl[index];
                                self.state[index] = { 'file': element, 'imagePreviewUrl': element };
                            }
                        } else {
                            this.state = [{
                                file: null,
                                imagePreviewUrl: (this.image) ? this.image :
                                    (this.isRound ? './assets/img/placeholder.jpg' : './assets/img/image_placeholder.jpg')
                            }];
                        }
                    });
                }
            } else {
                this.getUsers().subscribe(_ => {
                    this.state = [{
                        file: null,
                        imagePreviewUrl: (this.image) ? this.image :
                            (this.isRound ? './assets/img/placeholder.jpg' : './assets/img/image_placeholder.jpg')
                    }];
                });
            }
        })) {
        }
    }
    handleImageChange(e) {
        e.preventDefault();
        let files = null;
        const self = this;
        if (this.multiple) {
            files = e.target.files;
            if (files.length > 5) {
                this.error = 'You can only add  5 images maximum.';
            } else {
                this.error = '';

                for (let index = 0; index < files.length; index++) {
                    const element = files[index];
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        self.state[index] = { 'file': files[index], 'imagePreviewUrl': reader.result };

                        // this.state.imagePreviewUrl1 = reader.result;
                    };
                    reader.readAsDataURL(element);
                }
            }
        } else {
            const reader = new FileReader();
            files = e.target.files[0];
            reader.onloadend = () => {
                this.state[0].file = files;
                this.state[0].imagePreviewUrl = reader.result;
                // this.state.imagePreviewUrl1 = reader.result;
            };
            reader.readAsDataURL(files);
        }

        this.imgservice.fileupload = this.state;

    }


    handleClick() {
        const input = document.createElement('input');
        input.id = 'lam_imageupload';
        input.type = 'file';
        if (this.multiple) {
            input.multiple = true;
        } else {
            input.multiple = false;
        }
        input.onchange = this.handleImageChange;
        input.click();

    }
    handleRemove(pos: number) {
        if (pos !== 0) {
            this.state.splice(pos, 1);
        } else {
            this.state[pos].file = null;
            this.state[pos].imagePreviewUrl = this.image !== undefined ? this.image
            : (this.isRound ? './assets/img/placeholder.jpg' : './assets/img/image_placeholder.jpg');
        }
        this.imgservice.fileupload = this.state;

    }
}
