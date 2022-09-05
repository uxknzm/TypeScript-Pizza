import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

export enum sortPropertyEnum {
    RATING_DESC = 'rating',
    RATING_ASC = '-rating',
    PRICE_DESC = 'price',
    PRICE_ASC = '-price',
    TITLE_DESC = 'title',
    TITLE_ASC = '-title',
}

export type SortType = {
    name: string
    sortProperty: sortPropertyEnum
}

export interface FilterSliceState {
    categoryId: number
    searchValue: string
    currentPage: number
    sort: SortType
}

const initialState: FilterSliceState = {
    categoryId: 0,
    searchValue: '',
    currentPage: 1,
    sort: {
        name: 'популярности (DESC)',
        sortProperty: sortPropertyEnum.RATING_DESC,
    }
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        },
        setSortType(state, action: PayloadAction<SortType>) {
            state.sort = action.payload
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            state.currentPage = Number(action.payload.currentPage)
            state.categoryId = Number(action.payload.categoryId)
            state.sort = action.payload.sort
        }
    }
})

export const selectSort = (state: RootState) => state.filter.sort

export const selectFilter = (state: RootState) => state.filter

export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer