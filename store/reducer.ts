import { configureStore } from '@reduxjs/toolkit';

export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY'
export const SET_CATEGORY_LESSONS = 'SET_CATEGORY_LESSONS'
export const SET_NEW_CATEGORY_LESSON = 'SET_NEW_CATEGORY_LESSON'
export const UPDATE_LESSON_CATEGORIES = 'UPDATE_LESSON_CATEGORIES'
export const ADD_NEW_CATEGORY_LESSON = 'ADD_NEW_CATEGORY_LESSON'

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
        case ADD_NEW_CATEGORY_LESSON:
            {
                return { ...state, categoryLessons: [...state.categoryLessons, action.lesson] }
            }
        case UPDATE_LESSON_CATEGORIES:
            {
                const updatedLessons = state.categoryLessons.map((lesson: any) =>
                    lesson.id === action.lessonData.id ? { ...lesson, ...action.lessonData } : lesson
                );
                return { ...state, categoryLessons: updatedLessons }
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