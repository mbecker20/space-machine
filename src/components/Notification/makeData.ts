export interface NotificationData {
  isOpen: boolean
  color: string
  text: string
}

export function makeNotificationData(isOpen: boolean, color: string, text: string) {
  return {
    isOpen,
    color,
    text,
  }
}