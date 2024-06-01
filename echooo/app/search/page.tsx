/**
 * SOLID prensipleri: Tek sorumluluk ilkesine uygun olarak, `Search` bileşeni yalnızca arama parametreleriyle 
 * ilgilenir ve şarkıları getirip göstermekle sorumludur. Açık/Kapalı ilkesi doğrultusunda,
 * kod genişletilebilirlik için uygun bir yapı sunar; yeni bir arama işlevi eklemek istendiğinde mevcut kod 
 * değiştirilmeden genişletilebilir. Arayüz Ayırma ilkesi gereğince, bileşen sadece arama parametreleriyle
 * ilgili olan bir arayüz kullanır, bu da gereksiz bağımlılıkları önler. Bağımlılıkları Tersine Çevirme ilkesine 
 * uyum ise, dış kaynaklardan veri alırken bağımlılıkları doğrudan içermeyip, dış kancalar aracılığıyla alır,
 * bu da esnek bir yapı sunar.
 */
import getSongsByTitle from "@/actions/getSongsByTitle";
import Header from "@/components/Header";
import SearchContent from "./components/SearchContent";
import SearchInput from "@/components/SearchInput";


interface SearchProps {
  searchParams: {
    title: string;
  }
};

export const revalidate = 0;

const Search = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsByTitle(searchParams.title);

  return (
    <div
      className="
        bg-neutral-900
        rounded-lg
        h-full
        w-full
        overflow-hidden
        overflow-y-auto
      ">
        <Header className="from-bg-neutral-900">
          <div className="mb-2 flex flex-col gap-y-6">
            <h1 className="text-white text-3xl font-semibold">
              Search
            </h1>
            <SearchInput />
          </div>
        </Header>
        <SearchContent songs={songs} />
    </div>
  )
};

export default Search;
