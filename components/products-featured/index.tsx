import ProductsCarousel from './carousel';
import { server } from 'utils/server';
import { useEffect, useState } from 'react';
import { ProductTypeList } from 'types';

const ProductsFeatured = () => {
  const [products, setProducts] = useState<ProductTypeList[]>([])
  
  useEffect(() => {
      (async () => {
        console.log('http://localhost:3000/products')
        const response = await fetch(`${server}/products`);
        const content = await response.json();
        console.log(content)
        setProducts(content)
      })()
  }, [])

  return (
    <section className="section section-products-featured">
      <div className="container">
        <header className="section-products-featured__header">
          <h3>Selected just for you</h3>
          <a href="/products" className="btn btn--rounded btn--border">Show All</a>
        </header>

        <ProductsCarousel products={products} />
      </div>
    </section>
  )
};

export default ProductsFeatured