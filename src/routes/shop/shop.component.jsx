import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Routes, Route} from 'react-router-dom';

import { fetchCategoriesAsync } from '../../store/categories/category.action';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

const Shop = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchCategoriesAsync())
    }, []);
    
    return(
        <Routes>
            <Route index element = {<CategoriesPreview/>} />
            <Route path = ":category" element = {<Category/>} />
        </Routes>
    )
}

export default Shop;