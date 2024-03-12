import { createSlice } from "@reduxjs/toolkit";

/**
 * 
 * Nueva forma del userReducer con Redux
 */

export const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: '',
    onAdmin: false
};

const initialErrors = {
    username: '',
    password: '',
    email: ''
};

export const usersSlice = createSlice({

    name: 'users',

    initialState: {
        users: [],
        userSelected: initialUserForm,
        visibleForm: false,
        errors: initialErrors
    },

    reducers: {

        addUser: (state, action) => {
            state.users = [
                ...state.users,
                {
                    ...action.payload
                }
            ];
            state.userSelected = initialUserForm;
            state.visibleForm = false;
        },

        removeUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        },

        updateUser: (state, action) => {

            state.users = state.users.map( u => {
                if (u.id == action.payload.id) return {
                    ...action.payload
                };
                return u;
            });

            state.userSelected = initialUserForm;
            state.visibleForm = false;
        },

        loadingUsers: (state, action) => {
            state.users = action.payload
        },

        onUserSelectedForm: (state, action) => {
            state.userSelected = action.payload;
            state.visibleForm = true;
        },

        onOpenForm: (state) => { state.visibleForm = true },

        onCloseForm: (state) => {
            state.visibleForm = false;
            state.userSelected = initialUserForm;
        },

        onError: (state, action) => { state.errors = action.payload }
    }

});

export const {
    addUser,
    loadingUsers,
    removeUser,
    updateUser,
    onUserSelectedForm,
    onOpenForm,
    onCloseForm,
    onError
} = usersSlice.actions;