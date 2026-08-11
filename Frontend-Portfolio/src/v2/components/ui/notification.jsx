export default function Notification({ title, message, show }) {
    return (
        <div className={`notification ${show ? "show" : ""}`}>
            <h2 className="notification__title">{title}</h2>
            <p className="notification__message">{message}</p>
        </div>
    );
}