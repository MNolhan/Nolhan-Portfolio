import { useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL

export default function ReloadTracker() {

    useEffect(() => {
        fetch(`${API_URL}/IncrementReload`, {
            method: "POST",
        })
        .then((res) => res.json())
        .catch(() => console.error('Erreur lors de l\'incrémentation du nombre de visites'));
    }, [])
    return null;
}