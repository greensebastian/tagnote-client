import { Observable } from "rxjs";

export interface Notification {
  message: string;
}

export interface INotificationService {
  showNotification: (notification: Notification) => void;
  notifications: Observable<Notification>;
}
