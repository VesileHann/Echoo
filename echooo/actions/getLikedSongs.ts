/**
 * Facade Pattern kullanarak Supabase ile etkileşimi basitleştiren bir arayüz sağlar. 
 * Ayrıca, Singleton Pattern ile createServerComponentClient işlevi, 
 * gereksiz kaynak kullanımını önlerken kullanıcıların tek bir istemci örneğini paylaşmasını sağlar. 
 * Kod ayrıca hata işleme üzerine odaklanarak, hata durumlarını ele alır ve konsola hata mesajlarını yazdırır veya işlemi sonlandırarak
 *  güvenilirlik sağlar. 
 */
import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies} from "next/headers";

const getLikedSongs = async (): Promise<Song[]> => {
    const supabase =createServerComponentClient({
        cookies:cookies
    });
    const {
        data:{
            session
        }
    } =await supabase.auth.getSession();

    const {data,error} = await supabase
    .from('liked_songs')
    .select('*,songs(*)')
    .eq('user_id',session?.user?.id)
    .order('created_at',{ascending:false});

    if(error){
        console.log(error);
        return[];
    }
    if(!data)
        {
            return [];
        }
    return data.map((item)=> ({
        ...item.songs
    }))
};



export default getLikedSongs;