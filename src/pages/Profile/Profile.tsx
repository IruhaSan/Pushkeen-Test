import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Button from '../../ui/Button';
import Container from '../../utils/components/Container';
import PublicationImg from '../../assets/img/publication.svg';
import classes from './Profile.module.scss'; 
import { useNavigate, useParams } from 'react-router-dom';
import { getUser, User } from '../../api/users';
import { getPostsRoute } from '../../utils/functions/generators';
import { getPosts, Post } from '../../api/posts';
import { ButtonSizeEnum } from '../../ui/Button/Button';
import clsx from 'clsx';

type IParams = {
  id: string;
}

const Profile = () => {
  const { id } = useParams<IParams>();
  const [user, setUser] = useState<User>();
  const [isOpenDetails ,setOpenDetailsState] = useState(false);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const navigate = useNavigate();
  const memoGo = useCallback((path: string) => () => {
    navigate(path);
  }, [navigate])
  const memoPreviewPosts = useMemo(() => {
    return userPosts.splice(0, 2);
  }, [userPosts])
  useEffect(() => {
    getUser(id).then((res) => {
      setUser(res);
    })
    getPosts(id).then(res => setUserPosts(res))
  }, [id])
  return (
    <div className={classes.root}>
      <Container className={classes.about} wrapperClassName={classes['about-wrapper']}>
        <h1>{user?.name}</h1>
      </Container>
      <Container className={classes.address} wrapperClassName={classes['address-wrapper']}>
        <p>{user?.address.city}</p>
        <p>{user?.email}</p>
        <p>{user?.phone}</p>
        <div>
          <Button size={ButtonSizeEnum.TINY} onClick={console.log}>Написать сообщение</Button>
          <Button size={ButtonSizeEnum.TINY} onClick={console.log}>Предложить сходить на концерт</Button>
        </div>
      </Container>
      {
        isOpenDetails && (
          <Container className={classes.details} wrapperClassName={classes['details-wrapper']}>
            <div>
              <span>Логин</span>
              <p>{user?.username}</p>
            </div>
            <div>
              <span>Название компании</span> 
              <p>{user?.company.name}</p>
            </div>
            <div>
              <span>Подписка</span> 
              <p>{user?.company.bs}</p>
            </div>
            <div>
              <span>Веб сайт</span>
              <a href={`https://${user?.website}`} target='_blank'>{user?.website}</a>
            </div>
          </Container>
        )
      }
      <div className={clsx(classes['address-openArrow'], isOpenDetails && classes.isActive)} onClick={() => setOpenDetailsState(!isOpenDetails)} />
      <Container className={classes.posts} wrapperClassName={classes['posts-wrapper']}>
        <h1>Посты</h1>
        <div>
            {
              memoPreviewPosts.map((post) => (                
                <div onClick={memoGo(getPostsRoute(id || 1))} key={post.id}>
                <div>
                  <span>{post.title}</span>
                  <p>12.01.22</p>
                </div>
                <p>{post.body}</p>
              </div>
                ))
              }
        </div>
      </Container>
      <Container className={classes.publications} wrapperClassName={classes['publications-wrapper']}>
        <h1>Публикации</h1>
        <div className={classes['publications-list']}>
          <img src={PublicationImg} alt="" />
          <img src={PublicationImg} alt="" />
          <img src={PublicationImg} alt="" />
          <img src={PublicationImg} alt="" />
          <img src={PublicationImg} alt="" />
          <img src={PublicationImg} alt="" />
        </div>
      </Container>
    </div>
  )

}

export default Profile