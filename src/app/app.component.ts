import { Component, OnInit } from '@angular/core';
import { ApiService, Item } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'pwatest';
  items: Item[] = [];
  notifications: Notification[] = [];

  constructor(private apiService: ApiService) {
  }

  static async checkNotificationPermission(): Promise<boolean> {
    switch (Notification.permission) {

      case 'default':
        const perm = await Notification.requestPermission();
        return perm === 'granted';

      case 'granted':
        return true;

      default:
        return false;
    }
  }

  ngOnInit() {
    this.registerClearNotificationWhenAppOpen();
    this.apiService.item$.subscribe(item => this.handleNewItem(item));
  }

  handleNewItem(item: Item): void {
    if (!item) { return; }
    this.items.push(item);
    this.sendNotification(item).then();
  }

  private async sendNotification(item: Item): Promise<void> {
    if (await AppComponent.checkNotificationPermission() && document.visibilityState !== 'visible') {
      this.notifications.push(new Notification(item.name, {
        body: item.description,
      }));
    }
  }

  private registerClearNotificationWhenAppOpen(): void {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        // The tab has become visible so clear the now-stale Notification.
        this.notifications.forEach(n => n.close());
      }
    });
  }

}
