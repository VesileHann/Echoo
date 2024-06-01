"use client";

import qs from "query-string";

import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "./Input";

// Bu bileşen Single Responsibility Principle (SRP) prensibine uygundur çünkü sadece arama girişini temsil eder ve kullanıcı tarafından yapılan arama sorgularını yönetir.
// Ayrıca, bu bileşen Strategy Pattern kullanır çünkü arama sorgularının nasıl işleneceği (örneğin, debouncing) dinamik olarak değiştirilebilir.
const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: '/search',
      query: query
    });

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <Input 
      placeholder="What do you want to listen to ?"
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
    />
  );
};

export default SearchInput;
