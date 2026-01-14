import { FavoriteButton } from "../subcomponents/FavoriteButton";


export default function ResultDisplay({ versiculo, capituloCompleto, onVerCapitulo}) {
    if (!versiculo && !capituloCompleto) return null;

    return (
        <div>
            
            {versiculo && (
                
            <div>
                
                <div className="font-display max-w-150 ml-6 lg:absolute lg:top-20 lg:-right-1 lg:mr-0 mt-6 p-4 mr-10 bg-white/10 border border-white/10 rounded-lg animate slide-in-from-top duration-300 ">
                    <div className='flex justify-between'>
                        <p className="text-sm text-white/60">{versiculo.referencia}</p>
                        <FavoriteButton versiculo={versiculo}/>
                        
                    </div>
                    
                    <p className="mt-2 font-display  text-white">{versiculo.texto}</p>
                    <button 
                        onClick={onVerCapitulo}
                        className='font-display pt-1 pb-1 pr-3 pl-3 mt-7  bg-white/10 border border-white/10 rounded-full animate slide-in-from-top duration-700 hover:bg-white/30'
                    >Ver capitulo completo
                    </button>
                </div>
                
            </div>
            )}
            {capituloCompleto && (
            <div className="scrollbar-custom font-display relative p-6 mb-5 bg-stone-800/50 backdrop-blur rounded-md md:border border-stone-400/40 shadow-2xl max-w-screen max-h-[85vh] overflow-y-auto animate slide-in-from-top duration-700">
                <h3 className="text-center text-md lg:text-xl font-bold text-stone-100 mb-6 sticky top-0 bg-stone-900/70 backdrop-blur-xs border border-stone-400/40 shadow-7xl rounded-full pt-2 pb-2">
                    {capituloCompleto.referencia}
                </h3>
                <div className="space-y-2 ">
                {capituloCompleto.versos.map((verso, index) => (
                    <div key={index} className="flex">
                        <span className="flex font-display  font-bold text-[#F4C430] min-w-8">
                            {verso.versiculo}
                        </span>
                        <FavoriteButton versiculo={verso}/>
                        <p className="font-display ml-5 text-gray-200 leading-relaxed flex-1">
                            {verso.texto}
                        </p>
                    </div>
                ))}
                </div>
            </div>
            )}

        </div>


        
      
    )
}

