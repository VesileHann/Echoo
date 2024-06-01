/**
 * State Design pattern:Zustand kullanarak merkezi bir durum yönetimi sağlanır. Bu, state management pattern'a uygun bir yaklaşımdır.
 * 
 */

import { create } from "zustand";

// PlayerStore arayüzü, durum yönetimi için gerekli tipleri tanımlar
interface PlayerStore {
  ids: string[];
  activeId?: string;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
}

// usePlayer hook'u, Zustand kullanarak şarkı çalma durumunu yönetir
const usePlayer = create<PlayerStore>((set) => ({
  ids: [], // Başlangıçta boş bir ids dizisi
  activeId: undefined, // Başlangıçta aktif şarkı ID'si yok
  setId: (id: string) => set({ activeId: id }), // Aktif şarkı ID'sini ayarlayan fonksiyon
  setIds: (ids: string[]) => set({ ids: ids }), // Şarkı ID'lerini ayarlayan fonksiyon
  reset: () => set({ ids: [], activeId: undefined }), // Durumu sıfırlayan fonksiyon
}));

export default usePlayer; // usePlayer hook'unu dışa aktarır
