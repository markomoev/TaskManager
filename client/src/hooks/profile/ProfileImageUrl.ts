import { supabase } from '../../client';

export default function ProfileImageUrl(path: string) {
    const { data } = supabase
        .storage
        .from('user_avatar')
        .getPublicUrl(path);
    return data.publicUrl;
}