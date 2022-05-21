import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchPostComments, fetchUserPosts, UserPost } from '../../api/users';
import Container from '../../utils/components/Container'
import CommentImg from '../../assets/img/comment.png';
import classes from './Posts.module.scss';

type IParams = {
    id: string;
}

const Posts = () => {
    const { id } = useParams<IParams>();
    const [comments, setComments] = useState<Comment[]>([]);
    const [activePostIndexList, setActivePostIndexList] = useState<number[]>([]);
    const updatePostActiveState = useCallback((index: number) => () => {
        if (activePostIndexList.includes(index)) setActivePostIndexList(activePostIndexList.filter((el) => el !== index)) 
        else setActivePostIndexList([...activePostIndexList, index])
    }, [activePostIndexList])
    const [posts, setPosts] = useState<UserPost[]>([])
    useEffect(() => {
        fetchUserPosts(id).then(res => setPosts(res))
    }, [id, posts])
    return (
        <Container className={classes.root}>
            <h1>Все посты</h1>
            <p>Найдено: {posts.length}</p>
            {
                posts.map((post, postIndex) => (
                    <div className={classes.post} key={post.id}>
                        <h1>{post.title}</h1>
                        <p>{post.body}</p>
                        <div>
                            <img src={CommentImg} alt="comment" onClick={updatePostActiveState(postIndex)} />
                        </div>
                        {
                            post && activePostIndexList.includes(postIndex) && (
                                <div className={classes['post-comment']}>
                                    <h1>Здарова</h1>
                                </div>
                            )
                        }
                    </div>
                ))
            }
        </Container>
    )
}

export default Posts