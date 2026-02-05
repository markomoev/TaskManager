import Loading from './icons/loading.gif'

export default function Loader() {
    return (
        <div className="flex justify-center items-center">
            <img 
                src={Loading} 
                alt="Loading..." 
                className='w-27 h-27 object-contain'
            />
        </div>
    )
}