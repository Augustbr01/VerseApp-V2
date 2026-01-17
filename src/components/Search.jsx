import { useEffect, useState } from "react"
import BibliaSearch from "./BibliaSearch/BibliaSearch";

export default function Search() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ 
                x: e.pageX,
                y: e.pageY
            });
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className=" relative min-h-screen flex justify-center pt-16 sm:pt-20 sm:px-0 md:px-6 lg:px-8 ">
            <div 
                className="absolute inset-0 opacity-100 min-h-full" 
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgb(255, 255, 255, 0.10), transparent 40%)`
                }}
            />

            <div className="absolute -top-600 -right-500 sm:-top-570 sm:-right-420 sm:w-700 sm:h-700 w-700 h-700 bg-[#FFFFFF]/40 rounded-full blur-3xl animate-pulse "></div>
            <div className="absolute -bottom-600 -left-500 sm:-bottom-580 sm:-left-420 sm:w-700 sm:h-700 w-700 h-700 bg-[#F4C430]/40 rounded-full blur-3xl animate-pulse"></div>


            <div className="max-w-7xl grid-cols-2 mt-10 lg:mt-40 relative w-full">
                <div className="max-w-7xl flex flex-col ">
                    <div className="animate-in slide-in-from-bottom duration-700 delay-100 ml-10 flex flex-col">
                        <div>
                            <h1 className=" font-display inline font-bold text-5xl md:text-5xl lg:text-6xl ">Inspire-se. </h1>
                            <h1 className=" font-display inline font-bold text-5xl md:text-5xl lg:text-6xl">Renove-se.</h1>
                        </div>
                        <div>
                            <h1 className="font-display inline font-bold text-5xl md:text-6xl lg:text-6xl animate-fade-pulse ">Viva </h1>
                            <h1 className="font-display inline font-bold text-5xl md:text-6xl text-[#F4C430] lg:text-6xl">a palavra.</h1> 
                        </div>
                        
                    </div>

                    <BibliaSearch />
                </div>
            </div>
        </section>
    )
}