import { 
  createSlice,
  nanoid,
  createAsyncThunk
} from '@reduxjs/toolkit'
import axios from 'axios'
import {sleep} from '../../utils/sleep'

const POST_URI = "https://jsonplaceholder.typicode.com/posts"

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
  const { data } = await axios.get(POST_URI)
  const updatedData = data.map(post => ({...post,id:nanoid()}))
  return updatedData
})

export const asyncAddPost = createAsyncThunk(
  'posts/addPost',
  async (data) => {
  const response = await axios.post(POST_URI,data)
  return response.data
})

export const asyncEditPost = createAsyncThunk('posts/editPost',async(data) => {
  await sleep(1000)
  return data
})

export const asyncDeletePost = createAsyncThunk('posts/deletePost',async(id) => {
  await sleep(1000)
  return id
})

export const postsSlice = createSlice
({
  name: "posts",
  initialState,
  reducers:{
    addPost: {
      reducer: (state,action)=>{
        state.posts.push(action.payload)
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
            coffee: 0,
        }
          }
        }
      }
    },
    addReactionOnPost: (state,action) => {
      const {postId,reaction} = action.payload
      const targetPost = state.posts.find(post => post.id===postId)
      
      if(!targetPost) return
      
      targetPost.reactions[reaction]++
    }
    },
  extraReducers: (builder) => {
    builder
    .addCase(fetchPosts.pending,(state,actions) => {
      state.status = 'loading'
    })
    
    .addCase(fetchPosts.fulfilled,(state,action) => {
      state.status = "success";
      const loadedPosts = action.payload.map(post => {
        post.date = new Date().toISOString()
        post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
        
        return post
      })
      state.posts = state.posts.concat(loadedPosts)
    })
    
    .addCase(fetchPosts.rejected,(state,action) => {
      state.status = 'rejected'
      state.error = action.error.message
    })
    
    .addCase(asyncAddPost.fulfilled,(state,action) => {
      action.payload.id = nanoid()
      action.payload.userId = Number(action.payload.userId)
      action.payload.date = new Date().toISOString()
      action.payload.reactions={
        thumbsUp: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0,
      }
      
      state.posts.push(action.payload)
    })
    
    .addCase(asyncEditPost.fulfilled,(state,action) => {
      action.payload.date = new Date().toISOString()
      action.payload.reactions={
        thumbsUp: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0,
      }
      const otherPosts = state.posts.filter(post => post.id !== action.payload.id)
      state.posts = [...otherPosts,action.payload]
    })
    
    .addCase(asyncDeletePost.fulfilled,(state,action) => {
      const otherPosts = state.posts.filter(post => post.id !== action.payload.id)
      state.posts = otherPosts
    })
  }
})

export const selectAllPosts = (state) => state.posts.posts
export const selectPostById = (state,postId) => state.posts.posts.find(post => post.id === postId)

export const postsStatus = (state) => state.posts.status
export const postsError = (state) => state.posts.error


export const { addPost,addReactionOnPost } = postsSlice.actions

export default postsSlice.reducer