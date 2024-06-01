import { Song } from "@/types"; // Song tipini import eder
import { useSupabaseClient } from "@supabase/auth-helpers-react"; // Supabase client hook'u

// useLoadImage hook'u, bir şarkının görüntü URL'sini yüklemek için kullanılır
const useLoadImage = (song: Song) => {
  const supabaseClient = useSupabaseClient(); // Supabase client'ını alır

  if (!song) {
    return null; // Song nesnesi yoksa null döner
  }

  // Supabase'den görüntü URL'sini alır
  const { data: imageData } = supabaseClient
    .storage
    .from('images')
    .getPublicUrl(song.image_path);

  return imageData.publicUrl; // Görüntü URL'sini döner
};

export default useLoadImage;
