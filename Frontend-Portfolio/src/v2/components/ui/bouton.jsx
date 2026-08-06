export default function Bouton({
  as: Component = 'button',
  children,
  variant,
  ...props
}) {
  return (
    <Component className={`btn btn-${variant}`} {...props}>
      {children}
    </Component>
  )
}
