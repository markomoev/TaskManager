import {supabase} from "../../../client"

export default async function useCreateMilestone(hustle_id: number, input: string){
    try{
        // inserting in the db table
        const {data: insertMilestone, error: errorInsertingMilestone} = await supabase
        .from('milestones')
        .insert({
            hustle_id: hustle_id,
            title: input,
            status: "done"
        })
        .select()

        if (errorInsertingMilestone){
            return{data: null, error: "Error while inserting data"}
        }

        return {data: insertMilestone, error: null}
    }
    catch(error){
        return{data: null, error: "An unexpected error occurred"}
    }
}