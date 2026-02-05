import { useState, useEffect } from 'react';
import { supabase } from '../../../../client';
import UserIcon from './icons/user.jpg';

export default function ProfileAvatar() {
  const [publicUrl, setPublicUrl] = useState<string>('');

  const loadProfileAvatar = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const user_id = user?.id;
    if (!user_id) return;
    const { data, error } = await supabase
      .from('users')
      .select('avatar_url')
      .eq('id', user_id);
    if (error) {
      console.error('Error in fetching avatar url: ' + error.message);
      return;
    }
    setPublicUrl(data?.[0]?.avatar_url || '');
  };

  useEffect(() => {
    loadProfileAvatar();
  }, []);

  return (
    <img
      src={publicUrl || UserIcon}
      alt="Profile Image"
      className="w-10 h-10 mt-1.5 rounded-full object-cover border border-amber-700"
    />
  );
}
