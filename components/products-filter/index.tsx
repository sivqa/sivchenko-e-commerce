import { useState } from 'react';
import Checkbox from './form-builder/checkbox';
import Slider from 'rc-slider';

import productsSizes from './../../utils/data/products-sizes';
import { FilterData } from 'types';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

type FilterPropsType = {
  setFilterData: any;
  filterData: FilterData;
}

const ProductsFilter = ({ setFilterData, filterData }: FilterPropsType) => {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <form className="products-filter">
      <button type="button"
        onClick={() => setFiltersOpen(!filtersOpen)}
        className={`products-filter__menu-btn ${filtersOpen ? 'products-filter__menu-btn--active' : ''}`}>
        Add Filter <i className="icon-down-open"></i>
      </button>

      <div className={`products-filter__wrapper ${filtersOpen ? 'products-filter__wrapper--open' : ''}`}>

        <div className="products-filter__block">
          <button type="button">Rating</button>
          <div className="products-filter__block__content">
            <Range min={0} max={5}
              value={[filterData?.minRating, filterData?.maxRating]}
              onChange={(e) => {
                setFilterData({ ...filterData, minRating: e[0], maxRating: e[1] })
              }}
              tipFormatter={value => `${value}`} />
          </div>
        </div>

        <div className="products-filter__block">
          <button type="button">Price</button>
          <div className="products-filter__block__content">
            <Range min={0} max={200}
              value={[filterData?.minPrice, filterData?.maxPrice]}
              onChange={(e) => {
                setFilterData({ ...filterData, minPrice: e[0], maxPrice: e[1] })
              }} tipFormatter={value => `${value}$`} />
          </div>
        </div>

        <div className="products-filter__block">
          <button type="button">Size</button>
          <div className="products-filter__block__content checkbox-square-wrapper">
            {productsSizes.map(type => (
              <Checkbox
                type="square"
                key={type.id}
                name="product-size"
                label={type.label}
                checked={filterData.sizes.includes(type.label.toLowerCase())}
                onChange={(e) => {
                  console.log(filterData)
                  if (e.target.checked)
                    setFilterData({ ...filterData, sizes: [...filterData.sizes, type.label.toLowerCase()] })
                  else

                    setFilterData({ ...filterData, sizes: [...filterData.sizes].filter(x => x !== type.label.toLowerCase()) })
                }} />
            ))}
          </div>
        </div>
      </div>
    </form>
  )
}

export default ProductsFilter
