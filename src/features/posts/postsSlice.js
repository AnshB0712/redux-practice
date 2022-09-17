import { createSlice,nanoid } from '@reduxjs/toolkit'

const initialState = [
    {
        id: '1',
        title: 'Learning Redux Toolkit',
        content: "I've heard good things.",
        date: new Date().toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    },
    {
        id: '2',
        title: 'Slices...',
        content: "The more I say slice, the more I want pizza.",
        date: new Date().toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    }
]

export const postsSlice = createSlice
({
  name: "posts",
  initialState,
  reducers:{
    addPost: {
      reducer: (state,action)=>{
        state.push(action.payload)
      },
      prepare:(title,content,userId)=>{
        return {
          payload:{
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
          }
        }
      }
    },
    addReactionOnPost: (state,action) => {
      const {postId,reaction} = action.payload
      const targetPost = state.find(post => post.id===postId)
      
      if(!targetPost) return
      
      targetPost.reactions[reaction]++
    }
    }
})

export const selectAllPosts = (state) => state.posts

export const { addPost,addReactionOnPost } = postsSlice.actions

export default postsSlice.reducer