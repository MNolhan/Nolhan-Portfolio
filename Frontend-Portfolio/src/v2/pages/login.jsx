import ArrowLeftIcon from "../components/Icon/arrowleft-icon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
        const response = await fetch(`${API_URL}/Login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })

        const data = await response.json()

        if (response.ok) {
            localStorage.setItem('token', data.token)
            setMessage('Connexion réussie !')
            setEmail('')
            setPassword('')
            setTimeout(() => {
                window.location.reload()
            }, 2000)
            navigate('/')
            return
        }
            setPassword('')
            setMessage(data.message)

        } catch (error) {
            console.error('Error during login:', error)
            setMessage('Impossible de contacter le serveur.')
        }
    }

    return (
        <div className="authcontainer">
            <div className="login">

                <div className="login__header">
                    <a className="login__header-nav" href="/"><ArrowLeftIcon /> <span>Retourner au site</span></a>
                </div>

                <div className="login__content">
                    <h2 className="login__content-logo">Nolhan<span className="login__content-logo--red">Dev</span>.</h2>
                    <h1 className="login__content-title">Content de te <span className="login__content-title--red">revoir</span>.</h1>
                    <p className="login__content-subtitle">Veuillez vous connecter pour continuer.</p>

                    <form className="login__content-form" onSubmit={handleSubmit}>
                        <div className="login__content-form--group">
                            <label htmlFor="email" className="login__content-form--label">Email</label>
                            <input type="email" id="email" name="email" className="login__content-form--input" placeholder="Entrez votre email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="login__content-form--group">
                            <label htmlFor="password" className="login__content-form--label">Mot de passe</label>
                            <input type="password" id="password" name="password" className="login__content-form--input" placeholder="Entrez votre mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="login__content-form--button">Se connecter</button>
                    </form>
                    {message && <p className="login__content-message">{message}</p>}
                    <p className="login__content-noaccount"> Pas encore de compte ? <a className="login__content-noaccount--red" href="/signup">Créer un compte</a></p>
                </div>

            </div>
        </div>
    );
}