import React, { memo } from 'react';


type CategoriesProps = {
  value: number
  onClickCategory: (i: number) => void
}

const Categories: React.FC<CategoriesProps> = memo(({value, onClickCategory}) => {
  const categories = [
    'Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Остырые', 'Закрытые'
  ]
    return (
        <div className="categories">
              <ul>
              {categories.map((categoryName, i) => <li key={i} onClick={() => onClickCategory(i)} className={value === i ? 'active': ''}>{categoryName}</li>)}
              </ul>
            </div>
    );
});

export default Categories;