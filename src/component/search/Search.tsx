import React, { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {setSearchValue} from '../../redux/slices/filterSlice'
import debounce from 'lodash.debounce';
import s from './Search.module.scss'


const Search: React.FC = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)
    const onClickClear = () => {
        setValue('')
        dispatch(setSearchValue(''))
        inputRef.current?.focus()
    }
    const debonceValueInput = useCallback(
        debounce((str) => {
            dispatch(setSearchValue(str))
        }, 500), []
    )

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
        debonceValueInput(event.target.value)
    }

    return (
        <div className={s.root}>
            <svg className={s.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>Search</title><path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/><path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M338.29 338.29L448 448"/></svg>
            <input 
            ref={inputRef}
            value={value}
            onChange={onChangeInput}
            className={s.input} 
            placeholder='Поиск пиццы...'/>
            {value &&
               <svg onClick={onClickClear} className={s.closeIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>Close</title><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M368 368L144 144M368 144L144 368"/></svg>
            }
        </div>
        
    );
};

export default Search;