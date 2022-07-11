import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import MainLayout from './layouts/MainLayout';

const Cart = React.lazy(/*webpackChunkName: "Cart" */ () => import('./pages/Cart'));
const ProductDetail = React.lazy(/* webpackChunkName: "ProductDetail" */ () => import('./pages/ProductDetail'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={
          <Suspense fallback={<p>Загрузка странцы...</p>}>
            <ProductDetail />
          </Suspense>
        } />
        <Route path="/cart" element={
          <Suspense fallback={<p>Загрузка корзины...</p>}>
            <Cart />
          </Suspense>  
        } />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
