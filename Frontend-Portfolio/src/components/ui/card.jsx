export default function Card({ children, Description }) {
  return (
    <div class="card">
      <h2 className="card-title">{children}</h2>
      <p className="card-description">{Description}</p>
    </div>
  );
}
