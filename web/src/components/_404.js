import React from 'react';
import { useHistory } from 'react-router-dom';

const _404 = () => {
    let history = useHistory();
    const handleClick = () => {
        history.push('/home');
    };

    return (
        <div className="not-found-wrap text-center" style={{height: 'calc(100vh - 110px)'}}>
            <h1 className="text-60">404</h1>
            <p className="text-36 subheading mb-3">Oups!</p>
            <p className="mb-5 text-muted text-18">La page que vous recherchez semble introuvable.</p>
            <div className="btn btn-lg btn-primary btn-rounded" onClick={handleClick}>Retourner à l'accueil</div>
        </div>
    );
}

export default _404;
