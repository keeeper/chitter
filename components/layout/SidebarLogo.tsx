"use client";

import Image from "next/image";
import {useRouter} from "next/router";

const SidebarLogo = () => {
  const router = useRouter();

  return ( 
    <div 
      onClick={() => router.push("/")} 
      className="flex justify-center itens-center mt-4 mb-8 bg-sky-300 rounded-full h-14 w-14 hover:opacity-80 cursor-pointer transition">
        <Image width={60} height={60} alt="Chitter Logo" src="/images/logo.png" />
    </div>
   );
}

export default SidebarLogo;