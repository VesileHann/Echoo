/**
 * Single Responsibility Principle açısından,
 *  `ModalProvider` bileşeni modal gösterim işlevini yerine getiriyor ve diğer işlevlerle karışmıyor.
 *  Bu sayede her bileşenin tek bir sorumluluğu var ve değişikliklerin yönetimi daha kolay oluyor.
 
 * Open/Closed Principlebakımından, 
 * yeni modallar eklemek veya mevcutları değiştirmek için kodu değiştirmek gerekmiyor. 
 * Yani, kod genişletmeye açık ancak değişikliklere kapalı.
 
 * Liskov Substitution Principle açısından, 
 * alt türler üst türlerle yer değiştirebilirlik ilkesine uygun olarak tasarlanmış değil çünkü bu örnekte belirli bir alt tür yok.
 
 * Interface Segregation Principle olarak, bileşenler arasında net bir sınıf ayrımı var ve her biri kendi görevlerini yerine getiriyor. 
 * Bu, gereksiz bağımlılıkları önler.
 
 * Dependency Inversion Principle açısından,
 *  `ModalProvider` bileşeni modalları kullanmak için doğrudan bir bağımlılık yerine bileşenler arası bir arayüz sağlıyor. 
 * Bu sayede bağımlılıklar soyutlanmış durumda ve değişiklikler daha esnek hale geliyor.
 */
"use client";

import AuthModal from '@/components/AuthModal';
import UploadModal from '@/components/UploadModal';
import { useEffect, useState } from 'react';

const ModalProvider = () => {

  const [isMounted, setIsMounted] = useState(false);

  // Bileşen yüklenme sürecini takip eder ve isMounted değişkenini güncellemek için useEffect hook'unu kullanır
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Eğer bileşen henüz tam olarak yüklenmemişse, boş bir görünüm döndürür
  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <AuthModal />
      <UploadModal />
    </div>
  );
};

export default ModalProvider;