/**
 * İlk olarak, "Component Pattern" görülüyor. React bileşenleri, kodun daha düzenli olması ve bileşenler
 *  arasında sağlam bir iletişim sağlamak amacıyla bu desene uygun şekilde düzenlenmiş. 
 * `SearchContent` bileşeni, `MediaItem` ve `LikeButton` bileşenlerini içerir ve bu bileşenler arasında sıkı bir ilişki oluşturur.
 
 * İkinci olarak, "Singleton Pattern": `useOnPlay` kancası gibi tek bir yerden tüm şarkıların oynatılması ve duraklatılması 
 * gibi işlemlerin yönetilmesi için bu desen uygulanabilir. 
 * Bu, uygulamanın genelinde tek bir nesnenin kullanılmasını ve tutarlılığı sağlar.
 
 * Üçüncü olarak "Observer Pattern": 
 * Kod içinde doğrudan belirtilmemiş olsa da,`useOnPlay` kancası veya diğer kancalar,
 * bileşenlerin belirli olayları gözlemlemesini ve bu olaylara tepki vermesini sağlar. 
 * Bu sayede, bileşenlerin birbirleriyle etkileşimi kolaylaşır ve uygulama daha dinamik hale gelir.
 
 * Dördüncü olarak, "Factory Pattern": Özellikle, `LikeButton` veya `MediaItem` bileşenleri, 
 * fabrika desenine benzer bir yapı kullanarak bileşenleri oluşturabilir. Bu desen, belirli koşullara göre farklı 
 * türde bileşenlerin oluşturulmasını sağlar ve kodun daha esnek olmasını sağlar.
 
 * Son olarak, "State Pattern": Özellikle, `useOnPlay` gibi kancaların şarkıların oynatılma durumunu yönetmek için kullanılması,
 *  durum deseni benzeri bir yapıyı yansıtabilir. Bu desen, uygulamanın belirli durumlarını daha organize edilmiş
 *  bir şekilde yönetmeye yardımcı olur.
 */

"use client";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";

interface SearchContentProps {
  songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({
  songs
}) => {
  const onPlay = useOnPlay(songs);
  if (songs.length === 0) {
    return (
      <div
        className="
          flex
          flex-col
          gap-y-2
          w-full
          px-6
          text-neutral-400
        "
      >
        No songs found;
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-2 w-full px-6"> 
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

export default SearchContent;