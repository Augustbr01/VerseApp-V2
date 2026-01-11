import { useEffect, useState } from "react"
import BibleSelector from "./subcomponents/BibliaSelector";

export default function Hero() {
    const [mousePosition, setMousePosition] = useState({x:0, y:0})

    useEffect(() => {
        function handleMouseMove(e) {
            setMousePosition({x: e.clientX, y: e.clientY});
        }

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div 
                className="absolute inset-0 opacity-100" 
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgb(255, 255, 255, 0.10), transparent 40%)`
                }}
            />

            <div className="absolute -top-600 -right-500 sm:-top-570 sm:-right-420 sm:w-700 sm:h-700 w-700 h-700 bg-[#FFFFFF]/40 rounded-full blur-3xl animate-pulse "></div>
            <div className="absolute -bottom-600 -left-500 sm:-bottom-580 sm:-left-420 sm:w-700 sm:h-700 w-700 h-700 bg-[#F4C430]/40 rounded-full blur-3xl animate-pulse"></div>


            <div className="max-w-7xl mx-auto grid-cols-2 relative w-full">
                <div className="max-w-7xl mx-auto flex flex-col ">
                    <div className="animate-in slide-in-from-bottom duration-700 delay-100 sm:ml-15 max-[500px]:ml-2 lg:ml-10 ml-20 md:ml-30 flex flex-col">
                        <div>
                            <h1 className=" font-display inline font-bold text-5xl md:text-5xl lg:text-6xl ">Inspire-se. </h1>
                            <h1 className="  font-display inline font-bold text-5xl md:text-5xl lg:text-6xl">Fortaleça-se.</h1>
                        </div>
                        <div>
                            <h1 className="font-display inline font-bold text-5xl md:text-6xl lg:text-6xl animate-fade-pulse ">Viva </h1>
                            <h1 className="font-display inline font-bold text-5xl md:text-6xl text-[#F4C430] lg:text-6xl">a palavra.</h1> 
                        </div>
                        
                    </div>

                    <div className="font-display max-[500px]:ml-2 md:ml-30 ml-13 lg:ml-10 flex mt-20 border items-center border-stone-400/30 mb-70 w-93 h-12 bg-[#525252]/60 rounded-full ">
                        <BibleSelector/>
                    </div>
                </div>
            </div>
        </section>
    )
}