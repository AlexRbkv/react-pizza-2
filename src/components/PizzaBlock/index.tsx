import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/cartSlice/cartSlice';
import { productSelector } from '../../redux/productSlice/productsSlice';
import { Link } from 'react-router-dom';
import { TCartItem } from '../../redux/cartSlice/models';

type PizzaBlockProps = {
  imageUrl: string,
  title: string,
  types: number[],
  sizes: number[],
  price: number,
  id: string,
}

const pizzaTypes: string[] = ['тонкое', 'традиционное'];

export const PizzaBlock: React.FC<PizzaBlockProps> = ({ imageUrl, title, types, sizes, price, id }) => {
    const [activePizzaType, setActivePizzaType] = useState(types[0]);
    const [activePizzaSize, setActivePizzaSize] = useState(0);
    const dispatch = useDispatch();
    const addedItem = useSelector(productSelector(id));
  

    const onClickAdd = () => {
     const item: TCartItem = {
      id,
      title,
      price,
      imageUrl,
      type: pizzaTypes[activePizzaType],
      size: sizes[activePizzaSize],
      count: 0,
     };
     dispatch(addItem(item)); 
    }

    return (
        <div className="pizza-block-wrapper">
            <div className="pizza-block">
                <Link to={`/product/${id}`}>
                  <img
                    className="pizza-block__image"
                    src={imageUrl}
                    alt="Pizza"
                  />
                  <h4 className="pizza-block__title">{title}</h4>
                </Link>
                <div className="pizza-block__selector">
                  <ul>
                    {
                      types.map((typeId) => 
                        <li 
                          key={typeId}
                          className={activePizzaType === typeId ? 'active' : ''}
                          onClick={() => setActivePizzaType(typeId)}
                        >
                          {pizzaTypes[typeId]}
                        </li>
                      ) 
                    }
                  </ul>
                  <ul>
                    {
                      sizes.map((size, sizeIndex) => 
                      <li
                        key={sizeIndex} 
                        className={activePizzaSize === sizeIndex ? 'active' : ''}
                        onClick={() => setActivePizzaSize(sizeIndex)}
                      >
                        {size} см.
                      </li>
                    )
                    }
                  </ul>
                </div>
                <div className="pizza-block__bottom">
                  <div className="pizza-block__price">от {price} ₽</div>
                  <button onClick={() => onClickAdd()} className="button button--outline button--add">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                        fill="white"></path>
                    </svg>
                    <span>Добавить</span>
                    {addedItem && <i>{addedItem.count}</i>}
                  </button>
                </div>
            </div>
        </div>
    );
}