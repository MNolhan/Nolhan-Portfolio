import CardStack from "../components/ui/card_stack";

export default function Stack(){
    return(
        <div className="container--small">
            <div className="stack" id="stack">

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
                            <CardStack>HTML5</CardStack>
                            <CardStack>CSS3 / SCSS</CardStack>
                            <CardStack>JavaScript</CardStack>
                            <CardStack>React.JS</CardStack>
                        </div>
                    </div>
                    <div className="stack__content--Back">
                        <h2 className="stack__content-title">
                            <span className="stack__content-title--red">02</span>
                            Back-End
                        </h2>
                        <hr></hr>
                        <div className="stack__content--list">
                            <CardStack>Node.js</CardStack>
                            <CardStack>Express.js</CardStack>
                            <CardStack>Laravel</CardStack>
                            <CardStack>PHP</CardStack>
                            <CardStack>MySQL</CardStack>
                            <CardStack>Redis</CardStack>
                        </div>
                    </div>
                    <div className="stack__content--Other">
                        <h2 className="stack__content-title">
                            <span className="stack__content-title--red">03</span>
                            Outils & Design
                        </h2>
                        <hr></hr>
                        <div className="stack__content--list">
                            <CardStack>Git / Github</CardStack>
                            <CardStack>Figma</CardStack>
                            <CardStack>Railway</CardStack>
                            <CardStack>Stripe</CardStack>
                            <CardStack>Docker</CardStack>
                            <CardStack>PostMan</CardStack>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}