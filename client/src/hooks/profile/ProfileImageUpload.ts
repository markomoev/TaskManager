import {supabase} from '../../client'
// hook for user id and email
import { useUserId } from '../global/UserId';

export default async function useImageUpload(file: File) {
    try {
        // geting user id
        const userDataResponse = await useUserId();
    
        if (userDataResponse.error || !userDataResponse.data) {
            return { error: userDataResponse.error || "User not found", data: null };
        }

        const user_id = userDataResponse.data[0];

        // checking if there is problem with the uploaded file and taking the file path
        if (!file || !file.name) {
            return {error: "Invalid file object", data: null}
        }

        const filePath = `${user_id}/${file.name}`;

        // upload the image to the storage
        const { error: uploadError } = await supabase.storage
            .from("user_avatar")
            .upload(filePath, file, { upsert: true });

        if (uploadError) {
            return {error: uploadError.message, data: null}
        }

        // getting the public url
        const { data: publicUrl } = supabase
            .storage
            .from('user_avatar')
            .getPublicUrl(filePath);


        // save the url in the users table
        const { error: uploadingUrl } = await supabase
            .from('users')
            .update({ avatar_url: publicUrl.publicUrl })
            .eq('id', user_id);

        if (uploadingUrl) {
            return {error: uploadingUrl.message, data: null}
        }

        return {error: null, data: publicUrl.publicUrl};

    } catch (error) {
        return {error: "An unexpected error occurred", data: null}
    }
}