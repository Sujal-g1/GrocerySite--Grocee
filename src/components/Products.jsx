// src/pages/Vegetables.jsx
import React ,{useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go"
import { HiShoppingBag } from "react-icons/hi2"
import { TbMenu2,TbMenu3  } from "react-icons/tb";

import Grocery from '../assets/grocery.png'
import FruitsCat from '../assets/fruits-and-veggies.png'
import SeafoodCat from '../assets/meat-and-seafood.png'
import DairyCat from '../assets/dairy-and-eggs.png'
import Button from './Button'

import Heading from './Heading'
import ProductList from './dataFiles/productList.js'
import Values from './dataFiles/values.js'
import Category from './dataFiles/category.js'
import Cards from './Cards.jsx'

import { FaHeart, FaLeaf, FaSeedling , FaShieldAlt} from "react-icons/fa";
import Basket from '../assets/basket-full-vegetables.png'


const Products = () => {

    const navigate = useNavigate();
    const [showMenu,setShowMenu] = useState(false);
     
    const toggleMenu = () => {
        setShowMenu(!showMenu); 
    }
    
    const [isScrolled, setIsScrolled] = useState(false); 

    const categories = [
  { name: 'All', path: '/products' },
  { name: 'Fruits', path: '/fruits' },
  { name: 'Vegetables', path: '/vegetables' },
  { name: 'Dairy', path: '/dairy' },
  { name: 'SeaFood', path: '/seafood' }
];

    const [activeTab , setActiveTab] = useState('All');
    
    const[fvrt ,setFvrt] = useState('All')
    
    useEffect(() =>{
      const handleScroll = () =>{
        setIsScrolled(window.scrollY > 10)
      }
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }, [])

//   categories

const categoryCards = Category.map(card=>{
    return(
        // card
        <div className="flex-1 basis-[300px] " key={card.id}>
            {/* card image */}
            <div className="w-full min-h-[30vh] relative -mb-10">
            <img src={card.image } className='absolute bottom-0' />
            </div>

            {/* card content */}
            <div className="bg-zinc-100 pt-17 p-8 rounded-xl">
                <h3 className="text-zinc-800 text-3xl font-bold">{card.title}</h3>
                <p className="text-zinc-600 mt-3 mb-9">{card.description}</p>
                  <a  onClick={() => navigate('/products')}
                       className="bg-gradient-to-b from-green-600 to-green-800 text-white font-bold px-7 py-3 
                         rounded-full md:text-lg text-md hover:from-green-900 transition-all duration-300 cursor-pointer inline-block">
                       See All </a>
            </div>
        </div>
    )
})
   
// products 

const productCards = ProductList.slice(0,8).map(product=>{
    return(
        <Cards image={product.image} name={product.name} price={product.price} />
    )
})
       

  return (
<div>
       {/* navbar header starts  */}
    
       <header className={`fixed top-0 right-0 left-0 z-50 bg-white ${isScrolled ? 'shadow-lg' : "" }`}>
       <nav className= "relative flex items-center  md:h-[14vh] h-[12vh] max-w-[1400px] mx-auto px-10">
         {/* Left placeholder (can be empty or nav links later) */}
    <div className="flex-1"></div>

        {/* logo */}
        <a href="#" className ="absolute left-1/2 transform -translate-x-1/2 text-5xl font-bold hover:text-2xl transition-all duration-500">Gr
            <span className = "text-orange-500 uppercase hover:text-9xl transition-all duration-500">O</span>
            cify</a>
    
        {/* heart , bag & menu icon */}
        <div className="flex items-center gap-x-10">
    
        <a href="#" alt="" className="text-zinc-800 text-2xl "> <GoHeartFill /> </a>
        
        <a  onClick={() => navigate('/checkout')}
        className="text-zinc-800 text-2xl "> <HiShoppingBag /> </a>
    
        {/* menu icon */}
        <a href="#" className="text-zinc-800 text-3xl md:hidden " onClick={toggleMenu}>
       {showMenu ? <TbMenu3/> : <TbMenu2/> }</a>
    
        </div>
    
        </nav>
       </header>
    
    
            {/* navbar section ends */}

{/* product section starts  */}

        <section >
        <div className="max-w-[1400px] px-10 py-20 mx-auto pt-[14vh] md:pt-[16vh]">

        <Heading highlight="Our" heading="Products" />

        {/* tabs */}
         <div className='flex gap-3 justify-center mt-10'> 
            {categories.map(category =>{
                return( 
                    <button key={category.name}
                     className={` px-5 py-2 text-lg rounded-lg cursor-pointer
                      ${activeTab === category.name ? 'bg-gradient-to-b from-green-600 to-green-800 text-white' : 'bg-zinc-100'}`} 
                       onClick={() => {
                        setActiveTab(category.name); 
                        navigate(category.path);     // navigate to the corresponding pag
                       }}>
                        {category.name}
                    </button>
                )
            })}
        </div>
                {/* prodcut listing */}
            
            <div className='grid grid-cols-4 gap-9 mt-20'>
               {productCards}
            </div>

               
         </div>
    </section>

    {/* product section ends */}

    </div>

     

  );
};

export default Products;
