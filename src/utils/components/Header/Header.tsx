import React from 'react'
import { useNavigate } from 'react-router-dom';
import RouteEnum from '../../../const/routes';
import Button from '../../../ui/Button';
import { ButtonColorEnum, ButtonSizeEnum } from '../../../ui/Button/Button';
import Container from '../Container'
import classes from './Header.module.scss';

const Header = () => {
    const navigate = useNavigate();
  return (
        <Container className={classes.root} wrapperClassName={classes['root-wrapper']}>
            <div className={classes.logo} onClick={() => navigate(RouteEnum.HOME)}>
                Concert club
            </div>
            <div className={classes.controls}>
                <Button
                    onClick={console.log}
                    size={ButtonSizeEnum.MEDIUM}
                    color={ButtonColorEnum.WHITE}
                >
                    Версия для слабовидящих
                </Button>
                <Button
                    onClick={console.log}
                    size={ButtonSizeEnum.MEDIUM}
                    color={ButtonColorEnum.WHITE}
                >
                    Мой профиль
                </Button>           
            </div>
        </Container>
    )
}

export default Header