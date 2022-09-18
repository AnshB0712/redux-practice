import { PostAuthor } from './PostAuthor'
import { PostDate } from './PostDate'
import { ReactionButtons } from './ReactionButtons'

export const PostBody = ({post}) => {
  return (
  <article>
      
  <h3>{post.title}</h3>
  <p>{post.body}</p>
      
  <p className="postCredit">
    <PostAuthor 
      userId={post.userId} />
    <PostDate 
      timestamp={post.date}/>
  </p>
      
  <ReactionButtons post={post} />
      
  </article>
  )
}
