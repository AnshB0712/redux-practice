import { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'

import { selectAllPosts } from './postsSlice'
import { postsStatus } from './postsSlice'
import { postsError } from './postsSlice'
import { fetchPosts } from './postsSlice'

import PostBody from './PostBody'

export const PostsList = () => {
  
  const dispatch = useDispatch()
  
  const posts = useSelector(selectAllPosts)
  const error = useSelector(postsError)
  const status = useSelector(postsStatus)
  
  useEffect(() => {
    if(status==='idle')
    dispatch(fetchPosts())
  },[status,dispatch])
  
  let content;
  
  if(status==='loading')
  content = <p>Loading...</p>
  if(status==='rejected')
  content = <p>{error}</p>
  
  if(status==='success'){
    
  const latestPostFirst = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  content = latestPostFirst.map(post => {
    return (
      <PostBody 
      key={post.id} 
      post={post}
      />
      )}
    )
  }
  
  return (
    <section>
    {content}
    </section>
    )
}