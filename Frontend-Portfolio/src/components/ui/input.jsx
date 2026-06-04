export default function Input({ placeholder, type, ...props}) {
    return (
        <input className="auth-input" type={type} placeholder={placeholder} {...props} />
    );
}
