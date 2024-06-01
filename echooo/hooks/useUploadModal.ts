//State design pattern

import { create } from "zustand";

// UploadModalStore arayüzü, durum yönetimi için gerekli tipleri tanımlar
interface UploadModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

// useUploadModal hook'u, Zustand kullanarak modal durumunu yönetir
const useUploadModal = create<UploadModalStore>((set) => ({
  isOpen: false, // Başlangıçta modal kapalı
  onOpen: () => set({ isOpen: true }), // Modalı açan fonksiyon
  onClose: () => set({ isOpen: false }), // Modalı kapatan fonksiyon
}));

export default useUploadModal; // useUploadModal hook'unu dışa aktarır
