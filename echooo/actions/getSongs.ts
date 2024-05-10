import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";

const getSongs = async (): Promise<Song[]> => {
    const supabase =createServerComponentClient({
        headers:headers,
        cookies:cookies
    })
}