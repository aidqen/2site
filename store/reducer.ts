import { configureStore } from '@reduxjs/toolkit';

export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY'
export const SET_CATEGORY_LESSONS = 'SET_CATEGORY_LESSONS'
export const SET_NEW_CATEGORY_LESSON = 'SET_NEW_CATEGORY_LESSON'

const initialState = {
    user: null,
    selectedCategory: null,
    categoryLessons: [],
    selectedSection: ''
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
        case SET_NEW_CATEGORY_LESSON:
            {
                return { ...state, categoryLessons: state.categoryLessons.length > 0 ? [...state.categoryLessons, action.lesson] : [action.lesson]}
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