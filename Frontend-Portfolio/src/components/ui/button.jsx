export default function Btn({ children, variant }) {
    return (
        <button class={`btn btn-${variant}`}>{children}</button>
    );
}   