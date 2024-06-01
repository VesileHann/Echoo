/**
 *  Factory Method ve Singleton design patternlerini kullanmaktadır. 
 *  createServerComponentClient fonksiyonu, bir Supabase istemcisi oluştururken Factory Method patternini kullanır.
 *  Bu sayede, istemci oluşturma işlemi ayrı bir sınıfa taşınır ve istemci nesnesi oluşturma süreci daha esnek hale gelir, 
 *  yeni istemci türleri kolayca eklenebilir. 
 *  Ayrıca, createServerComponentClient fonksiyonu, Singleton patternini uygular.
 *  Bu sayede, kodun herhangi bir yerinde Supabase istemcisine erişmek istendiğinde aynı istemci örneği kullanılır
 *  ve gereksiz istemci oluşturma işlemleri önlenir.
*/
import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies} from "next/headers";

const getSongsByUserId = async (): Promise<Song[]> => {
    const supabase =createServerComponentClient({
        cookies:cookies
    });
    const {data:sessionData,
        error:sessionError
    }= await supabase.auth.getSession();

    if(sessionError){
        console.log(sessionError.message);
        return [];
    }
    const {data,error} = await supabase
    .from('songs')
    .select('*')
    .eq('user_id',sessionData.session?.user.id)
    .order('created_at',{ascending:false});
    if(error)
        {
            console.log(error.message);
        }
    return (data as any) || [];
};





export default getSongsByUserId;