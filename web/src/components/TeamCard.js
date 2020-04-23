import React from 'react'

function TeamCard() {
    return (
        <div className="card mt-4">
        <div className="card-body">
            <div className="card-title">Supporters</div>
                <div className="ul-widget1">
                    <div className="ul-widget4__item ul-widget4__users">
                        <div className="ul-widget4__img">
                            <img id="userDropdown" src={face} alt="alt" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                        </div>
                        <div className="ul-widget2__info ul-widget4__users-info">
                            <a className="ul-widget2__title" href="#">
                                John Doe
                            </a>
                            <span className="ul-widget2__username" href="#">
                                Cofondateur, Oak Naturo
                            </span>
                        </div>
                    </div>
                    <div className="ul-widget4__item ul-widget4__users">
                        <div className="ul-widget4__img">
                            <img id="userDropdown" src={face} alt="alt" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                        </div>
                        <div className="ul-widget2__info ul-widget4__users-info">
                            <a className="ul-widget2__title" href="#">
                                Jane Doe
                            </a>
                            <span className="ul-widget2__username" href="#">
                                Cofondatrice, Oak Naturo
                            </span>
                        </div>
                    </div>                             
                </div>
            </div>
        </div>  
    )
}

export default TeamCard
