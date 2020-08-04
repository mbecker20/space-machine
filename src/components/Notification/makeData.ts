export interface NotificationData {
  isOpen: boolean
  color: string
  text: string
}

export function makeNotificationData(isOpen: boolean, color = '', text = ''): NotificationData {
  return {
    isOpen,
    color,
    text,
  }
}