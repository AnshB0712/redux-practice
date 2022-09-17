import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    { id: '0', name: 'Dude Lebow' },
    { id: '1', name: 'Neil Young' },
    { id: '2', name: 'Dave Gray' }
]

const userSlice = createSlice({
  name:'users',
  initialState,
  reducers: {}
})

export const selectAllUsers = (state) => state.users

export const {} = userSlice.actions

export default userSlice.reducer