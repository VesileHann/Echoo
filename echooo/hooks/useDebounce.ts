/**'
 * SRP'ye tek bir değeri güncelemme işlevini yerine getirmesiyle uyum sapğlarken OCP'ye mevcut durumu bozmadan yeni durumlar ekleyebilmesiyle uygundur.
 * Observer:Hook, içindeki useEffect ile value ve delay değişikliklerini izler. 
 * Bu, Observer Pattern'ına benzer bir davranış sergiler, çünkü hook, belirli bir değeri ve onun değişikliklerini izleyerek tepki verir
 */


import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay || 500);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;