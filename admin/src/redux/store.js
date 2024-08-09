import { configureStore } from '@reduxjs/toolkit'
import categories from './reducers/categorySlice'
import products from './reducers/productSlice'
import admins from './reducers/adminSlice'
import teams from './reducers/teamSlice'
import approvals from './reducers/approvalSlice'
import allProducts from './reducers/allProductSlice'
import securityCode from './reducers/securitySlice'
import content from './reducers/contentSlice'

export const store = configureStore({
  reducer: {
    getCategories:categories,
    getProducts:products,
    allAdmins:admins,
    myTeams:teams,
    productsApprovals:approvals,
    allProducts:allProducts,
    security:securityCode,
    content:content
  }
})