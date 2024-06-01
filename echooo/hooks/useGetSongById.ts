/**'
 * SRP'ye tek bir şarkıyı id ile alarak alma görevi olmasından dolatı uyum sağlarken OCP'ye mevcut durumu bozmadan yeni durumlar ekleyebilmesiyle uygundur.
 *Hook, içindeki useEffect ile id değişikliklerini izler. 
  Bu, Observer Pattern'ına benzer bir davranış sergiler, çünkü hook, belirli bir değeri ve onun değişikliklerini izleyerek tepki verir.
 */

  import { Song } from "@/types"; 
  import { useSessionContext } from "@supabase/auth-helpers-react"; // Supabase oturum yönetimi hook'u
  import { useEffect, useMemo, useState } from "react"; // React hook'ları
  import toast from "react-hot-toast"; // Hata ve bilgi mesajları için toast kütüphanesi
  
  const useGetSongById = (id?: string) => {
    const [isLoading, setIsLoading] = useState(false); // Şarkı yükleniyor mu durumunu tutar
    const [song, setSong] = useState<Song>(); // Şarkı bilgisini tutar
    const { supabaseClient } = useSessionContext(); // Supabase oturum yönetimi
  
    useEffect(() => {
      if (!id) {
        return; // ID yoksa herhangi bir işlem yapmaz
      }
  
      setIsLoading(true); // Yükleniyor durumunu true yapar
  
      const fetchSong = async () => {
        const { data, error } = await supabaseClient
          .from("songs")
          .select("*")
          .eq("id", id)
          .single(); // Supabase'den şarkıyı alır
  
        if (error) {
          setIsLoading(false); // Hata durumunda yükleniyor durumunu false yapar
          return toast.error(error.message); // Hata mesajını gösterir
        }
  
        setSong(data as Song); // Şarkı bilgisini günceller
        setIsLoading(false); // Yükleniyor durumunu false yapar
      }
  
      fetchSong(); // Şarkıyı almayı başlatır
    }, [id, supabaseClient]); // ID veya supabaseClient değiştiğinde effect yeniden çalışır
  
    return useMemo(() => ({
      isLoading,
      song
    }), [isLoading, song]); // isLoading ve song değerlerini memoize eder
  };
  
  export default useGetSongById;
  