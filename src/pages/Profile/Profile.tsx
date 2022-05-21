import React, { useEffect, useMemo, useState } from 'react'
import Button from '../../ui/Button';
import Container from '../../utils/components/Container';
import PublicationImg from '../../assets/img/publication.svg';
import classes from './Profile.module.scss'; 
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { fetchUser, fetchUserPosts, User, UserPost } from '../../api/users';

type IParams = {
  id: string;
}

const Profile = () => {
  const { id } = useParams<IParams>();
  const [user, setUser] = useState<User>();
  const [userPosts, setUserPosts] = useState<UserPost[]>([]);
  const memoPreviewPosts = useMemo(() => {
    return userPosts.splice(0, 2);
  }, [userPosts])
  useEffect(() => {
    fetchUser(id).then((res) => {
      setUser(res);
    })
    fetchUserPosts(id).then(res => setUserPosts(res))
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
          <Button onClick={console.log}>Написать сообщение</Button>
          <Button onClick={console.log}>Предложить сходить на концерт</Button>
        </div>
      </Container>
      <Container className={classes.posts} wrapperClassName={classes['posts-wrapper']}>
        <h1>Посты</h1>
        <div>
            {
              memoPreviewPosts.map((post) => (                
              <div>
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