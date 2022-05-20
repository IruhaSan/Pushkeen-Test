import React from 'react'
import { useNavigate } from 'react-router-dom';
import ROUTEPATH from '../../../const/routePaths';
import Container from '../Container'
import classes from './Header.module.scss';

const Header = () => {
    const navigate = useNavigate();
  return (
        <Container className={classes.root} wrapperClassName={classes.wrapper}>
            <div className={classes.navigateToHome}>
                <button onClick={() => navigate(ROUTEPATH.HOME)}>CONCERT CLUB</button>
            </div>
            <div className={classes.navigateToProfile}>
                <button>Версия для слабовидящих</button>
                <button>Мой профиль</button>
            </div>
        </Container>
    )
}

export default Header