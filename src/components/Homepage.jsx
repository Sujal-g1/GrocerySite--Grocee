import React ,{useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { GoHeartFill } from "react-icons/go"
import { HiShoppingBag } from "react-icons/hi2"
import { IoSearch } from "react-icons/io5";
import { TbMenu2,TbMenu3  } from "react-icons/tb";
import { MdLocationOn } from "react-icons/md";

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


const Homepage = () => {

    // navigation
  const navigate = useNavigate();


const [showMenu,setShowMenu] = useState(false);
 
const toggleMenu = () => {
    setShowMenu(!showMenu); 
}

const [isScrolled, setIsScrolled] = useState(false); 

useEffect(() =>{
  const handleScroll = () =>{
    setIsScrolled(window.scrollY > 10)
  }
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])


const categories = ['All' , 'Fruits','Vegetables', 'Dairy','SeaFood']
const [activeTab , setActiveTab] = useState('All');

const[fvrt ,setFvrt] = useState('All')

const productCards = ProductList.slice(0,8).map(product=>{
    return(
        <Cards image={product.image} name={product.name} price={product.price} />
    )
})


const leftValues= Values.slice(0,2).map(item=>{
    const Icon = item.icon; 
    return(
        <div key={item.id} className="flex md:flex-row-reverse items-center gap-x-5">
            <div>
                <span className=' flex justify-center text-white text-3xl items-center bg-gradient-to-b from-green-600 to-green-800 w-15 h-15 rounded-full'>
                    <Icon />
                    </span>
            </div>
            <div className="">
                <h3 className='text-zinc-800 text-3xl font-bold '>{item.title}</h3>
                <p className='text-zinc-600 mt-2'>{item.para}</p>
            </div>
            
        </div>
    )
}) 

const rightValues= Values.slice(2).map(item=>{
        const Icon = item.icon; 
    return( 
        <div key={item.id} className="flex  items-center gap-x-5 ">
            <div>
                <span className=' flex justify-center text-white text-3xl items-center bg-gradient-to-b from-green-600 to-green-800 w-15 h-15 rounded-full'>
                      <Icon />
                      </span>
            </div>
            <div className="md:text-right">
                <h3 className='text-zinc-800 text-2xl md:text-3xl font-bold '>{item.title}</h3>
                <p className='text-zinc-600 mt-2'>{item.para}</p>
            </div>
            
        </div>
    )
}) 

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

const scrollToProducts = () => {
  const section = document.getElementById('products')
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' }) // smooth scrolling
  }
}


 // live location code 

  const [locationName, setLocationName] = useState("Fetching...");

useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          if (data && data.address) {
            const city =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.state ||
              "Unknown";
            const country = data.address.country_code?.toUpperCase() || "";
            const fullLocation = `${city}, ${country}`;

            setLocationName(fullLocation);

            // ✅ default start point only if user hasn’t typed
            setStartPoint((prev) => (prev ? prev : fullLocation));
          } else {
            setLocationName("Unknown location");
          }
        } catch (err) {
          console.error("Reverse geocode failed:", err);
          setLocationName("Location error");
        }
      },
      (err) => {
        console.warn("GPS error:", err);
        setLocationName("Location unavailable");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 2000 }
    );
  } else {
    setLocationName("Geolocation not supported");
  }
}, []);

// Debounce helper
const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

// Fetch suggestions from OpenStreetMap
const fetchSuggestions = async (query, setSuggestions, setShow) => {
  if (!query) {
    setSuggestions([]);
    setShow(false);
    return;
  }

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(
        query
      )}&addressdetails=1&limit=5&countrycodes=in`
    );
    const data = await res.json();
    setSuggestions(data);
    setShow(data.length > 0);
  } catch (err) {
    console.error("Failed to fetch suggestions", err);
    setSuggestions([]);
    setShow(false);
  }
};



  return (
   <div>
     {/* navbar header starts  */}

   <header className={`fixed top-0 right-0 left-0 z-50 bg-white ${isScrolled ? 'shadow-lg' : "" }`}>
    <nav className= "relative flex items-center  md:h-[14vh] h-[12vh] max-w-[1400px] mx-auto px-10">

         {/* Left placeholder (can be empty or nav links later) */}

    <div className="flex-1">
         <div className="flex items-center gap-1 text-2xl">
     <MdLocationOn /> {locationName}       {/* Live location  */}
    </div>
    </div>

        {/* logo */}
        <a href="#" className ="absolute left-1/2 transform -translate-x-1/2 text-5xl font-bold hover:text-2xl transition-all duration-500">Gr
            <span className = "text-orange-500 uppercase hover:text-9xl transition-all duration-500">O</span>
            cee</a>


    {/* nav links   */}

        {/* <div className=" ml-10 transform -translate-x-1/2 flex gap-8">
          <a  className=" font-bold relative after:absolute after:left-0 after:-bottom-1 after:h-1 after:w-full after:rounded-full
             after:bg-gradient-to-r after:from-green-700 after:via-green-800 after:to-green-900
             after:scale-x-0 after:origin-left hover:after:scale-x-100
             after:transition-transform after:duration-300" href="#" >Home</a>

          <a  className=" font-bold relative after:absolute after:left-0 after:-bottom-1 after:h-1 after:w-full after:rounded-full
             after:bg-gradient-to-r after:from-green-700 after:via-green-800 after:to-green-900
             after:scale-x-0 after:origin-left hover:after:scale-x-100
             after:transition-transform after:duration-300" href="#" >TEXT</a>

              <a  className=" font-bold relative after:absolute after:left-0 after:-bottom-1 after:h-1 after:w-full after:rounded-full
             after:bg-gradient-to-r after:from-green-700 after:via-green-800 after:to-green-900
             after:scale-x-0 after:origin-left hover:after:scale-x-100
             after:transition-transform after:duration-300" href="#" >TEXT</a>

              <a  className=" font-bold relative after:absolute after:left-0 after:-bottom-1 after:h-1 after:w-full after:rounded-full
             after:bg-gradient-to-r after:from-green-700 after:via-green-800 after:to-green-900
             after:scale-x-0 after:origin-left hover:after:scale-x-100
             after:transition-transform after:duration-300" href="#" >TEXT</a>

        </div>  */}


    {/* search bar */}
    {/* <div className="md:flex p-2  border-2 border-green-900 rounded-full hidden">
        <input type="text" name="text" id="text" placeholder="Search.." className=" flex-1 h-[5vh] px-3 focus:outline-none" />
        <button className="bg-gradient-to-b from-green-600 to-green-800 text-white w-10 h-10 flex justify-center items-center rounded-full text-xl">
          <IoSearch />
         </button>
    </div> */}



    {/* heart , bag & menu icon */}
    <div className="flex items-center gap-x-10">

    <a href="#" alt="" className="text-zinc-800 text-3xl "> <GoHeartFill /> </a>
    
    <a  onClick={() => navigate('/checkout')}
    className="text-zinc-800 text-3xl "> <HiShoppingBag /> </a>

    {/* menu icon */}
    <a href="#" className="text-zinc-800 text-3xl md:hidden " onClick={toggleMenu}>
   {showMenu ? <TbMenu3/> : <TbMenu2/> }</a>

    </div>


        {/* Mobile menu */}

    {/* <ul className ={`flex flex-col gap-y-12 bg-orange-500/10 backdrop-blur-xl shadow-xl rounded-xl p-10 z-50 items-center gap-x-15 md:hidden absolute top-28 -left-full transform -translate-x-1/2  transition-all duration-500 ${showMenu ? 'left-1/2' : ""}`}>
        <li>
        <a href="#" className="font-semibold tracking-wider text-orange-500 " alt="">Home</a>
        </li>
        <li>
        <a href="#" className="font-semibold tracking-wider text-zinc-800 hover:text-orange-500"alt="">About</a>
        </li>
        <li>
        <a href="#" className="font-semibold tracking-wider text-zinc-800 hover:text-orange-500"alt="">Process </a>
        </li>
        <li>
        <a href="#"  className="font-semibold tracking-wider text-zinc-800 hover:text-orange-500"alt="">Contact us</a>
        </li>

        <li className="flex p-2 border-2 border-orange-500 rounded-full md:hidden">
        <input type="text" name="text" id="text" placeholder="Search.." className=" flex-1 h-[5vh] px-3 focus:outline-none" />
        <button className="bg-gradient-to-b from-orange-400 to-orange-500 text-white w-10 h-10 flex justify-center items-center rounded-full text-xl">
          <IoSearch />
         </button>
    </li>

    </ul> */}

    </nav>
   </header>


        {/* navbar section ends */}

        {/* hero/main header page starts  */}

         <section>
         <div className="max-w-[1400px] mx-auto px-10 flex items-center min-h-screen md:flex-row flex-col md:pt-25 pt-35">
        
            {/* hero content */}
            <div className="flex-1">
             <span className="bg-orange-100 text-orange-500 text-lg px-5 py-2 rounded-full"> Export Best Quality...</span> 
              <h1 className="md:text-7xl/20  text-5xl/14 mt-4 font-bold ">Tasty Organic  
             <br/> <span className="text-orange-500 "> Fruits</span> & 
             <span className="text-orange-500 "> Veggies </span>  <br/> In Your City
            </h1>
        
                        <p className="text-zinc-600 md:text-lg text-md max-w-[530px] mt-5 mb-10">
                            Bread for a high content of beneficial substances. Our products are all fresh and healthy. 
                        </p>

                        <a  onClick={() => navigate('/products')}
                       className="bg-gradient-to-b from-green-600 to-green-800 text-white font-bold px-7 py-3 
                         rounded-full md:text-lg text-md hover:from-green-900 transition-all duration-300 cursor-pointer inline-block">
                       Shop Now </a>
        
                    </div>
        
                    {/* hero Image */}
                    <div className="flex-1">
                        <img src={Grocery} alt="hero image" />
                    </div>
        
                    </div>
                </section>

        {/* main header ends  */}


        {/* discount section starts  */}

         <div className='pt-6 pb-6 px-9'>
      <section className="w-full bg-green-800 rounded-lg shadow-lg p-5">
        <div className='flex flex-col md:flex-row items-center gap-6'>

          {/* Text Content */}
          <div className='md:w-1/2 w-full'>
            <h1 className='text-4xl text-white'>
              get <span className='text-amber-300 font-bold text-5xl leading-relaxed'>FREE DELIVERY</span> on
              <br />
              Shopping above 250
            </h1>

            <p className='text-white text-md mt-8'>
              Get the most fresh groceries delivered right to your home. Saves time, skip the line
            </p>
            <p className='text-white text-md'>
              and enjoy the convenience of quick, effective delivery.
            </p>

            <button className="bg-gradient-to-b from-orange-400 to-orange-500 mt-10
              text-white font-bold px-7 py-3 rounded-full md:text-lg text-md hover:from-orange-700 transition-all duration-300 cursor-pointer">
              get Discounts →
            </button>
          </div>

          {/* Image Content */}
          <div className='md:w-1/2 w-full flex justify-center'>
            <img
              src=""
              alt="hero"
              className="w-full max-w-xs md:max-w-sm object-contain"
            />
          </div>

        </div>
      </section>
    </div>

       {/* discount section ends  */}

        {/* values section starts */}

             <section>
            <div className="max-w-[1400px] mx-auto px-10 py-20 ">
                <Heading highlight="Our" heading="Values"/>

        <div className="flex flex-col md:flex-row md:gap-5 gap-15 mt-10">
            {/* left */}
             <div className="md:min-h-100 flex flex-col justify-between">
            {leftValues}
             </div>

            {/* image */}
            <div className='md:flex  w-1/2 hidden'>
                <img src={Basket} />
            </div>

            {/* right */}
            <div className='md:min-h-100 md:gap-15 flex flex-col justify-between'>
            {rightValues}
            </div>


        </div>

            </div>
        </section>

         {/* values section ends */}


           {/* category section starts  */}

          <section>

            <div className="py-20 max-w-[1400px] px-10 mx-auto">
         <Heading highlight ="Shop" heading="by Category" />

         {/* category cards */}
        <div className="flex flex-wrap gap-10 mt-10 md:mt-20">
           {categoryCards}
        </div>

            </div>

        </section>

            {/* category section ends  */}


         </div>
  )
}



export default Homepage;
