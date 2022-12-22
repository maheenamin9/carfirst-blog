import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated") || "false"),
    isAdmin: JSON.parse(localStorage.getItem('isAdmin') || "false"),
    token: localStorage.getItem('token'),
}

const authSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        signin(state, action) {
            // console.log(action.payload)
            state.isAuthenticated = true
            localStorage.setItem("isAuthenticated", true)
            state.isAdmin = action.payload.isAdmin
            localStorage.setItem('isAdmin', action.payload.isAdmin)
            localStorage.setItem('token', action.payload.token)
        },
        signout(state) {
            state.isAuthenticated = false
            localStorage.removeItem("isAuthenticated")
            // state.isAuthenticated = false
            localStorage.removeItem('isAdmin')
            localStorage.removeItem('token')
        }
    }
})

const store = configureStore({
    reducer: authSlice.reducer
})

export const authActions = authSlice.actions;
export default store;