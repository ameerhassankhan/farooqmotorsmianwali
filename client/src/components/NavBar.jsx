import React from 'react'

const NavBar = ({ className }) => {
  return (
    <div className={`bg-zinc-200 ${className}`}>
      <header className="flex justify-between items-center p-4 bg-white">
        <h1 className="text-lg font-semibold">HRPro</h1>
        <div className="flex items-center gap-4">
          <span>AR</span>
          <button>🔔</button>
          <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center">SA</div>
        </div>
      </header>
    </div>
  )
}

export default NavBar
