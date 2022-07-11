import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categoryIdSelector, setCategoryId } from '../redux/filterSlice/filterSlice';

const categories: string[] = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export const Categories: React.FC = React.memo(() => {
    const activeCategoryId: number = useSelector(categoryIdSelector);
    const dispatch = useDispatch();

    const setActiveCategoryId = (id: number) => {
      dispatch(setCategoryId(id));
    };

    return (
      <div className="categories">
        <ul>
          {
          	categories.map((category, index) => 
              <li 
                key={index} 
                onClick={() => setActiveCategoryId(index)} 
                className={activeCategoryId === index ? 'active' : ''}
              >
                {category}
              </li>
            )
        	}
        </ul>
      </div>
    );
  });