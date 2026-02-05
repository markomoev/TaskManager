import {supabase} from "../../../client"

// user id import
import { useUserId } from "../../global/UserId"

export default async function useCreateHuslte(inputs: any) {
    try{
        const userResponse: any = await useUserId();
        const userId: any = userResponse.data[0];

        // inserting in the db table
        const {data: insertHustle, error: errorInsertingHustle} = await supabase
        .from('hustles')
        .insert({
            user_id: userId,
            title: inputs.title,
            description: inputs.description,
            status: inputs.status,
            category: inputs.category,
            tags: inputs.tags,
            visibility: inputs.visibility,
            initial_progress: inputs.initialProgress === '' ? 0 : parseInt(inputs.initialProgress),
        })

        // in case of error while inserting data in the table
        if(errorInsertingHustle){
            return {error: "Error while inserting the data", data: null}
        }

        return {error: null, data: insertHustle}

    }
    catch(error){
        return {error: "An unexpected error occurred!", data: null}
    }
}