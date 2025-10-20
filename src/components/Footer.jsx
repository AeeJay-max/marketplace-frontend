import React from 'react'
import Logo from './Logo.jsx'

const Footer = () => {
  return (
    <footer className="bg-sky-100 shadow-[0_-4px_6px_-1px,0_-2px_4px_-2px] shadow-gray-300 w-full py-4 md:py-3 md:fixed md:bottom-0">
      <div className="mx-4 md:mx-10">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between text-sm gap-4 md:gap-0">

          {/* Logo */}
          <div className="shadow-sm flex justify-center md:justify-start">
            <Logo w={170} h={50} />
          </div>

          {/* Web Technologies Section */}
          <div className="text-center md:text-left">
            <p className="text-sm font-bold mb-1 underline">Web Technologies</p>
            <ul className="flex flex-col gap-0.5 text-gray-600">
              <li className="text-xs">Mini Project</li>
              <li className="text-xs">Click the user Icon to see about</li>
            </ul>
          </div>

          {/* Developer Info */}
          <div className="text-center md:text-left">
            <p className="text-sm font-bold mb-1 underline">Developer</p>
            <ul className="flex flex-col gap-0.5 text-gray-600 text-center">
              <li className="text-xs">h240150p@hit.ac.zw</li>
              <li className="text-xs">+263 718 711 250</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
