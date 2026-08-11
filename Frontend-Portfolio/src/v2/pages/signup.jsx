import ArrowLeftIcon from "../components/Icon/arrowleft-icon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_CAPTCHA_PUBLIC_KEY

export default function Signup() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [firstname, setFirstname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const token = localStorage.getItem('token');

        try {
        const response = await fetch(`${API_URL}/CreateUser`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` })
             },
            body: JSON.stringify({ name, firstname, email, password, captchaValue }),
        })

        const data = await response.json()

        if (response.ok) {
            setMessage('Inscription réussie !')
            setName('')
            setFirstname('')
            setEmail('')
            setPassword('')
            navigate('/login')
            return
        }
            setPassword('')
            setMessage(data.message)

        } catch (error) {
            console.error('Error during registration:', error)
            setMessage('Impossible de contacter le serveur.')
        }
    }

    return (
        <div className="authcontainer">
            <div className="signup">

                <div className="signup__header">
                    <a className="signup__header-nav" href="/"><ArrowLeftIcon /> <span>Retourner au site</span></a>
                </div>

                <div className="signup__content">
                    <h2 className="signup__content-logo">Nolhan<span className="signup__content-logo--red">Dev</span>.</h2>
                    <h1 className="signup__content-title">Bienvenue sur mon <span className="signup__content-title--red">site</span>.</h1>
                    <p className="signup__content-subtitle">Veuillez créer un compte pour continuer.</p>

                    <form className="signup__content-form" onSubmit={handleSubmit}>
                        <div className="signup__content-form--group">
                            <label htmlFor="firstname" className="signup__content-form--label">Prénom</label>
                            <input type="text" id="firstname" name="firstname" className="signup__content-form--input" placeholder="Entrez votre prénom" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
                        </div>
                        <div className="signup__content-form--group">
                            <label htmlFor="name" className="signup__content-form--label">Nom</label>
                            <input type="text" id="name" name="name" className="signup__content-form--input" placeholder="Entrez votre nom" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="signup__content-form--group">
                            <label htmlFor="email" className="signup__content-form--label">Email</label>
                            <input type="email" id="email" name="email" className="signup__content-form--input" placeholder="Entrez votre email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="signup__content-form--group">
                            <label htmlFor="password" className="signup__content-form--label">Mot de passe</label>
                            <input type="password" id="password" name="password" className="signup__content-form--input" placeholder="Entrez votre mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="signup__content-form--button">S'inscrire</button>
                    </form>
                    {message && <p className="signup__content-message">{message}</p>}
                    <p className="signup__content-noaccount"> Déjà un compte ? <a className="signup__content-noaccount--red" href="/login">Se connecter</a></p>
                </div>

            </div>
        </div>
    );
}