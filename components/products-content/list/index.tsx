import ProductItem from '../../product-item';
import ProductsLoading from './loading';
import { ProductTypeList } from 'types';


type ProductsPropsType = {
  products?: Array<ProductTypeList>;
}

const ProductsContent = ({products}: ProductsPropsType) => {

  return (
    <>
      {!products && 
        <ProductsLoading />
      }

      {products &&
        <section className="products-list">
          {products.map((item: ProductTypeList)  => (
            <ProductItem 
              id={item.id} 
              name={item.name}
              price={item.price}
              color={item.color}
              currentPrice={item.currentPrice}
              key={item.id}
              images={item.images}
              rating={item.rating}
            />
          ))}
        </section>
      }
    </>
  );
};
  
export default ProductsContent