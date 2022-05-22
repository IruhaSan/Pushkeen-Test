import React, { useEffect, useMemo, useState } from 'react'
import { getAllUsers, User } from '../../api/users';
import UserCard from '../../components/UserCard';
import Button, { ButtonSizeEnum } from '../../ui/Button/Button';
import Container from '../../utils/components/Container';
import classes from './UserList.module.scss';

const UserList = () => {
    const [userList, setUserList] = useState<User[]>([])
    const [pageIndex, setPageIndex] = useState(1);
    const memoUserList = useMemo(() => {
        return userList.slice(0, pageIndex * 4);
    }, [pageIndex, userList])
    useEffect(() => {
        getAllUsers().then((res) => setUserList(res))
    }, [])
    return (
        <Container className={classes.root}>
            <div className={classes.title}>
                <span>Все участники</span>
                <p>Найдено: {userList.length}</p>
            </div>
            <div className={classes.list}>
                {
                    memoUserList.map((user) => (
                        <UserCard data={user} key={user.id}/>
                    ))
                }
            </div>
            {
                memoUserList.length !== userList.length && (
                    <Button onClick={() => setPageIndex(pageIndex + 1)} size={ButtonSizeEnum.MEDIUM}>Показать еще</Button>
                )
            }
        </Container>
    )
}

export default UserList