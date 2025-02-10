import {createSlice} from '@reduxjs/toolkit';
import { theme } from 'flowbite-react';

const initialState={
    theme:'Light',
};

const themeSlice=createSlice({
    name:'theme',
    initialState,
    reducers:{
        toggleTheme:(state)=>{
            state.theme=state.theme==='Light'?'Dark':'Light';
        },
    },
});

export const {toggleTheme}=themeSlice.actions;

export default themeSlice.reducer;