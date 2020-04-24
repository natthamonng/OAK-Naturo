import React, {useEffect, useState} from 'react';
import '../assets/scss/home.scss';

function WelcomeText() {
    const [ style, setStyle ] = useState({display: 'flex'});

    useEffect(() => {
        removeWelcomeMessage();
    }, []);

    const removeWelcomeMessage = () => {
        setTimeout( () => {
            setStyle({display: 'none'})
        }, 5000);
    };

    return (
        <div className="col-12">
            <div className="welcome-text-block" style={style}>
                <div className="welcome-text">
                    BIENVENUE
                </div>
            </div>
        </div>
    )
}

export default WelcomeText;
