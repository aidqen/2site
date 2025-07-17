import { configureStore } from '@reduxjs/toolkit';

export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY'
export const SET_CATEGORY_LESSONS = 'SET_CATEGORY_LESSONS'

const initialState = {
    user: null,
    selectedCategory: null,
    categoryLessons: null
}

function reducer(state = initialState, action: any) {
    switch (action.type) {
        case SET_SELECTED_CATEGORY:
            {
                console.log('hi');
                
                return { ...state, selectedCategory: action.category }
            }
        case SET_CATEGORY_LESSONS:
            {
                return { ...state, categoryLessons: action.lessons }
            }
        default:
            return state;
    }
}

const store = configureStore({
    reducer: reducer,
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;