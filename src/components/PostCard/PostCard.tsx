import React, { FC, useCallback, useState } from 'react'
import CommentImg from '../../assets/img/comment.png';
import classes from './PostCard.module.scss';
import Button from '../../ui/Button';
import { Post } from '../../api/posts';
import { Comment, ICreateComment } from '../../api/comments';
import { ButtonSizeEnum } from '../../ui/Button/Button';

type IProps = {
    post: Post;
    comments: Comment[];
    onCommentSubmit: (data: ICreateComment) => Promise<Comment | unknown>;
}

const initialValues: ICreateComment = {
    name: '',
    email: '',
    body: ''
}

const PostCard: FC<IProps> = ({ post, comments, onCommentSubmit }) => {
    const [areCommentsOpen, setCommentsOpenState] = useState(false);
    const [isFormOpen, setFormOpenState] = useState(false);
    const [formInput, setFormInput] = useState<ICreateComment>(initialValues)
    const updateFormInput = useCallback((key: keyof ICreateComment) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormInput({
            ...formInput,
            [key]: e.target.value
        })
    }, [formInput])
    const memoOnCommentSubmit = useCallback(async () => {
        const data = await onCommentSubmit(formInput)
        if (data) setFormInput(initialValues)
    }, [formInput, onCommentSubmit])
    return (
        <div className={classes.root} key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <img 
                src={CommentImg} 
                alt="comment" 
                onClick={() => {
                    setCommentsOpenState(!areCommentsOpen)
                    setFormOpenState(false)
                }} 
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
                        
                        {
                            !isFormOpen && (
                                <Button
                                    onClick={() => setFormOpenState(!isFormOpen)}
                                    isFullWidth
                                    size={ButtonSizeEnum.MEDIUM}
                                >
                                    Оставить комментарий
                                </Button>
                            )
                        }
                        {
                            isFormOpen && (
                                <div className={classes['comments-form']}>
                                    <input value={formInput.name} type="text" placeholder='Имя' onChange={updateFormInput('name')} />
                                    <input value={formInput.email} type="text" placeholder='E-Mail' onChange={updateFormInput('email')} />
                                    <textarea value={formInput.body} placeholder='Текст комментария' onChange={updateFormInput('body')} />
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