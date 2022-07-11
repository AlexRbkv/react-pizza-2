import React, { useState, useRef, useCallback } from 'react';
import styles from './Search.module.scss';
import debounce from 'lodash.debounce';
import { setSearchValue } from '../../redux/filterSlice/filterSlice';
import { useDispatch } from 'react-redux';

import CloseIcon from '../../assets/img/close.svg';

export const Search: React.FC = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const onClearClick = () => {
        dispatch(setSearchValue(''));
        setSearchValue('');
        setInputValue('');
        inputRef.current?.focus(); // Оператор опциональной последовательности
    }

    const testDebounce = useCallback(debounce((value: string) => dispatch(setSearchValue(value)), 1000), []);

    const onChangeInput = (value: string) => {
        setInputValue(value);
        testDebounce(value);
    }

    return (
        <div className={styles.searchWrap}>
            <svg
                className={styles.searchIcon}
                enableBackground="new 0 0 32 32"
                id="EditableLine"
                version="1.1"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg">
                <circle
                cx="14"
                cy="14"
                fill="none"
                id="XMLID_42_"
                r="9"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="2"></circle>
                <line
                fill="none"
                id="XMLID_44_"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="2"
                x1="27"
                x2="20.366"
                y1="27"
                y2="20.366"></line>
            </svg>
            <input
                ref={inputRef} 
                value={inputValue}
                onChange={(e) => onChangeInput(e.target.value)}
                className={styles.searchInput} 
                placeholder="Поиск"
            />
            {inputValue && <img 
                                src={CloseIcon} 
                                className={styles.searchClose} 
                                onClick={() => onClearClick()} 
                                alt="close button"
                            />
            }
        </div>
    );
};
