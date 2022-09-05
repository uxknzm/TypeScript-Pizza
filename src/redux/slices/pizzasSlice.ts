import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"

type PizzaItems = {
    category: number
    id: number
    imageUrl: string
    price: number
    rating: number
    sizes: number[]
    title: string
    types: number[]
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface PizzaSliceState {
    items: PizzaItems[]
    count: number[]
    status: Status
}
export type SearchPizzaParams = {
    category: string
    sortBy: string
    order: string
    search: string
    currentPage: number
}
export const fetchPizzas = createAsyncThunk<PizzaSliceState, SearchPizzaParams>(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const {
            category,
            sortBy,
            order,
            search,
            currentPage,
        } = params
        const { data } = await axios.get(`https://62f40707b81dba4a014108b1.mockapi.io/items?page=${currentPage}&limit=5&${category}&sortBy=${sortBy}&order=${order}${search}`)
        return data
    }
)

const initialState: PizzaSliceState = {
    items: [],
    count: [],
    status: Status.LOADING,
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        },
        setCount(state, action) {
            state.count = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING
            state.items = []
            state.count = []
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload.items
            state.count = action.payload.count
            state.status = Status.SUCCESS
        })
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR
            state.items = []
            state.count = []
        })
    },
})

export const selectPizza = (state: RootState) => state.pizza

export const { setItems, setCount } = pizzaSlice.actions

export default pizzaSlice.reducer