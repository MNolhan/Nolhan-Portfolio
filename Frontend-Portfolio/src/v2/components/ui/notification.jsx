export default function Notification({
  titlep1,
  titlep2,
  titlep3,
  message,
  show,
}) {
  const closeNotification = () => {
    const notification = document.querySelector('.notification')
    notification.classList.remove('notification--show')
  }

  return (
    <div className={`notification ${show ? 'notification--show' : ''}`}>
      <div className="notification__header">
        <h2 className="notification__title">
          {titlep1}
          <span className="notification__title-accent">{titlep2}</span>
          {titlep3}
        </h2>
        <button className="notification__close" onClick={closeNotification}>
          X
        </button>
      </div>
      <p className="notification__message">{message}</p>
    </div>
  )
}
