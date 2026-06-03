export default function Input({ placeholder, type }) {
    return (
        <input className="auth-input" type={type} placeholder={placeholder} />
    );
}
