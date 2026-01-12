export default function ResultDisplay({ versiculo, capituloCompleto, onVerCapitulo}) {
    if (!versiculo && !capituloCompleto) return null;

    return (
        <div>
            {versiculo && (
            <div className="font-display absolute max-w-150 lg:top-15 lg:-right-1 lg:mr-0 mt-6 p-4 mr-10 bg-white/10 border border-white/10 rounded-lg animate slide-in-from-top duration-300 ">
                <div className='flex justify-between'>
                    <p className="text-sm text-white/60">{versiculo.referencia}</p>
                    <button className='flex'></button>
                </div>
                <p className="mt-2 font-display  text-white">{versiculo.texto}</p>
                <button 
                    onClick={onVerCapitulo}
                    className='font-display absolute left-0 pt-1 pb-1 pr-3 pl-3 mt-7 bg-white/10 border border-white/10 rounded-full animate slide-in-from-top duration-700 hover:bg-white/30'
                >Ver capitulo</button>
            </div>  
            )}

            {capituloCompleto && (
            <div className="font-display relative p-6 bg-stone-800/50 backdrop-blur rounded-xl shadow-lg max-w-screen max-h-[700px] overflow-y-auto">
                <h3 className=" text-center text-2xl font-bold text-stone-300 mb-6 sticky top-0 bg-stone-400/30 rounded-full pt-2 pb-2">
                    {capituloCompleto.referencia}
                </h3>
                <div className="space-y-4">
                {capituloCompleto.versos.map((verso, index) => (
                    <div key={index} className=" gap-3">
                        <span className="font-display font-bold text-blue-600 min-w-100">
                            {verso.versiculo}
                        </span>
                        <p className="font-display text-gray-200 leading-relaxed flex-1">
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

