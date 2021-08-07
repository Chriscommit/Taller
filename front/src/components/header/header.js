import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import iconMenu from '../../assets/img/logo/menu.png'
import logoEnterprise from '../../assets/img/logo/logoenterprise.svg'

const Header = () => {
    
    const refMenu = React.createRef()

    const [isOpen, setOpenMenu ] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    window.addEventListener('resize', function(){
        setWindowWidth(window.innerWidth)
    })

    useEffect(() =>{
        if(windowWidth < 992){
            if(isOpen){
                refMenu.current.style.display = 'flex'
            }else{
                refMenu.current.style.display = 'none'
            }
        }else{
            refMenu.current.style.display = 'flex'
        }
    },[isOpen,refMenu,windowWidth])
    
    return (
        <>
        { windowWidth < 992 ? 

        <header className= "app-header">
            <nav>
                <h1 className="app-logo">
                    <Link to="/" onClick = { () => setOpenMenu(false) }><img src={ logoEnterprise } alt="Logo entreprise Taller" /></Link>
                </h1>
                <div className="container-list-nav" ref= { refMenu }>
                    <ul className="list-nav">
                        <li><Link to="/products" onClick = { () => setOpenMenu(!isOpen) }>Nos montres</Link></li>
                        <li><Link to="/basket" onClick = { () => setOpenMenu(!isOpen) }>Panier</Link></li>
                        <li><Link to="/login" onClick = { () => setOpenMenu(!isOpen) }>Se connecter</Link></li>
                        <li><Link to="/register" onClick = { () => setOpenMenu(!isOpen) }>S'inscrire</Link></li>
                    </ul>
                </div>
                <div className="icon_menu">
                    <img src={ iconMenu } alt="menu" onClick= { (e) => { setOpenMenu(!isOpen) } }/>
                </div>
            </nav>
        </header>
        
        :
        
        <header className= "app-header">
            <nav>
                <h1 className="app-logo">
                    <Link to="/home"><img src={ logoEnterprise } alt="Logo entreprise Taller" /></Link>
                </h1>
                <div className="container-list-nav" ref= { refMenu }>
                    <ul className="list-nav">
                        <li><Link to="/products">Nos montres</Link></li>
                        <li><Link to="/basket">Panier</Link></li>
                        <li><Link to="/login">Se connecter</Link></li>
                        <li><Link to="/register">S'inscrire</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
        }
    </>
    )
}

export default Header