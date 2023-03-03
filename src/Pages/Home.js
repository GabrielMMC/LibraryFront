import React from 'react'
import Container from './Container'
import ProductCard from './ProductCard'
import product1 from '../img/product-img/product1.jpg'
import product2 from '../img/product-img/product2.jpg'
import product3 from '../img/product-img/product3.jpg'
import product4 from '../img/product-img/product4.jpg'
import product5 from '../img/product-img/product5.jpg'
import product6 from '../img/product-img/product6.jpg'
import product7 from '../img/product-img/product7.jpg'
import product8 from '../img/product-img/product8.jpg'
import product9 from '../img/product-img/product9.jpg'
import product10 from '../img/product-img/product10.jpg'
import product11 from '../img/product-img/product11.jpg'
import product12 from '../img/product-img/product12.jpg'

const Home = () => {
 const images = [product1, product2, product3, product4, product5, product6, product7, product8, product8, product9, product10, product11, product12]

 return (
  <Container>
   <div className="row bg-light mt-5">
    <div className="container m-auto">
     <div className="d-flex flex-wrap justify-content-center">
      {images.map(item => (
       <div className="m-3" key={item}>
        <ProductCard image={item} />
       </div>
      ))}
     </div>
    </div>
   </div>
  </Container>
 )
}

export default Home