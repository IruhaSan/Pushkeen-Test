import React, { useEffect, useMemo, useState } from 'react'
import { getAllUsers, User } from '../../api/users';
import UserCard from '../../components/UserCard';
import { fetchAll } from '../../store/users.slice';
import Button, { ButtonSizeEnum } from '../../ui/Button/Button';
import Container from '../../utils/components/Container';
import useAppDispatch from '../../utils/hooks/useAppDispatch';
import useAppSelector from '../../utils/hooks/useAppSelector';
import classes from './UserList.module.scss';

const UserList = () => {
    const [pageIndex, setPageIndex] = useState(1);
    const userList = useAppSelector<{
        totalCount: number,
        data: User[],
    }>((state) => ({
        totalCount: state.users.totalCount,
        data: state.users.all.slice(0, pageIndex * 4)
    }))

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (userList.totalCount) return
        dispatch(fetchAll())
    }, [dispatch, userList.totalCount])

    return (
        <Container className={classes.root}>
            <div className={classes.title}>
                <span>Все участники</span>
                <p>Найдено: {userList.totalCount}</p>
            </div>
            <div className={classes.list}>
                {
                    userList.data.map((user) => (
                        <UserCard data={user} key={user.id}/>
                    ))
                }
            </div>
            {
                userList.data.length !== userList.totalCount && (
                    <Button onClick={() => setPageIndex(pageIndex + 1)} size={ButtonSizeEnum.MEDIUM}>Показать еще</Button>
                )
            }
        </Container>
    )
}

export default UserList