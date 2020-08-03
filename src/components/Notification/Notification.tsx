import React, { Fragment } from 'react'
import { NotificationData } from './makeData'

const notificationTime = 3000 //milliseconds

function Notification({ isOpen, color, text }: NotificationData) {
  return (
    <Fragment>
      {
        !isOpen ? null :
        <div style={{ backgroundColor: color }}>
          {text}
        </div>
      }
    </Fragment>
  )
}

export default Notification