import {useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useParams,useNavigate} from 'react-router-dom'

import { asyncEditPost } from './postsSlice'
import { asyncDeletePost } from './postsSlice'
import { selectPostById } from './postsSlice'

export const EditPostForm = () => {
  
  const { postId } = useParams()
  
  const post = useSelector((state) => selectPostById(state,postId))
  
  const [title, setTitle] = useState(post?.title)
  const [content, setContent] = useState(post?.body)
  
  const navigate = useNavigate()
  
  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  
  const dispatch = useDispatch()
  
  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)
  
  const canSave = Boolean(title) && Boolean(content) && addRequestStatus === 'idle'
  
  const onSaveChanged = async (e) => {
    e.preventDefault()
    
    try {
      setAddRequestStatus('pending')
      
      await dispatch(asyncEditPost({
      title,
      body:content,
      userId: post.userId,
      id: post.id,
    })).unwrap()
    
    navigate(`/post/${post.id}`)
    
    } catch (e) {
      console.error(e.message)
    }
    finally{
      setAddRequestStatus('idle')
    }
    
    setTitle('')
    setContent('')
  }
  
  const onDelete = async (e) => {
    e.preventDefault()
    
    try {
      await dispatch(asyncDeletePost
      ({id: post.id})).unwrap()
      navigate(`/`)
    } catch (e) {
      console.error(e.message)
    }
  }
  
  return ( 
    <section>
    <h2>Add a New Post</h2>
      <form>
      <label 
      htmlFor="postTitle">
      Post Title:
      </label>
      <input
        type="text"
        id="postTitle"
        name="postTitle"
        value={title}
        onChange={onTitleChanged}
      />
      <label 
      htmlFor="postContent">
      Content:
      </label>
      <textarea
        id="postContent"
        name="postContent"
        value={content}
        onChange={onContentChanged}
      />
      <button 
      type="submit"
      onClick={onSaveChanged}
      disabled={!canSave}
      >
      {  
      addRequestStatus==='pending' 
      ? 
      'Loading ...' 
      : 
      'Edit Post' 
      }
      </button>
      
      <button 
      className='deleteButton'
      onClick={onDelete}
      >
      Delete Post
      </button>
      
      </form>
      
      </section>
    )
  
}