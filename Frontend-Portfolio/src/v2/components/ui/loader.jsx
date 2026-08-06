import { useState, useEffect } from "react";

export default function Loader(){
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setHidden(true), 600);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`loader ${hidden ? "loader--hidden" : ""}`}>
            <div className="loader__text">Nolhan<span>Dev</span>.</div>
        </div>
    );
}