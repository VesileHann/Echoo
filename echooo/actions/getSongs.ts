/**
 *  Facade Patternkullanılarak Supabase ile etkileşim sağlanır. createServerComponentClient işlevi, 
 * Supabase istemcisini oluşturur ve gizli detayları kullanıcıdan saklayarak arayüzü basitleştirir.
 * Ayrıca, Singleton Pattern (Tekil Desen) kullanılarak bu istemci bir kez oluşturulur ve daha sonra yeniden kullanılır, 
 * böylece gereksiz kaynak kullanımı önlenir. Kod ayrıca hata yönetimine odaklanır 
 * ve olası hataları konsola yazdırır.
 */

import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies} from "next/headers";

const getSongs = async (): Promise<Song[]> => {
    const supabase =createServerComponentClient({
        cookies:cookies
    });
    const {data,error} = await supabase
    .from('songs')
    .select('*')
    .order('created_at',{ascending:false});

    if(error){
        console.log(error);
    }
    return (data as any) || [];
};



export default getSongs;