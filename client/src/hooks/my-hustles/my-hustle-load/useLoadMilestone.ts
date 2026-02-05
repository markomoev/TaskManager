import {supabase} from "../../../client"

export default async function useLoadMilestone(hustle_id : number){
    try{   
        const { data: fetchingMilestone, error: errorFetchingMilestone } = await supabase
        .from('milestones')
        .select('*')
        .eq("hustle_id", hustle_id)

        if (errorFetchingMilestone){
            return {data: null,  error: "Error in fetching milestones"}
        }

        return {data: fetchingMilestone, error: null}
    }
    catch(error){
        return {data: null, error: "An unexpected error occurred"}
    }
}