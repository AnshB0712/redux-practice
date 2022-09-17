import { useSelector } from 'react-redux'
import { selectAllPosts } from './postsSlice'

import { PostAuthor } from './PostAuthor'
import { PostDate } from './PostDate'
import { ReactionButtons } from './ReactionButtons'

export const PostsList = () => {
  
  const posts = useSelector(selectAllPosts)
  
  const latestPostFirst = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  const renderPosts = latestPostFirst.map((post) => {
    return (
      <article key={post.id}>
      
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      
      <p className="postCredit">
      <PostAuthor 
      userId={post.userId} />
      <PostDate 
      timestamp={post.date}/>
      </p>
      
      <ReactionButtons post={post} />
      
      </article>
      )
  })
  
  return (
    <section>
    <h3>Posts</h3>
    {renderPosts}
    </section>
    )
}