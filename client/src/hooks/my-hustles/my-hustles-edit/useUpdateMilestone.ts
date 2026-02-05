import {supabase} from "../../../client"

export default async function useUpdateMilestone(milestones: any[]){
    try{
        const updates = milestones.map((ms) => ({
            id: ms.id,
            hustle_id: ms.hustle_id,
            title: ms.title,
            status: ms.status || 'done'
        }))

        const { data, error } = await supabase
        .from('milestones')
        .upsert(updates)
        .select()


        if (error) {
            console.error(error)
            return {error: error.message, data: null}
        }

        return {error: null, data: data}
    }
    catch(error){
        return{error: "An unexpected error occured!", data: null}
    }
}