import React, { FC, useCallback, useState } from 'react'
import Container from '../../utils/components/Container';
import CommentImg from '../../assets/img/comment.png';
import classes from './PostCard.module.scss';
import Button from '../../ui/Button';
import { Post } from '../../api/posts';
import { Comment, ICreateComment } from '../../api/comments';
import clsx from 'clsx';
import { ButtonSizeEnum } from '../../ui/Button/Button';

type IProps = {
    post: Post;
    comments: Comment[];
    onCommentSubmit: (data: ICreateComment) => void;
}

const PostCard: FC<IProps> = ({ post, comments, onCommentSubmit }) => {
    const [areCommentsOpen, setCommentsOpenState] = useState(false);
    const [isFormOpen, setFormOpenState] = useState(false);
    const [formInput, setFormInput] = useState<ICreateComment>({
        name: '',
        email: '',
        body: ''
    })
    const updateFormInput = useCallback((key: keyof ICreateComment) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormInput({
            ...formInput,
            [key]: e.target.value
        })
    }, [formInput])
    const memoOnCommentSubmit = useCallback(() => {
        onCommentSubmit(formInput)
    }, [formInput, onCommentSubmit])
    return (
        <div className={classes.root} key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <img 
                src={CommentImg} 
                alt="comment" 
                onClick={() => setCommentsOpenState(!areCommentsOpen)} 
            />
            {
                areCommentsOpen && (
                    <div className={classes['comments']}>
                        {
                            comments.map((comment) => (
                                <div className={classes['comments-item']} key={comment.id}>
                                    <p>{comment.body}</p>
                                    <div>
                                        <h5>{comment.name}</h5>
                                        <span>{comment.email}</span>
                                    </div>
                                </div>
                            ))
                        }
                        <Button 
                            onClick={() => setFormOpenState(!isFormOpen)}
                            isFullWidth
                            size={ButtonSizeEnum.MEDIUM}
                        >
                            Оставить комментарий
                        </Button>
                        {
                            isFormOpen && (
                                <div className={classes['comments-form']}>
                                    <input type="text" placeholder='Имя' onChange={updateFormInput('name')} />
                                    <input type="text" placeholder='E-Mail' onChange={updateFormInput('email')} />
                                    <textarea placeholder='Текст комментария' onChange={updateFormInput('body')} />
                                    <Button 
                                        onClick={memoOnCommentSubmit}
                                        isFullWidth
                                        size={ButtonSizeEnum.MEDIUM}
                                    >
                                        Отправить
                                    </Button>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default PostCard