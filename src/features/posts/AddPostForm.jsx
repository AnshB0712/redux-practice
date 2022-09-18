import {useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'

import { asyncAddPost } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'
import { addPost } from './postsSlice'

export const AddPostForm = () => {
  
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  
  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)
  
  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)
  const onAuthorChanged = e => setUserId(e.target.value)
  
  const canSave = Boolean(title) && Boolean(content) && addRequestStatus === 'idle'
  
  const onSaveChanged = async (e) => {
    e.preventDefault()
    
    try {
      setAddRequestStatus('pending')
      
      await dispatch(asyncAddPost({
      title,
      body:content,
      userId
    })).unwrap()
    } catch (e) {
      console.error(e.message)
    }
    finally{
      setAddRequestStatus('idle')
    }
    
    setTitle('')
    setContent('')
    setUserId('')
  }
  
  const usersOptions = users.map(user => {
    return(
    <option 
    key={user.id} 
    value={user.id}>
    {user.name}
    </option>
      )
  })
  
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
      htmlFor="postAuthor">
      Author:
      </label>
      <select 
      id="postAuthor" 
      value={userId} 
      onChange={onAuthorChanged}
      >
      <option value=""></option>
      {usersOptions}
      </select>
      
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
      'Save Post' 
      }
      </button>
      </form>
      
      </section>
    )
  
}