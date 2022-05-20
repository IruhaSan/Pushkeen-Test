import React, { FC } from 'react'
import { UserCard } from '../../../const/model';
import Button from '../../../ui/Button';
import classes from './CustomerCard.module.scss';


const CustomerCard: FC<UserCard> = (props) => {
  return (
    <div className={classes.root}>
        <h1>{props.name} {props.surname}</h1>
        <h2>{props.addressCity}</h2>
        <Button onClick={() => console.log()}>Смотреть профиль</Button>
    </div>
  )
}

export default CustomerCard