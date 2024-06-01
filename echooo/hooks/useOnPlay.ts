import { Song } from '@/types'; // Song tipini import eder
import usePlayer from './usePlayer'; // Player hook'unu import eder
import useAuthModal from './useAuthModal'; // AuthModal hook'unu import eder
import { useUser } from './useUser'; // User hook'unu import eder

// useOnPlay hook'u, şarkıların çalınmasını yönetir
const useOnPlay = (songs: Song[]) => {
  const player = usePlayer(); // Player hook'unu kullanır
  const authModal = useAuthModal(); // AuthModal hook'unu kullanır
  const { user } = useUser(); // User hook'unu kullanır

  // onPlay fonksiyonu, belirli bir şarkıyı çalar
  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen(); // Kullanıcı yoksa kimlik doğrulama modalını açar
    }

    player.setId(id); // Player'a şarkı ID'sini ayarlar
    player.setIds(songs.map((song) => song.id)); // Player'a tüm şarkı ID'lerini ayarlar
  }

  return onPlay; // onPlay fonksiyonunu döner
}

export default useOnPlay; // useOnPlay hook'unu dışa aktarır
