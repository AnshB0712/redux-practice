import { useSelector } from 'react-redux'
import { selectPostById } from './postsSlice'

import {PostAuthor} from "./PostAuthor";
import {ReactionButtons} from "./ReactionButtons";
import {PostDate} from "./PostDate";

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const SinglePostPage = () => {
    const { postId } = useParams()
    
    const post = useSelector((state) => selectPostById(state, postId))

    if (!post) {
      return (
        <section>
          <h2>Post not found!</h2>
        </section>
        )
    }

    return (
    <article>
     <h2>{post.title}</h2>
     <p>{post.body}</p>
     <p className="postCredit">
      <Link 
      to={`/post/edit/${post.id}`}>
      Edit Post</Link>
      <PostAuthor
      userId={post.userId} />
      <PostDate
      timestamp={post.date} />
     </p>
     <ReactionButtons post={post} />
    </article>
    )
}

