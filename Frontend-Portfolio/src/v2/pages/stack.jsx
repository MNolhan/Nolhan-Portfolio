import CardStack from "../components/ui/card_stack";
import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL

export default function Stack(){

    const [Stack, setStack] = useState([])

    useEffect(() => {
        fetch(`${API_URL}/ReadStack`)
        .then((res) => res.json())
        .then((data) => setStack(data))
        .catch(() => setStack([]))
    }, [])

    return(
        <div className="container--small" id="stack">
            <div className="stack">

                <div className="stack__header">
                    <h1 className="stack__header-title">- Stack</h1>
                    <p className="stack__header-subtitle"> Les technologies que je <span className="stack__header-subtitle--red">maîtrise</span>.</p>
                </div>

                <div className="stack__content">
                    <div className="stack__content--Front">
                        <h2 className="stack__content-title">
                            <span className="stack__content-title--red">01</span>
                            Front-End
                        </h2>
                        <hr></hr>
                        <div className="stack__content--list">
                            {Stack
                                .filter((s) => s.category.toLowerCase() === "front-end")
                                .map((s) => (
                                    <CardStack key={s.id}>{s.name}</CardStack>
                                ))}
                        </div>
                    </div>
                    <div className="stack__content--Back">
                        <h2 className="stack__content-title">
                            <span className="stack__content-title--red">02</span>
                            Back-End
                        </h2>
                        <hr></hr>
                        <div className="stack__content--list">
                            {Stack
                                .filter((s) => s.category.toLowerCase() === "back-end")
                                .map((s) => (
                                    <CardStack key={s.id}>{s.name}</CardStack>
                                ))}
                        </div>
                    </div>
                    <div className="stack__content--Other">
                        <h2 className="stack__content-title">
                            <span className="stack__content-title--red">03</span>
                            Outils & Design
                        </h2>
                        <hr></hr>
                        <div className="stack__content--list">
                            {Stack
                                .filter((s) => s.category.toLowerCase() === "outils & design")
                                .map((s) => (
                                    <CardStack key={s.id}>{s.name}</CardStack>
                                ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}