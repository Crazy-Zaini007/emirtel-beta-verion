import { configureStore } from '@reduxjs/toolkit'
import categories from './reducers/categorySlice'
import products from './reducers/productSlice'
import userProfile from './reducers/userSlice'
import content from './reducers/contentSlice'
export const store = configureStore({
  reducer: {
    allCategories:categories,
    products:products,
    userProfile:userProfile,
    content:content
  }
})