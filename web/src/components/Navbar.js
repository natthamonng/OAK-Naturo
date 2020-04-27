import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/images/acorn.png';

const Navbar = ({ auth: { user }, signOutUser }) => {
    const { role } = user;

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showAdminMenu, setShowAdminMenu] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [showAvatarMenu, setShowAvatarMenu] = useState(false);

    return (
        <>
        <div className="main-header">
            <div className="logo">
                <img src={Logo} alt="logo" />
            </div>
            <div className="menu-toggle" onClick={()=> {setIsSidebarOpen(!isSidebarOpen)}}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div style={{margin: 'auto'}}></div>
            <div className="header-part-right">
                {/*Admin menu Dropdown*/}
                { role === 'admin' &&
                    <div className={`dropdown ${showAdminMenu? 'show' : ''}`}
                         onClick={()=> {setShowAdminMenu(!showAdminMenu)}}>
                        <i className="i-Geek text-muted header-icon" id="dropdownMenuButton"
                           role="button" data-toggle="dropdown" aria-haspopup="true"
                           aria-expanded={`${showAdminMenu? 'true' : 'false'}`}>
                        </i>
                        <div className={`dropdown-menu dropdown-menu-right ${showAdminMenu? 'show' : ''}`}
                             aria-labelledby="dropdownMenuButton">
                            <div className="menu-icon-grid">
                                <Link to="/settings/add-user">
                                    <i className="i-Add-User"></i>Ajouter un nouveau utilisateur
                                </Link>
                            </div>
                        </div>
                    </div>
                }
                {/* Notificaiton */}
                <div className="dropdown">
                    <div className="badge-top-container" onClick={()=> {setShowNotification(!showNotification)}}
                         role="button" id="dropdownNotification" data-toggle="dropdown"
                         aria-haspopup="true" aria-expanded="false">
                        <span className="badge badge-primary">1</span>
                        <i className="i-Bell text-muted header-icon"></i>
                    </div>
                    {/* Notification dropdown */}
                    <div className={`dropdown-menu dropdown-menu-right notification-dropdown 
                         rtl-ps-none ${showNotification? 'show' : ''}`}
                         aria-labelledby="dropdownNotification" data-perfect-scrollbar data-suppress-scroll-x="true">
                        <div className="dropdown-item d-flex">
                            <div className="notification-icon">
                                <i className="i-Speach-Bubble-6 text-primary mr-1"></i>
                            </div>
                            <div className="notification-details flex-grow-1">
                                <p className="m-0 d-flex align-items-center">
                                    <span>New message</span>
                                    <span className="badge badge-pill badge-primary ml-1 mr-1">new</span>
                                    <span className="flex-grow-1"></span>
                                    <span className="text-small text-muted ml-auto">10 sec ago</span>
                                </p>
                                <p className="text-small text-muted m-0">James: Hey! are you busy?</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* User avatar dropdown*/}
                <div className="dropdown" style={{cursor: 'pointer'}}
                     onClick={()=> {setShowAvatarMenu(!showAvatarMenu)}}>
                    <div className="user col align-self-end">
                        <div className="badge badge-round-primary lg" id="userDropdown"
                             data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {(user.username).slice(0, 1).toUpperCase()}
                        </div>
                        <div className={`dropdown-menu dropdown-menu-right mt-2 mr-2 ${showAvatarMenu ? 'show' : ''}`}
                             aria-labelledby="userDropdown">
                            <div className="dropdown-header">
                                <i className="i-Lock-User mr-1"></i>
                                {(user.username).toUpperCase()}
                            </div>
                            <Link to="/profile" className="dropdown-item disabled">Paramètres du compte</Link>
                            <div className="dropdown-item" onClick={signOutUser} >Déconnexion</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="horizontal-bar-wrap">
            <div className={`header-topnav ${isSidebarOpen? 'open': ''}`}>
                <div className="container-fluid">
                    <div className="topnav rtl-ps-none" id="" data-perfect-scrollbar="" data-suppress-scroll-x="true">
                        <ul className="menu">
                            <li>
                                <div>
                                    <div>
                                        <label className="toggle" htmlFor="drop-2">Accueil</label>
                                        <Link to="/home">
                                            <i className="nav-icon mr-2 i-Home1"></i> Accueil
                                        </Link>
                                        <input id="drop-2" type="checkbox"/>
                                    </div>
                                </div>
                            </li>
                            {/*<li>*/}
                            {/*    <div>*/}
                            {/*        <div>*/}
                            {/*            <label className="toggle" htmlFor="drop-2">Forum de discussions</label>*/}
                            {/*            <Link to="/forum">*/}
                            {/*                <i className="nav-icon mr-2 i-Speach-Bubble-Asking"></i> Forum de discussions*/}
                            {/*            </Link>*/}
                            {/*            <input id="drop-2" type="checkbox"/>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</li>*/}
                            { role !== 'visitor' &&
                            <li>
                                <div>
                                    <div>
                                        <label className="toggle" htmlFor="drop-2">Espace Pro</label>
                                        <Link to="/pro">
                                            <i className="nav-icon mr-2 i-Bar-Chart"></i>Espace Pro
                                        </Link>
                                        <input id="drop-2" type="checkbox"/>
                                    </div>
                                </div>
                            </li>
                            }
                            { role !== 'visitor' &&
                            <li>
                                <div>
                                    <div>
                                        <label className="toggle" htmlFor="drop-2">Documentation</label>
                                        <Link to="/documentation">
                                            <i className="nav-icon mr-2 i-Library"></i>Documentation
                                        </Link>
                                        <input id="drop-2" type="checkbox"/>
                                        <ul>
                                            <li>
                                                <Link to="/documentation">
                                                    <i className="nav-icon mr-2 i-Letter-Open"></i>
                                                    <span className="item-name">Tous les Documents</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/documentation/create-file">
                                                    <i className="nav-icon mr-2 i-File-Edit"></i>
                                                    <span className="item-name">Créer un fichier</span>
                                                </Link>
                                            </li>
                                            {role === "admin" &&
                                            <li>
                                                <Link to="/documentation/manage-category">
                                                    <i className="nav-icon mr-2 i-Folder-Settings"></i>
                                                    <span className="item-name">Gérer des catégories</span>
                                                </Link>
                                            </li>
                                            }
                                            { role === "admin" &&
                                            <li>
                                                <Link to="/documentation/recycle-bin">
                                                    <i className="nav-icon mr-2 i-Empty-Box"></i>
                                                    <span className="item-name">Corbeille</span>
                                                </Link>
                                            </li>
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Navbar;