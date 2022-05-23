import React, {  useEffect, useMemo, useState } from 'react'
import Button from '../../ui/Button'
import Container from '../../utils/components/Container'
import GroupImg from '../../assets/img/group_promo.jpg';
import PromoTitleBlurImg1 from '../../assets/img/promo_title_blur_1.svg';
import PromoTitleBlurImg2 from '../../assets/img/promo_title_blur_2.svg';
import classes from './Home.module.scss'
import { getAllUsers, User } from '../../api/users';
import { useNavigate } from 'react-router-dom';
import { ButtonSizeEnum } from '../../ui/Button/Button';
import UserCard from '../../components/UserCard';
import RouteEnum from '../../const/routes';
import { fetchAll } from '../../store/users.slice';
import useAppDispatch from '../../utils/hooks/useAppDispatch';
import useAppStore from '../../utils/hooks/useAppStore';
import { useSelector } from 'react-redux';
import useAppSelector from '../../utils/hooks/useAppSelector';
 

const Home = () => {
  const customerList = useAppSelector<User[]>(state => state.users.all);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const memoCustomerList = useMemo(() => {
    return customerList.slice(0, 4);
  }, [customerList])

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch])

   return (
    <div className={classes.root}>
      <Container className={classes.promo} wrapperClassName={classes.wrapper} isExtended>
        <img src={GroupImg} alt="" />
        <Container className={classes['promo-content']}>
          <div className={classes['promo-content__title']}>
            <div>
              <h1>Twenty One Pilots</h1>
              <img src={PromoTitleBlurImg1} alt="" />
            </div>
            <div>
              <img src={PromoTitleBlurImg2} alt="" />
              <h2>22.02.23 в 21:00</h2>
            </div>
          </div>
          <div className={classes['promo-content__controls']}>
            <div />
            <Button size={ButtonSizeEnum.MEDIUM} onClick={console.log}>Купить билет</Button>
            <div />
          </div>
        </Container>
      </Container>
      <Container className={classes.customers}>
        <div className={classes['customers-title']}>
          <span>Купили билеты</span>
          <p>{customerList.length}/<strong>1000</strong></p>
        </div>
        <div className={classes['customers-list']}>
          {
            memoCustomerList.map((user) => (
               <UserCard data={user} key={user.id} />
            ))
          }
        </div>
        <Button size={ButtonSizeEnum.MEDIUM} onClick={() => navigate(RouteEnum.USER_LIST)}>Смотреть все</Button>
      </Container>
      <Container className={classes.block}>
          <div className={classes.location}>
            <h1>О площадке</h1>
            <div className={classes['location-content']}>
              <div className={classes['location-content__aside']}/>
              <div className={classes['location-content__text']}>
                <h6>Современная площадка для проведения концертов и других мероприятий любой сложности.</h6>
                <p>Мы предоставляем всю необходимую для организаторов инфраструктуру и готовые решения под все основные задачи любого события, а также современное оборудование, соответствующее самым высоким мировым стандартам. </p>
              </div>
            </div>
          </div>
          <div className={classes.form}>
            <h1>Оставить заявку на проведение концерта</h1>
            <textarea placeholder='Расскажите о вашем предложении ' />
            <Button size={ButtonSizeEnum.TINY} onClick={console.log}>Отправить</Button>
          </div>
      </Container>
      <Container className={classes.about}>
        <h1>О группе</h1>
        <p>Twenty One Pilots — американский дуэт из Колумбуса, штат Огайо. Группа образовалась в 2009 году и на данный момент состоит из Тайлера Джозефа и Джоша Дана. Коллектив самостоятельно выпустил два альбома: Twenty One Pilots в 2009 и Regional at Best в 2011.</p>
      </Container>
    </div>
  )
}

export default Home