"use client"

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface LikedContentProps {
  songs: Song[];
}
// Factory Pattern benzeri kullanım:LikeButton ve MediaITem fabrika deseni kullanımına benzer olarak düşünülebilir
const LikedContent: React.FC<LikedContentProps> = ({
  songs
}) => {
  const router = useRouter();
  const { isLoading, user } = useUser();

  const onPlay = useOnPlay(songs);

  // Observer Pattern kullanımı
  /* useEffect, kullanıcı yüklenirken ve kullanıcı durumu değiştiğinde bir olayı gözlemlemek ve bu olaya tepki vermek için kullanılıyor. 
   * Kullanıcı yüklenince veya durumu değiştiğinde, belirli bir işlem yapılması gerektiğini belirtmek için bu desen kullanılıyor.
   */

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [isLoading, user, router]);

  if (songs.length === 0) {
    return (
      <div className="
        flex
        flex-col
        gap-y-2
        w-full
        px-6
        text-neutral-400
      ">
        No liked songs.
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {songs.map((song) => (
        <div
          key={song.id}
          className="flex items-center gap-x-4 w-full"
        >
          <div className="flex-1">
            <MediaItem
              onClick={(id: string) => onPlay(id)}
              data={song}
            />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default LikedContent;