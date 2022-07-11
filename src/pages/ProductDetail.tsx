import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface IProductDetail {
    title: string,
    price: number,
    imageUrl: string,
}

const initialState = {
    title: '',
    price: 0,
    imageUrl: '',
}

const ProductDetail: React.FC = () => {
    const {id} = useParams();
    const [product, setProduct] = useState<IProductDetail>(initialState);
    const navigate = useNavigate();
    
    useEffect(() => {
        async function fetchProductById() {
            try{
                const { data } = await axios.get(`https://628f89a90e69410599de5a10.mockapi.io/items/${id}`);
                setProduct(data);
            } catch (error) {
                alert(`Произошла ошибка ${error}`);
                navigate('/');
            }
        }
        fetchProductById();
    }, []);

    if (!product) {
        return <p>Загрузка...</p>
    }

    return (
        <div className='product-detail__content'>
            <p className='product-detail__title'>{product.title}</p>
            <p className='product-detail__price'>Цена: {product.price}₽</p>
            <img className='product-detail__image' src={product.imageUrl} alt="product"/>
        </div>
    );
};

export default ProductDetail;