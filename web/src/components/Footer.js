import React from 'react';
import Logo from '../assets/images/acorn.png';

const Footer = () => {
    return (
        <>
        <div className="flex-grow-1"></div>
        <div className="app-footer">
            <div className="row">
                <div className="col-md-9">
                    <p><strong>Lorem ipsum, dolor sit amet consectetur adipisicing elit</strong></p>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero quis beatae officia saepe
                        perferendis voluptatum minima eveniet voluptates dolorum, temporibus nisi maxime nesciunt
                        totam repudiandae commodi sequi dolor quibusdam
                    </p>
                </div>
            </div>
            <div className="footer-bottom border-top pt-3 d-flex flex-column flex-sm-row align-items-center">
                <span className="flex-grow-1"></span>
                <div className="d-flex align-items-center">
                    <img className="logo" src={Logo} alt=""/>
                        <div>
                            <p className="m-0">&copy; 2020 Oak Naturo</p>
                            <p className="m-0">Tous droits réservés</p>
                        </div>
                </div>
            </div>
        </div>
        </>
    )
};

export default Footer;