/**
 * SOLID prensipleri: `getSongsByTitle` fonksiyonu, yalnızca belirli bir şarkı başlığına göre şarkıları 
 * getirmekle sorumludur, `getSongs` fonksiyonu ise tüm şarkıları getirmekle sorumludur. `createServerComponentClient`
 * işlevi, Supabase istemcisini oluştururken ve gizli detayları yönetirken tek sorumluluk ilkesine uygun olarak davranır. 
 * Bu prensipler sayesinde, kodun bakımı kolaylaşır, yeni gereksinimler eklendiğinde kodun değiştirilmesine gerek kalmaz
 *  ve kod daha esnek ve genişletilebilir hale gelir.
 */
import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies} from "next/headers";
import getSongs from "./getSongs";

const getSongsByTitle = async (title:string): Promise<Song[]> => {
    const supabase =createServerComponentClient({
        cookies:cookies
    });
    if(!title)
        {
            const allSongs =await getSongs();
            return allSongs;
        }
    const {data,error} = await supabase
    .from('songs')
    .select('*')
    .ilike('title',`%${title}%`)
    .order('created_at',{ascending:false});

    if(error){
        console.log(error);
    }
    return (data as any) || [];
};



export default getSongsByTitle;