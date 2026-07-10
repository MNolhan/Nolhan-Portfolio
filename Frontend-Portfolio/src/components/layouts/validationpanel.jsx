import { useState } from 'react'
import Bouton from '../ui/button'

export default function ValidationPanel() {
  return (
    <dialog className="panel panel--popup" id="ValidationPanel">
      <h1 className="panel__title--validation">
        Voulez-vous vraiment vous déconnectez ?
      </h1>
      <div className="panel__content">
        <div className="panel__buttons--validation">
          <Bouton
            variant="secondary"
            onClick={() => {
              localStorage.removeItem('token')
              window.location.reload()
            }}
          >
            Oui
          </Bouton>
          <Bouton
            variant="primary"
            type="button"
            onClick={() => document.getElementById('ValidationPanel').close()}
          >
            Non
          </Bouton>
        </div>
      </div>
    </dialog>
  )
}
