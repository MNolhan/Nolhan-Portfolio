import React from 'react'
import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL

export default function Carroursel() {
  // -- Nombre de Refresh Total

  const [reload, setReload] = useState(null)

  useEffect(() => {
    fetch(`${API_URL}/reload`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => setReload(data.count))
      .catch(() => setReload('ERROR'))
  }, [])

  // -- Nombre de Jours en Ligne

  const startDate = new Date('2026-07-10')
  const today = new Date()

  let nbjour = Math.floor((today - startDate) / (1000 * 60 * 60 * 24))

  let message

  if (nbjour > 1) {
    message = 'Jours'
  } else {
    message = 'Jour'
  }

  return (
    <div className="carrousel">
      <div className="carrousel__group">
        <div className="carrousel__card image">
          Nombre de refresh total du site : {reload}
        </div>
        <p className="carrousel__separator">•</p>
        <div className="carrousel__card">
          Portfolio en ligne depuis {nbjour} {message}
        </div>
        <p className="carrousel__separator">•</p>
        <div className="carrousel__card">Basé à Tours, France</div>
        <p className="carrousel__separator">•</p>
        <div className="carrousel__card">Code depuis 2023</div>
        <p className="carrousel__separator">•</p>
        <div className="carrousel__card">Du besoin métier au déploiement</div>
        <p className="carrousel__separator">•</p>
      </div>
      <div aria-hidden className="carrousel__group">
        <div className="carrousel__card image">
          Nombre de refresh total du site : {reload}
        </div>
        <p className="carrousel__separator">•</p>
        <div className="carrousel__card">
          Portfolio en ligne depuis {nbjour} {message}
        </div>
        <p className="carrousel__separator">•</p>
        <div className="carrousel__card">Basé à Tours, France</div>
        <p className="carrousel__separator">•</p>
        <div className="carrousel__card">Code depuis 2023</div>
        <p className="carrousel__separator">•</p>
        <div className="carrousel__card">Du besoin métier au déploiement</div>
        <p className="carrousel__separator">•</p>
      </div>
    </div>
  )
}
