import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Categories, Sort, PizzaBlock, Skeleton, Pagination } from '../components';

import qs from 'qs';

import { sortProperties } from '../components/Sort';
import { setFilters, filterSelector } from '../redux/filterSlice/filterSlice';
import { fetchProducts, productsDataSelector } from '../redux/productSlice/productsSlice';
import { useAppDispatch } from '../redux/store';
 
const Home: React.FC = () => {
  const isSearch = useRef(false);
  const isMounted = useRef(false); // Был ли первый рендер
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { products, status } = useSelector(productsDataSelector);
  const { categoryId, sortType, currentPage, searchValue }  = useSelector(filterSelector); // Достаём данные из редакса

  // Получаем список пицц с бэка
  const getProducts = async () => {
    dispatch(fetchProducts({
      currentPage,
      categoryId,
      sortType,
      searchValue,
    }));
  }

  // Парсим параметры фильтра из url
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortProperties.find((item) => item.sortProperty === params.sortBy && item.order === params.order); // Ищим по id нужный порядок сортировки
      const sortType = sort ? sort : sortProperties[0];
      dispatch(setFilters({category: String(params.category), page: String(params.page), sortType })); // Устанавливаем параметры сортировки
      isSearch.current = true; // Пришли параметры из url
    }
  }, []);

  // Пропускаем первый рендер
  useEffect(() => {
    if(!isSearch.current) { // Ждем параметры из url
      getProducts();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

 

  // Устанавливаем в url строку с параметрами сортировки, если это не первый рендер и параметры изменились
  useEffect(() => {
    if(isMounted.current) {
      const qstr = qs.stringify({
        page: currentPage,
        limit: 4,
        category: categoryId,
        sortBy: sortType.sortProperty,
        order: sortType.order,
      });
      navigate(`?${qstr}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage])

  return (
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {
          status === 'error'
            ? <div className='content__error-info'>
                <h1>Возникла ошибка</h1>
                <p>К сожалени, не удалось загрузить товары</p>
              </div>
            :
            <div className="content__items">
            {status === 'loading'
              ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
              : products.filter((item: any) => item.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())).map((item: any) => <PizzaBlock key={item.id} {...item} />)
            }
          </div>
        }
        <Pagination />
      </div>
  );
};

export default Home;