import React from "react";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL

export default function Carroursel() {

    // -- Nombre de Refresh Total

    const [reload, setReload] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/ReadReload`)
        .then((res) => res.json())
        .then((data) => setReload(data[0].nombre))
        .catch(() => setReload('ERROR'))
    }, [])

    // -- Nombre de Jours en Ligne

    const startDate = new Date('2026-07-10')
    const today = new Date()

    let nbjour = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

    let message

    if (nbjour > 1) {
        message = "Jours"
    } else {
        message = "Jour"
    }

    // -- Heure en Direct

    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
    }, []);

    // -- Dernier Commit Heure

    const [lastCommit, setLastCommit] = useState(null);

    useEffect(() => {
        fetch('https://api.github.com/repos/MNolhan/Nolhan-Portfolio/commits?per_page=1')
        .then((res) => res.json())
        .then((data) => setLastCommit(new Date(data[0].commit.author.date.split('T')[0]).toLocaleDateString()))
        .catch((error) => setLastCommit(error.message));
    }, []);

    // -- Stat Troll

    const troll = Math.round(reload / 5);

    return (
        <div className="carrousel">
            <div className="carrousel__group">
                <div className="carrousel__card image">Nombre de refresh total : {reload}</div>
                <p className="carrousel__separator">•</p>
                <div className="carrousel__card">En ligne depuis {nbjour} {message}</div>
                <p className="carrousel__separator">•</p>
                <div className="carrousel__card">Heure actuelle : {currentTime}</div>
                <p className="carrousel__separator">•</p>
                <div className="carrousel__card">Dernier commit : {lastCommit}</div>
                <p className="carrousel__separator">•</p>
                <div className="carrousel__card">Nombre de café bu : {troll}</div>
                <p className="carrousel__separator">•</p>
            </div>
            <div aria-hidden className="carrousel__group">
                <div className="carrousel__card image">Nombre de refresh total : {reload}</div>
                <p className="carrousel__separator">•</p>
                <div className="carrousel__card">En ligne depuis {nbjour} {message}</div>
                <p className="carrousel__separator">•</p>
                <div className="carrousel__card">Heure actuelle : {currentTime}</div>
                <p className="carrousel__separator">•</p>
                <div className="carrousel__card">Dernier commit : {lastCommit}</div>
                <p className="carrousel__separator">•</p>
                <div className="carrousel__card">Nombre de café bu : {troll}</div>
                <p className="carrousel__separator">•</p>
            </div>
        </div>
    );
}

