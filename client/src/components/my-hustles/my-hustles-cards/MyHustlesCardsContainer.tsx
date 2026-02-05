import MyHustlesCard from "./MyHusltesCard"
import Error from "../../alerts-loaders/Error"
import Loader from "../../alerts-loaders/Loader"

import { Activity, useEffect, useState } from "react"
import useLoadHustle from "../../../hooks/my-hustles/my-hustle-load/useLoadHustle"

import {useContext} from "react"
import { SearchContext } from "../SearchContext"

export default function MyHustlesCardsContainer(){
    // data from the hook
    const {data} = useLoadHustle()
    // hustle data storage
    const [hustleData, setHustleData] = useState<any>([])
    // error case
    const [isError, setIsError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    // loading
    const [isLoading, setIsLoading] = useState<boolean>(false)
    // searchbar context
    const {search} : any = useContext(SearchContext)

    useEffect(() => {
        // fetch the data
        const fetchData = async (showLoading = true) => {
            try{
                if(showLoading) setIsLoading(true)
                const result : any = await data()

                if(result.error){
                    setIsError(true)
                    setErrorMessage(result.error)
                    return;
                }
                setHustleData(result.data)
            }
            catch(error){
                setIsError(true)
                setErrorMessage('An unexpected error occurred')
            }
            finally{
                if(showLoading) setIsLoading(false)
            }
        }
        fetchData(true)
        // update constantly, so we see the latest cards
        const interval = setInterval(() => {
            fetchData(false)
        }, 2000)
        return () => clearInterval(interval)
    },[])

    // filtering hustles
    const filteredData = hustleData.filter((hustle: any) => {
        if (!search) return true;

        const searchLower = search.toLowerCase();

        // Safely check each field
        const titleMatch = hustle.title?.toLowerCase().includes(searchLower);
        const descMatch = hustle.description?.toLowerCase().includes(searchLower);
        const catMatch = hustle.category?.toLowerCase().includes(searchLower);
        const tagsMatch = hustle.category?.toLowerCase().includes(searchLower)

        return titleMatch || descMatch || catMatch || tagsMatch;
    })


    return( 
        <>   
            <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50">
                <Activity mode = {isError ? 'visible' : 'hidden'}>
                    <Error message = {errorMessage}/>
                </Activity>   
            </div>

            <div className="relative min-h-[200px]">
                <Activity mode={isLoading ? 'visible' : 'hidden'}>
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-950/50 backdrop-blur-sm rounded-xl">
                        <Loader/>
                    </div>
                </Activity>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">            
                    {filteredData.map((hustle : any) => (
                        <MyHustlesCard
                            key = {hustle.id} 
                            hustle = {hustle}/>
                    ))}
                </div>
            </div>
        </>
    )
}