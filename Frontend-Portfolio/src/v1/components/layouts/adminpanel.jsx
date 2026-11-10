import { useState } from 'react'
import Bouton from '../ui/button'
import AddProject from './project/addproject'
import UpdateProject from './project/updateproject'
import DeleteProject from './project/deleteproject'

export default function AdminPanel() {
  return (
    <>
      <dialog className="panel panel--popup" id="AdminPanel">
        <h1 className="panel__title">Admin Panel</h1>
        <div className="panel__content">
          <div className="panel__buttons">
            <Bouton
              variant="secondary"
              onClick={() => {
                document.getElementById('AddProject').showModal()
                document.getElementById('AdminPanel').close()
              }}
            >
              Ajout un Projet
            </Bouton>

            <Bouton
              variant="secondary"
              onClick={() => {
                document.getElementById('UpdateProject').showModal()
                document.getElementById('AdminPanel').close()
              }}
            >
              Modifier un Projet
            </Bouton>

            <Bouton
              variant="secondary"
              onClick={() => {
                document.getElementById('DeleteProject').showModal()
                document.getElementById('AdminPanel').close()
              }}
            >
              Supprimer un Projet
            </Bouton>
          </div>
          <Bouton
            variant="primary"
            type="button"
            onClick={() => document.getElementById('AdminPanel').close()}
          >
            Fermer
          </Bouton>
        </div>
      </dialog>

      <AddProject />
      <UpdateProject />
      <DeleteProject />
    </>
  )
}
