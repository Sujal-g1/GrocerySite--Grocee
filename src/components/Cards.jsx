import React, { useState } from 'react'
import { FaHeart, FaPlus } from 'react-icons/fa'
import Button from './Button'

const Cards = ({ image, name, price }) => {
  const [isFav, setIsFav] = useState(false)

  return (
    <div className="bg-zinc-100 p-5 rounded-xl">
      <div className="flex justify-between">

        {/* heart-icon */}
        <span
          onClick={() => setIsFav(!isFav)}
          className={`text-3xl cursor-pointer transition-all duration-200 ${
            isFav ? 'text-red-500' : 'text-zinc-300'
          }`}
>
          <FaHeart />
        </span>

        {/* plus-icon */}
        <button
          className="bg-gradient-to-b from-green-600 to-green-800
          text-white text-xl p-3 rounded-lg"
        >
          <FaPlus />
        </button>
      </div>

      {/* image */}
      <div className="w-full h-50 mt-5">
        <img
          src={image}
          className="w-full h-full mx-auto object-contain"
          alt=""
        />
      </div>

      {/* card content */}
      <div className="text-center">
        <h3 className="text-2xl font-semibold">{name}</h3>
        <p className="text-zinc-800 text-2xl font-bold mt-4 mb-3">₹ {price}</p>
      </div>
    </div>
  )
}

export default Cards
