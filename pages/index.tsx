import Layout from '../layouts/Main';
import Footer from '../components/footer';
import ProductsFilter from '../components/products-filter';
import ProductsContent from '../components/products-content';
import { useEffect, useState } from 'react';
import { FilterData, ProductTypeList } from 'types';
import { server } from 'utils/server';

const Products = () => {
  const [products, setProducts] = useState<ProductTypeList[]>([])
  const [filterData, setFilterData] = useState<FilterData>({
    sizes: [],
    colors: [],
    maxPrice: 200,
    minPrice: 0,
    maxRating: 5,
    minRating: 0,
    sortValue: 'rating'
  })
  const [nameFilter, setNameFilter] = useState<string>('')
  const [sortValue, setSortValue] = useState<string>('rating')

  useEffect(() => {
    (async () => {
      let queryParamsString = '?'
      if (nameFilter) {
        queryParamsString += `name=${nameFilter}&`
      }
      if (filterData.minPrice) {
        queryParamsString += `currentPrice_gte=${filterData.minPrice}&`
      }
      if (filterData.maxPrice) {
        queryParamsString += `currentPrice_lte=${filterData.maxPrice}&`
      }
      if (filterData.minRating) {
        queryParamsString += `rating_gte=${filterData.minRating}&`
      }
      if (filterData.maxRating) {
        queryParamsString += `rating_lte=${filterData.maxRating}&`
      }
      for (let i = 0; i < filterData.sizes.length; i++) {
        queryParamsString += `sizes[${i}]=${filterData.sizes[i]}&`
      }
      if (sortValue === 'rating') {
        queryParamsString += `_sort=rating&_order=desc&`
      }
      if (sortValue === 'cheap') {
        queryParamsString += `_sort=currentPrice&_order=asc&`
      }
      if (sortValue === 'expensive') {
        queryParamsString += `_sort=currentPrice&_order=desc&`
      }
      const response = await fetch(`${server}/products${queryParamsString}`);
      const content = await response.json();
      setProducts(content)
    })()
  }, [filterData, sortValue, nameFilter])

  return (
    <Layout>
      <section className="products-page">
        <div className="container">
          <ProductsFilter setFilterData={setFilterData}
            filterData={filterData} />
          <ProductsContent products={products}
            nameFilter={nameFilter}
            setNameFilter={setNameFilter}
            sortValue={sortValue}
            setSortValue={setSortValue} />
        </div>
      </section>
      <Footer />
    </Layout>
  )
}

export default Products
