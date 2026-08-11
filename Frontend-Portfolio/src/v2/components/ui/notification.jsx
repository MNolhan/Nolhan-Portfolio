export default function Notification({ titlep1, titlep2, titlep3, message, show }) {

    const closeNotification = () => {
        const notification = document.querySelector(".notification");
        notification.classList.remove("show");
    }

    return (
        <div className={`notification ${show ? "show" : ""}`}>
            <div className="notification__header">
                <h2 className="notification__header-title">{titlep1}<span className="notification__header-title--red">{titlep2}</span>{titlep3}</h2>
                <button className="notification__header-close" onClick={closeNotification}>X</button>
            </div>
            <p className="notification__message">{message}</p>
        </div>
    );
}