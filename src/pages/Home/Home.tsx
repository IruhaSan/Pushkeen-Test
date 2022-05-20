import React from 'react'
import Button from '../../ui/Button'
import Container from '../../utils/components/Container'
import GroupImg from '../../assets/img/group_promo.jpg';
import PromoTitleBlurImg1 from '../../assets/img/promo_title_blur_1.svg';
import PromoTitleBlurImg2 from '../../assets/img/promo_title_blur_2.svg';
import classes from './Home.module.scss'

const Home = () => {
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
            <Button onClick={console.log}>Купить билет</Button>
            <div />
          </div>
        </Container>
      </Container>
      <Container className={classes.customers}>
          <div className={classes.tickets}>
                <span>Купили билеты</span>
                <p>100/<strong>1000</strong></p>
          </div>
      </Container>
    </div>
  )
}

export default Home