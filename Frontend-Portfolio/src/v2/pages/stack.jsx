import CardStack from '../components/ui/card_stack'
import { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL

export default function Stack() {
  const [Stack, setStack] = useState([])

  useEffect(() => {
    fetch(`${API_URL}/stacks`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => setStack(data))
      .catch(() => setStack([]))
  }, [])

  return (
    <div className="container--small" id="stack">
      <div className="stack">
        <div className="stack__header">
          <h1 className="stack__label">- Stack</h1>
          <p className="stack__title">
            {' '}
            Les technologies que je{' '}
            <span className="stack__title-accent">maîtrise</span>.
          </p>
        </div>

        <div className="stack__content">
          <div className="stack__group stack__group--front">
            <h2 className="stack__category">
              <span className="stack__category-accent">01</span>
              Front-End
            </h2>
            <hr></hr>
            <div className="stack__list">
              {Stack.filter(
                (s) => s.category.toLowerCase() === 'front-end'
              ).map((s) => (
                <CardStack key={s.id}>{s.name}</CardStack>
              ))}
            </div>
          </div>
          <div className="stack__group stack__group--back">
            <h2 className="stack__category">
              <span className="stack__category-accent">02</span>
              Back-End
            </h2>
            <hr></hr>
            <div className="stack__list">
              {Stack.filter((s) => s.category.toLowerCase() === 'back-end').map(
                (s) => (
                  <CardStack key={s.id}>{s.name}</CardStack>
                )
              )}
            </div>
          </div>
          <div className="stack__group stack__group--other">
            <h2 className="stack__category">
              <span className="stack__category-accent">03</span>
              Outils & Design
            </h2>
            <hr></hr>
            <div className="stack__list">
              {Stack.filter(
                (s) => s.category.toLowerCase() === 'outils & design'
              ).map((s) => (
                <CardStack key={s.id}>{s.name}</CardStack>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
