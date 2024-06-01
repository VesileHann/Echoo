"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";

// Bileşen bazlı tasarım deseni kullanılmıştır.

interface LibraryProps {
  songs: Song[];
}

const Library: React.FC<LibraryProps> = ({
  songs
}) => {
  const authModal = useAuthModal(); // Hook Deseni: AuthModal bileşeni kullanılırken özelleştirilmiş bir hook kullanılmıştır.
  const uploadModal = useUploadModal(); // Hook Deseni: UploadModal bileşeni kullanılırken özelleştirilmiş bir hook kullanılmıştır.
  const { user } = useUser(); // Hook Deseni: User bilgisi kullanılırken özelleştirilmiş bir hook kullanılmıştır.

  const onPlay = useOnPlay(songs); // Hook Deseni: Oynatma işlemi için özelleştirilmiş bir hook kullanılmıştır.

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    return uploadModal.onOpen(); 
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26} /> // Simge Deseni: İlgili simgeyi temsil eden bir simge bileşeni kullanılmıştır.
          <p className="text-neutral-400 font-medium">
            Your Library
          </p>
        </div>
        <AiOutlinePlus 
          onClick={onClick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        /> // Simge Deseni: İlgili simgeyi temsil eden bir simge bileşeni kullanılmıştır.
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.map((item) => (
          <MediaItem
            onClick={(id: string) => onPlay(id)}
            key={item.id}
            data={item}
          /> 
        ))}
      </div>
    </div>
  )
}

export default Library;
