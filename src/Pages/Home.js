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
import product13 from '../img/product-img/product13.jpg'
import product14 from '../img/product-img/product14.jpg'
import product15 from '../img/product-img/product15.jpg'
import product16 from '../img/product-img/product16.jpg'
import product17 from '../img/product-img/product17.jpg'
import product18 from '../img/product-img/product18.jpg'
import product19 from '../img/product-img/product19.jpg'
import { GET } from '../utils/requests'

const Home = () => {
  const [books, setBooks] = React.useState([])

  React.useEffect(() => {
    const getData = async () => {
      const response = await GET({ url: 'books' })
      setBooks(response.books)
      console.log('resp', response)
    }

    getData()
  }, [])

  return (
    <Container>
      <div className="d-flex bg-light mt-5">
        <div className="container m-auto">
          <div className="d-flex flex-wrap justify-content-center">
            {books.map(item => (
              <div className="m-3" key={item.id}>
                <ProductCard data={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Home