import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSortType, filterSelector } from '../redux/filterSlice/filterSlice';
import { TSortType } from '../redux/filterSlice/models';

export const sortProperties: TSortType[] = [
  {id: 1, name: 'популярности(по возрастания)', sortProperty: 'rating',  order: 'asc'},
  {id: 2, name: 'популярности(по убыванию)', sortProperty: 'rating', order: 'desc'},
  {id: 3, name: 'цене(по возрастания)', sortProperty: 'price', order: 'asc'},
  {id: 4, name: 'цене(по убыванию)', sortProperty: 'price', order: 'desc'},
  {id: 5, name: 'алфавиту(по возрастания)', sortProperty: 'title', order: 'asc'},
  {id: 6, name: 'алфавиту(по убыванию)', sortProperty: 'title', order: 'desc'},
];

// Кастумный тип для клика по Document
type DocumentClickType = MouseEvent & {
  path: Node[],
}

export function Sort() {
  const {sortType} = useSelector(filterSelector);
  const activeSortType = sortType;
  const dispatch = useDispatch();
  const sortPopupRef = useRef<HTMLDivElement>(null); // Ссылки на попап
  const [isVisible, setIsVisible] = useState(false); // Отображение попапа

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      const _event = event as DocumentClickType; // Переопределяем тип для event
      if (sortPopupRef.current && !_event.path.includes(sortPopupRef.current)) { // Если клик произошел не по попапу
        setIsVisible(false); // Скрываем попап
      }
    }
    document.addEventListener('click', onDocumentClick); // Вешаем обработчик события на весь документ при монтировании
    return () => document.removeEventListener('click', onDocumentClick); // Снимаем обработчик события при размонтировании
    
  }, [])

  const setActiveSortType = (type: TSortType) => {
    dispatch(setSortType(type));
  }

  const onSortItemClick = (type: TSortType) => {
    setActiveSortType(type);
    setIsVisible(false);
  }
    return (
      <div ref={sortPopupRef} className="sort">
        <div className="sort__label">
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"></path>
          </svg>
          <b>Сортировка по:</b>
          <span onClick={() => setIsVisible(!isVisible)}>{activeSortType.name}</span>
        </div>
        {
          isVisible && (
            <div className='sort__popup'>
              <ul>
                {
                  sortProperties.map((item, index) => 
                    <li 
                      key={index}
                      onClick={() => onSortItemClick(item)} 
                      className={activeSortType.id === item.id ? 'active' : ''}
                    >
                      {item.name}
                    </li>
                  )
                }
              </ul>
            </div>
          )
        }
      </div>
    );
  }