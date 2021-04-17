import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return <header className={s.header}>
        <img src="https://static.tumblr.com/d87791fa38de3d8486e160f13501a04e/buqjmyu/GfToqsqap/tumblr_static_tumblr_static_26hytuzyegxwgwo8cg0cg0s8w_focused_v3.jpg" />

        <div className={s.loginBlock}>
            { props.isAuth
                ? <div className={s.headerLogin}>{props.login}  <button className="button1"  onClick={props.logout}>Log out</button > </div>
                : <NavLink className={s.headerLogin}  to={'/login'}>Login</NavLink> }
        </div>
    </header>
}

export default Header;