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

const Home = () => {
 return (
  <Container>
   <div className="row bg-light mt-5">
    <div className="container m-auto">
     <div className="d-flex flex-wrap justify-content-center">
       <div className="m-3">
        <ProductCard image={product1} title={''} subtitle={'As Crônicas de Nárnia'} price={'R$: 60,00'}
        content={'Fantasia'}/>
       </div>

       <div className='m-3'>
       <ProductCard image={product2} title={''} subtitle={'Percy Jackson e o ladrão de raios'} price={'R$: 60,00'}
        content={'Aventura'}/>
       </div>
       
       <div className='m-3'>
       <ProductCard image={product3} title={''} subtitle={'Percy Jackson e o mar de monstros'} price={'R$: 60,00'}
        content={'Aventura'}/>
       </div>

       <div className='m-3'>
       <ProductCard image={product4} title={''} subtitle={'A bússola de ouro'} price={'R$: 60,00'}
        content={'Aventura'}/>
       </div>

       <div className='m-3'>
       <ProductCard image={product5} title={''} subtitle={'Jogos Vorazes: A esperança'} price={'R$: 60,00'}
        content={'Ação'}/>
       </div>

       <div className='m-3'>
       <ProductCard image={product6} title={''} subtitle={'A Rainha Vermelha'} price={'R$: 60,00'}
        content={'Fantasia'}/>
       </div>

       <div className='m-3'>
       <ProductCard image={product7} title={''} subtitle={'Harry Potter e a pedra filosofal'} price={'R$: 60,00'}
        content={'Fantasia'}/>
       </div>

       <div className='m-3'>
       <ProductCard image={product8} title={''} subtitle={'Harry Potter e a câmara secreta'} price={'R$: 60,00'}
        content={'Fantasia'}/>
       </div>

       <div className='m-3'>
       <ProductCard image={product9} title={''} subtitle={'Harry Potter e o prisioneiro de Azkaban'} price={'R$: 60,00'}
        content={'Fantasia'}/>
       </div>

       <div className='m-3'>
       <ProductCard image={product10} title={''} subtitle={'Harry Potter e o cálice de fogo'} price={'R$: 60,00'}
        content={'Fantasia'}/>
       </div>

       <div className='m-3'>
       <ProductCard image={product11} title={''} subtitle={'Harry Potter e a ordem da fênix'} price={'R$: 60,00'}
        content={'Fantasia'}/>
       </div>

       <div className='m-3'>
       <ProductCard image={product12} title={''} subtitle={'Harry Potter e a e o enigma do príncipe'} price={'R$: 60,00'}
        content={'Fantasia'}/>
       </div>

       <div className='m-3'>
       <ProductCard image={product13} title={''} subtitle={'Harry Potter e as relíquias da morte'} price={'R$: 60,00'}
        content={'Fantasia'}/>
       </div>

       <div className='m-3'>
       <ProductCard image={product14} title={''} subtitle={'Alice no País das Maravilhas'} price={'R$: 60,00'}
        content={'Aventura'}/>
       </div>

       <div className='m-3'>
       <ProductCard image={product15} title={''} subtitle={'O Mágico de Oz'} price={'R$: 60,00'}
        content={'Aventura'}/>
       </div>

       <div className='m-3'>
       <ProductCard image={product16} title={''} subtitle={'Peter Pan'} price={'R$: 60,00'}
        content={'Infantil'}/>
       </div>

       <div className='m-3'>
       <ProductCard image={product17} title={''} subtitle={'Contos de Grimm'} price={'R$: 60,00'}
        content={'Infantil'}/>
       </div>

       <div className='m-3'>
       <ProductCard image={product18} title={''} subtitle={'A Bela adormecida'} price={'R$: 60,00'}
        content={'Infantil'}/>
       </div>

       <div className='m-3'>
       <ProductCard image={product19} title={''} subtitle={'O Pequeno Príncipe'} price={'R$: 60,00'}
        content={'Infantil'}/>
       </div>
     </div>
    </div>
   </div>
  </Container>
 )
}

export default Home