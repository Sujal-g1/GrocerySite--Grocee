// src/pages/Vegetables.jsx
import React ,{useEffect ,useState} from 'react'
import { useCart } from "./CartContext";
import { useNavigate } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go"
import { HiShoppingBag } from "react-icons/hi2"
import { TbMenu2,TbMenu3  } from "react-icons/tb";
import vegetables from "./dataFiles/vegetables"


const Vegetables = () => {
const { addToCart } = useCart(); 

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
            cee</a>
    

        {/* heart , bag & menu icon */}
        <div className="flex items-center gap-x-10">
    
        <a href="#" alt="" className="text-zinc-800 text-2xl "> <GoHeartFill /> </a>
        
        <a  onClick={() => navigate('/cart')}
        className="text-zinc-800 text-2xl "> <HiShoppingBag /> </a>
    
        {/* menu icon */}
        <a href="#" className="text-zinc-800 text-3xl md:hidden " onClick={toggleMenu}>
       {showMenu ? <TbMenu3/> : <TbMenu2/> }</a>
    
        </div>
    
    
        </nav>
       </header>
    
    
            {/* navbar section ends */}

    <div className="min-h-screen bg-white px-6 py-4 pt-[14vh] md:pt-[16vh]">
     

      {/* Title */}
      <h2 className="mt-6 text-lg font-semibold">
        Showing results for <span className="text-green-600">"vegetables"</span>
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">

        {vegetables.map((veg) => (
  <div
    key={veg.id}
    className="relative bg-white rounded-2xl shadow hover:shadow-lg p-3 flex flex-col"
  >
   

    <div className="h-32 flex items-center justify-center">
      <img src={veg.img} alt={veg.name} className="object-contain h-full" />
    </div>

    <div className="mt-3">
      <h3 className="text-sm font-semibold">{veg.name}</h3>
      <p className="text-xs text-gray-500">{veg.qty}</p>
    </div>

    <div className="mt-2 flex items-center gap-2">
      <span className="text-base font-bold">₹{veg.price}</span>
      <span className="text-gray-400 line-through text-sm">₹{veg.oldPrice}</span>
    </div>

    <button
        onClick={() =>{ addToCart(veg)
           console.log("Cart after add:", veg);
        } }
       
     className="mt-auto bg-green-100 text-green-600 font-semibold py-1 px-3 rounded-lg hover:bg-green-200 self-center">
      ADD
    </button>
  </div>
))}


      </div>
    </div>
    
    </div>
  );
};

export default Vegetables;
