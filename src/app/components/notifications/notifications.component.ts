import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NotificationService } from '../../core/services/notification.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotificationDetailsComponent } from '../notification-details/notification-details.component';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {
    @ViewChild('childModal') childModal: NotificationDetailsComponent;
    notificationsLatest;
    notificationRead;
    notificationType;
    closeResult;
    constructor(private notificationService: NotificationService, private modalService: NgbModal) {
         this.notificationService.getNotificationsTime('asc').subscribe(not => this.notificationsLatest = not);
         this.notificationService.getNotificationsRead('asc').subscribe(not => this.notificationRead = not );
         this.notificationService.getNotificationsCate('asc').subscribe(not => this.notificationType = not);
     }
    /** MODAL SECTION */
    
    ngOnInit() {


        

        const navbar = document.getElementsByTagName('nav')[0];
        navbar.children[0].classList.remove('navbar-transparent');
        if (navbar.classList.contains('nav-up')) {
        navbar.classList.remove('nav-up');
        navbar.classList.add('nav-down');
        }
    }
    ngOnDestroy() {

        const navbar = document.getElementsByTagName('nav')[0];

    }

}
