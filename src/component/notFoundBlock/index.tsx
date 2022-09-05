import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './NotFoundBlock.module.scss'

const NotFoundBlock = () => {
    return (
        <div className={s.root}>
            <h1>Ничего не найдено</h1>
            <NavLink to='/' ><button className="button button--cart">На главную</button></NavLink>
        </div>
    );
};

export default NotFoundBlock;