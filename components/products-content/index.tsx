import { useState } from 'react';
import { ProductTypeList } from 'types';
import List from './list';

type ProductsPropsType = {
  products?: Array<ProductTypeList>;
  sortValue: string;
  setSortValue: any;
  nameFilter: string;
  setNameFilter: any;
}

const ProductsContent = ({ products, sortValue, setSortValue, nameFilter, setNameFilter }: ProductsPropsType) => {
  const [orderProductsOpen, setOrderProductsOpen] = useState(false);

  return (
    <section className="products-content">
      <div className="products-content__intro">
        <h2>Men's Tops</h2>
        <div className='search__block'>
          <input type="text" className="search" placeholder="Search by full name" value={nameFilter}
            onChange={(e) => {
              setNameFilter(e.target.value)
            }} />
        </div>
        <button type="button" onClick={() => setOrderProductsOpen(!orderProductsOpen)} className="products-filter-btn"><i className="icon-filters"></i></button>
        <form className={`products-content__filter ${orderProductsOpen ? 'products-order-open' : ''}`}>
          <div className="products__filter__select">
            <h4>Show first: </h4>
            <div className="select-wrapper">
              <select onChange={e => {
                setSortValue(e.target.value)
              }}
                value={sortValue}>
                <option value='rating'>With hightest rating</option>
                <option value='cheap'>Cheapest</option>
                <option value='expensive'>Most expensive</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      <List products={products} />
    </section>
  );
};

export default ProductsContent
