import { Song } from "@/types"; // Song tipini import eder
import { useSupabaseClient } from "@supabase/auth-helpers-react"; // Supabase client hook'u

// useLoadSongUrl hook'u, bir şarkının URL'sini yüklemek için kullanılır
const useLoadSongUrl = (song: Song) => {
  const supabaseClient = useSupabaseClient(); // Supabase client'ını alır

  if (!song) {
    return ''; // Song nesnesi yoksa boş string döner
  }

  // Supabase'den şarkı URL'sini alır
  const { data: songData } = supabaseClient
    .storage
    .from('songs')
    .getPublicUrl(song.song_path);

  return songData.publicUrl; // Şarkı URL'sini döner
};

export default useLoadSongUrl;
