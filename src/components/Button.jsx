import React from 'react'

const Button = (props) => {
    return (
       <button className="bg-gradient-to-b from-green-600 to-green-800
       text-white px-8 py-3 rounded-full md:text-lg text-md  hover:from-orange-700 transition-all duration-300 cursor-pointer">
        {props.content}
       </button>
    )
}

export default Button