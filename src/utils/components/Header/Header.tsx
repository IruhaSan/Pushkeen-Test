import React from 'react'
import { useNavigate } from 'react-router-dom';
import ROUTEPATH from '../../../const/routePaths';
import Button from '../../../ui/Button';
import Container from '../Container'
import classes from './Header.module.scss';

const Header = () => {
    const navigate = useNavigate();
  return (
        <Container className={classes.root} wrapperClassName={classes['root-wrapper']}>
            <div className={classes.navigateToHome}>
                <Button onClick={() => navigate(ROUTEPATH.HOME)}>Concert club</Button>
            </div>
            <div className={classes.navigateToProfile}>
                <Button onClick={console.log}>Версия для слабовидящих</Button>
                <Button onClick={console.log}>Мой профиль</Button>
            </div>
        </Container>
    )
}

export default Header