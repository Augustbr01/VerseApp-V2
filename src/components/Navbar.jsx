import { X } from "lucide-react"
import { Menu } from "lucide-react"
import { useState } from "react"
import logo from "../assets/logo.png"


export default function NavBar() {
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false)

    return (
        <div className="fixed top-0 w-full z-50 transition-all duration-300 bg-[#2A2A2A]/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center sm:justify-between items-center h-14 sm:h-16 md:h-20">
                    

                    <button 
                        className="md:hidden absolute left-5 top-4 cursor-pointer w-5 h-5 sm:w-6 sm:h-6" 
                        onClick={() => setMobileMenuIsOpen((prev) => !prev)}
                    >
                        
                        {mobileMenuIsOpen ? (
                            <X />
                        ) : (
                            <Menu className="lg:hidden md:hidden absolute left-1 top-1 cursor-pointer w-5 h-5 sm:w-6 sm:h-6" />
                        )}
                    </button>
                    <div className="flex items-center space-x-2 group cursor-pointer">
                        <div>
                            <img 
                                src={logo}
                                alt="logo"
                                className="w-6 h-6 sm:w-8 sm:h-8"
                            />
                        </div>
                        <span className="text-lg sm:text-xl md:text-2xl font-medium">
                            <span className="font-display text-[#F4C430]">Verse</span>
                            <span className="font-display text-white">App</span>
                            
                        </span>
                    </div>
                    <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                        <a href="#" className="font-medium font-display">Meus Versículos</a>
                        
                    </div>
                </div>
            </div>


            {mobileMenuIsOpen && (
                <div className="md:hidden bg-[#262626]/95 backdrop-blur-lg border-t border-stone-900 animate-in slide-in-from-top duration-300">
                    <div className="px-4 space-y-8 py-4 sm:py-6 sm:space-y-4">
                        <a 
                            href="#features" 
                            className=" text-center block text-gray-300 hover:text-white text-sm lg:text-base"
                            onClick={() => setMobileMenuIsOpen(false)}
                        >
                            Buscar Versiculo
                        </a>
                        <a 
                            href="#pricing" 
                            className="text-center block text-gray-300 hover:text-white text-sm lg:text-base"
                            onClick={() => setMobileMenuIsOpen(false)}
                        >
                            Meus Versiculos 
                        </a>
                    </div>
                </div>
            )}
        </div>
    )
}