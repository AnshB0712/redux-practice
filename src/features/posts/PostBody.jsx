import { PostAuthor } from './PostAuthor'
import { PostDate } from './PostDate'
import { ReactionButtons } from './ReactionButtons'

import { Link } from 'react-router-dom';

import React from 'react'

let PostBody = ({post}) => {
  return (
  <article>
      
  <h3>{post.title}</h3>
  <p>{`${post.body.substring(0,50)}...`}</p>
      
  <p className="postCredit">
    <Link 
    to={`post/${post.id}`}>
    View Post
    </Link>
    <PostAuthor 
      userId={post.userId} />
    <PostDate 
      timestamp={post.date}/>
  </p>
      
  <ReactionButtons post={post} />
      
  </article>
  )
}

PostBody = React.memo(PostBody)

export default PostBody