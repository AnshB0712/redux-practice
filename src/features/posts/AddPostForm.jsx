import {useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'

import { selectAllUsers } from '../users/usersSlice'
import { addPost } from './postsSlice'

export const AddPostForm = () => {
  
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  
  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)
  
  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)
  const onAuthorChanged = e => setUserId(e.target.value)
  
  const onSaveChanged = (e) => {
    e.preventDefault()
    
    if(!title && !content)
    return
    
    dispatch(addPost(title,content,userId))
    
    setTitle('')
    setContent('')
    
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
  
  const canSave = Boolean(title) && Boolean(content) && Boolean(userId)
  
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
        Save Post
      </button>
      </form>
      
      </section>
    )
  
}