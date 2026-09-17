import React from 'react';
import ArrowLeftIcon from '../components/Icon/arrowleft-icon';
import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL

export default function Profil() {


    // Lecture

    const [user, setUser] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${API_URL}/users/me`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();
                if (response.ok) {
                    setUser(data[0]);
                }

            } catch (err) {
                console.error(err);
            }
        };
        fetchUser();
    }, []);


    // Update

    const [firstname, setFirstname] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const udapte = await fetch(`${API_URL}/users`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ firstname, name, email })
            });
            
            const data = await udapte.json();

            if (udapte.ok) {
                setMessage('Profil mis à jour avec succès');
                window.location.reload();
            } else {
                setMessage('Une erreur est survenue');
            }
        } catch (err) {
            console.error(err);
            setMessage('Une erreur est survenue');
        }
    };

    return (
        <div className="authcontainer">
            <div className="profil">

                <div className="profil__header">
                    <a className="profil__header-nav" href="/"><ArrowLeftIcon /> <span>Retourner au site</span></a>
                </div>

                <div className="profil__content">
                    <h2 className="profil__content-logo">Nolhan<span className="profil__content-logo--red">Dev</span>.</h2>
                    <h1 className="profil__content-title">Voici votre profil <span className="profil__content-title--red">{user?.firstname}</span>.</h1>
                    <p className="profil__content-subtitle">Vos informations personnelles. Modifiez-les à tout moment, puis enregistrez.</p>

                    <form className="profil__content-form" onSubmit={handleSubmit}>
                        <div className="profil__content-form--group">
                            <label htmlFor="firstname" className="profil__content-form--label">Prénom</label>
                            <input type="text" id="firstname" name="firstname" className="profil__content-form--input" placeholder={user?.firstname} value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                        </div>
                        <div className="profil__content-form--group">
                            <label htmlFor="name" className="profil__content-form--label">Nom</label>
                            <input type="text" id="name" name="name" className="profil__content-form--input" placeholder={user?.name} value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="profil__content-form--group">
                            <label htmlFor="email" className="profil__content-form--label">Email</label>
                            <input type="email" id="email" name="email" className="profil__content-form--input" placeholder={user?.email} value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <button type="submit" className="profil__content-form--button">Confirmer la modification</button>
                        {message && <p className="profil__content-form--message">{message}</p>}
                    </form>
                </div>

            </div>
        </div>  
    );
}