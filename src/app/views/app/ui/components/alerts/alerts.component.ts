import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html'
})
export class AlertsComponent implements OnInit, AfterViewInit {

  constructor(private notifications: NotificationsService, private translate: TranslateService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.notifications.success(
      this.translate.instant('alert.success-alert'),
      this.translate.instant('alert.success-alert-text'),
      {
        timeOut: 30000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
      }
    );
  }

  onPrimary() {
    this.notifications.create(this.translate.instant('alert.primary'), this.translate.instant('alert.notification-content'), NotificationType.Bare, { theClass: 'primary', timeOut: 3000, showProgressBar: true });
  }

  onSecondary() {
    this.notifications.create(this.translate.instant('alert.secondary'), this.translate.instant('alert.notification-content'), NotificationType.Bare, { theClass: 'secondary', timeOut: 3000, showProgressBar: true });
  }

  onInfo() {
    this.notifications.create(this.translate.instant('alert.info'), this.translate.instant('alert.notification-content'), NotificationType.Info, { timeOut: 3000, showProgressBar: true });
  }

  onWarning() {
    this.notifications.create(this.translate.instant('alert.warning'), this.translate.instant('alert.notification-content'), NotificationType.Warn, { timeOut: 3000, showProgressBar: true });
  }

  onError() {
    this.notifications.create(this.translate.instant('alert.error'), this.translate.instant('alert.notification-content'), NotificationType.Error, { timeOut: 3000, showProgressBar: true });
  }

  onSuccess() {
    this.notifications.create(this.translate.instant('alert.success'), this.translate.instant('alert.notification-content'), NotificationType.Success, { timeOut: 3000, showProgressBar: true });
  }


  onPrimaryOutline() {
    this.notifications.create(this.translate.instant('alert.primary'), this.translate.instant('alert.notification-content'), NotificationType.Bare, { theClass: 'outline primary', timeOut: 3000, showProgressBar: false });
  }

  onSecondaryOutline() {
    this.notifications.create(this.translate.instant('alert.secondary'), this.translate.instant('alert.notification-content'), NotificationType.Bare, { theClass: 'outline secondary', timeOut: 3000, showProgressBar: false });
  }

  onInfoOutline() {
    this.notifications.create(this.translate.instant('alert.info'), this.translate.instant('alert.notification-content'), NotificationType.Info, { theClass: 'outline', timeOut: 3000, showProgressBar: false });
  }

  onWarningOutline() {
    this.notifications.create(this.translate.instant('alert.warning'), this.translate.instant('alert.notification-content'), NotificationType.Warn, { theClass: 'outline', timeOut: 3000, showProgressBar: false });
  }

  onErrorOutline() {
    this.notifications.create(this.translate.instant('alert.error'), this.translate.instant('alert.notification-content'), NotificationType.Error, { theClass: 'outline', timeOut: 3000, showProgressBar: false });
  }

  onSuccessOutline() {
    this.notifications.create(this.translate.instant('alert.success'), this.translate.instant('alert.notification-content'), NotificationType.Success, { theClass: 'outline', timeOut: 3000, showProgressBar: false });
  }
}
