import {supabase} from "../../../client"

//user id
import {useUserId} from "../../global/UserId"

export default function useLoadHustle(){
    
    const loadHustle = async () => {
        try {
            const userReturn: any = await useUserId();            
            const userId = userReturn.data[0];

            const { data: hustleLoad, error: hustleLoadingError } = await supabase
            .from('hustles')
            .select('*')
            .eq("user_id", userId)

            if(hustleLoadingError){
                return {error: hustleLoadingError.message, data: null}
            }
            
            return {error: null,  data: hustleLoad}
        } catch(error){
            return{error: "An unexpected error occurred", data: null}
        }
    }

    return { error: null, data: loadHustle };
}