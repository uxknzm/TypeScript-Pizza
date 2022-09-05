import { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectFilter, setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import Sort from '../component/sort/Sort'
import Pizza from '../component/content/Pizza'
import { Skeleton } from '../component/content/Skeleton'
import Categories from '../component/categories/Categories';
import Pagination from '../component/pagination/Pagination';
import { fetchPizzas, selectPizza } from '../redux/slices/pizzasSlice';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
    const dispatch = useAppDispatch()
    const isSearch = useRef(false)
    const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter)
    const { items, count, status } = useSelector(selectPizza)

    const onClickCategory = useCallback((idx: number) => {
        dispatch(setCategoryId(idx))
    }, [])
    const onPageCurrent = (page: number) => {
        dispatch(setCurrentPage(page))
    }

    // Если был первый рендер проверяем URL и сохраняем в редаксе
    // useEffect(() => {
    //     if (window.location.search) {
    //         const params = (qs.parse(window.location.search.substring(1)) as unknown) as SearchPizzaParams
    //         const sort = massSort.find(obj => obj.sortProperty === params.sortBy)
    //         dispatch(setFilters({
    //             searchValue: params.search,
    //             categoryId: Number(params.category),
    //             currentPage: params.currentPage,
    //             sort: sort ? sort : massSort[0]
    //         }))
    //     }
    //     isSearch.current = true
    // }, [])



    // Если были первые параметры
    // useEffect(() => {
    //     if (isMounted.current) {
    //         const queryString = qs.stringify({
    //             sortProperty: sort.sortProperty,
    //             categoryId,
    //             currentPage
    //         })
    //         navigate(`?${queryString}`)
    //     }
    //     isMounted.current = true
    // }, [categoryId, sort.sortProperty, currentPage])
    const getPizzas = async () => {
        const category = searchValue ? '' : categoryId > 0 ? `category=${categoryId}` : ''
        const sortBy = sort.sortProperty.replace('-', '')
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const search = searchValue ? `&search=${searchValue}` : ''
        dispatch(
            fetchPizzas({
                category,
                sortBy,
                order,
                search,
                currentPage
            }))
        window.scrollTo(0, 0)
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        if (!isSearch.current) {
            getPizzas()
        }
        isSearch.current = false
    }, [categoryId, sort.sortProperty, searchValue, currentPage])
    const pizzas =
        items.map((pizza: any) => <Pizza {...pizza} key={pizza.id} />)
    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={onClickCategory} />
                <Sort value={sort} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error' ? (
                <div>
                    <h1>ERROR</h1>
                </div>
            ) : (
                <div className="content__items">
                    {
                        status === 'loading' ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
                            : pizzas
                    }
                </div>
            )}
            <Pagination count={count} onPageChange={onPageCurrent} />
        </div>
    );
};

export default Home;