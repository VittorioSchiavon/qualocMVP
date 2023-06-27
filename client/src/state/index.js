import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    token: null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) =>{
            console.log("logged in")
            state.user = action.payload.user
            state.token = action.payload.token
        },
        setLogout: (state) => {
            console.log("logged out")
            state.user = null
            state.token = null
        },
        setIsOwner: (state) =>{
            state.user.isOwner = true
        },
        setLastAccess: (state) =>{
            state.user.lastAccess = new Date()
        },

    }
})

export const {setLogin, setLogout, setIsOwner, setLastAccess} =authSlice.actions
export default authSlice.reducer