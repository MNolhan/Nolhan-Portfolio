export default function CardStack({ children }) {
  return (
    <div className={`card-stack`}>
      <h3 className={`card-stack__title`}>{children}</h3>
    </div>
  )
}
