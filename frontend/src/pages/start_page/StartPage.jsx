import React from 'react';
import style from "./StartPage.module.css";
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LoginForm from '../../components/login_form/LoginForm';

export default function StartPage(prop) {
  const [authorizationAlert, setAuthorizationAlert] = useState('');

  return (
    <div className={style.container}>
      <LoginForm 
        authorizationAlert={authorizationAlert} 
        setAuthorizationAlert={setAuthorizationAlert} 
        setUserId={prop.setUserId}
        setToken={prop.setToken}
      />
      <div className={style.navlinkContainer}>
        <NavLink to={prop.userId === 0 || prop.userId   ? `/expeditions/user/${prop.userId}` : undefined}>
            <button className={style.button}>YOUR EXPEDITIONS LIST</button>
        </NavLink>
        <NavLink to={prop.userId === 0 || prop.userId  ? "/expeditions" : undefined}>
            <button className={style.button}>ALL USERS EXPEDITIONS</button>
        </NavLink>
      </div>
    </div>
  )
}
