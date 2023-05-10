import React from "react";
import Sidebar from "./layout/Sidebat";
import FollowBar from "./layout/FollowBar";

interface ILayoutProps {
  children: React.ReactNode
}

const Layout:React.FC<ILayoutProps> = ({children}) => {
  return (
    <main className="h-screen bg-white">
      <div className="container h-full mx-auto xl:px-30 max-w-6xl">
        <div className="grid grid-cols-4 h-full">
          <Sidebar />
          <div className="col-span-3 lg:col-span-2 border-x-[1px] border-gray-200">
            {children}    
          </div>
          <FollowBar />
        </div>
      </div>
    </main>
  )
}

export default Layout;

