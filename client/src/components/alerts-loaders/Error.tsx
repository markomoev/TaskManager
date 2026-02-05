import ErrorIcon from './icons/error.png'

type ErrorMessage = {
    message: string
}

export default function Error({message}: ErrorMessage){
    return(
        <div className = 'flex flex-row gap-3 fixed bg-red-500 px-3 py-1 rounded-lg'>
            <img src={ErrorIcon} alt="" />
            <span className= "text-lg">{message}</span>
        </div>
    )
}