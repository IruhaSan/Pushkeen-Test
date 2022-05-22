import React, { FC, useCallback } from 'react'
import classes from './UserCard.module.scss';
import { User } from '../../api/users';
import { useNavigate } from 'react-router-dom';
import Button, { ButtonSizeEnum } from '../../ui/Button/Button';
import { getProfileRoute } from '../../utils/functions/generators';

type IProps = {
    data: User;
}

const UserCard: FC<IProps> = ({ data }) => {
    const navigate = useNavigate();
    const memoGo = useCallback((path: string) => () => {
        navigate(path);
    }, [navigate])
    return (
        <div className={classes.root}>
            <h1>{data.name}</h1>
            <h2>{data.address.city}</h2>
            <Button size={ButtonSizeEnum.TINY} onClick={memoGo(getProfileRoute(data.id))}>Смотреть профиль</Button>
        </div>
    )
}

export default UserCard