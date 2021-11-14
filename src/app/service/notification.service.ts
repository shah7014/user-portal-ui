import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notifierService: NotifierService) { }

  public showSuccess(msg: string): void {
    this.notifierService.notify('success', msg);
  }

  public showFailure(msg: string): void {
    this.notifierService.notify('error', msg);
  }
}
