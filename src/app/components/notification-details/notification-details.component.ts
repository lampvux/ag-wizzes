import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../core/services/notification.service';
import { ListsService } from '../../core/services/lists.service';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FriendSharedlistService } from '../../core/services/friend-sharedlist.service';
@Component({
    selector: 'app-notification-details',
    templateUrl: './notification-details.component.html',
    styleUrls: ['./notification-details.component.css']
})
export class NotificationDetailsComponent implements OnInit {
    @ViewChild('childModal') public childModal: NgbModal;
    @ViewChild('system') system: ElementRef;
    @ViewChild('doubt') doubt: ElementRef;
    @ViewChild('wizzes') wizzes: ElementRef;
    @ViewChild('survey') survey: ElementRef;
    @ViewChild('sharelist') sharelist: ElementRef;
    @ViewChild('newfriend') newfriend: ElementRef;
    @ViewChild('answerdoubts') answerdoubts: ElementRef;
    closeResult;
    private sub;
    uid;
    id;
    Date: any; IdFriend; IdGift; Read; Title; Type; DoubtId;
    identy_type;
    doubtQuestion;
    doubtsanswer;
    sharelistid;
    constructor(
        private auth: AuthService,
        private modalService: NgbModal,
        private notificationService: NotificationService,
        private Listservice: ListsService,
        private shareListService: FriendSharedlistService,
        private route: ActivatedRoute,
        private router: Router) {

         }

    answerDoubt() {
        if (this.IdFriend && this.IdGift ) {
            this.Listservice.answerDoubt(this.IdGift, this.DoubtId, this.doubtsanswer).then(res => {

            }).catch(err => {

            });
        }
    }
    sendSurveys() {

    }
    acceptShareList() {
        this.shareListService.acceptShareList(this.sharelistid, this.IdFriend);
    }
    denyShareList() {
        this.shareListService.denytShareList(this.sharelistid, this.IdFriend);
    }
    /** MODAL SECTION */
    show(id) {
        this.id = id;
        this.notificationService.getNoti(this.id).subscribe(noti => {
            this.Date = noti.Date;
            this.IdFriend = noti.IdFriend;
            this.IdGift = noti.IdGift;
            this.DoubtId = noti.DoubtId;
            this.Type = noti.Type;
            this.Title = noti.Title;

            if (this.IdFriend && this.IdGift && this.DoubtId ) {
                this.Listservice.viewDoubtid(this.IdGift, this.IdFriend, this.DoubtId).subscribe(doubts => {
                    this.doubtQuestion = doubts.Question;
                });
            }
            if (this.IdFriend && this.IdGift && this.Type === 'ShareList') {
                //this.shareListService.get
            }
            /** mark read */
            if (!noti.Read) {
                this.notificationService.markReadNotifi(this.id, function (res) {

                });
            }
            switch (this.Type) {
                case 'SystemNotification':
                    this.open(this.system, 'lg');
                    break;
                case 'GiftDoubt':
                    this.open(this.doubt, 'lg');
                    break;
                case 'WizzesNotification':
                    this.open(this.wizzes, 'lg');
                    break;
                case 'Surveys':
                    this.open(this.survey, 'lg');
                    break;
                case 'ShareList':
                    this.open(this.sharelist, 'lg');
                    break;
                case 'New Friend':
                    this.open(this.newfriend, 'lg');
                    break;
                case 'Answer Doubts':
                    this.open(this.answerdoubts, 'lg');
                    break;
                default:

                    break;
            }
        });

    }
    open(content, type) {
        if (type === 'sm') {
            this.modalService.open(content, { size: 'sm' }).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        } else if (type === 'lg') {
                this.modalService.open(content, { size: 'lg' }).result.then((result) => {
                    if (result === 'acceptsharelist') { this.acceptShareList(); }
                    if (result === 'answerdoubt') {  }
                    if (result === 'denysharelist') { this.denyShareList();  }

                }, (reason) => {
                    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                });
        } else {
            this.modalService.open(content).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        }
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
    ngOnInit() {

    }


}
