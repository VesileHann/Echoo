import { create } from "zustand";

interface AuthModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
//State management pattern:Bu kısımda "zustand" kütüphanesi kullanılarak uygulamanın durumunu yönetmek ve paylaşmak için kullanılmıştır.
/**
 * SOLID:useAuthModal sadece modalın açık mı kapalı mı olduğuyla ilgilenir
 * daha fazla durum eklenebilirken mevcut durum duğrudan değişmeyeceğinden open close ilkesine de uyum sağlamıştır.
 */
const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAuthModal;