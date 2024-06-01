/**
 * SOLID prensiplerini uygulamaya çalışarak tasarlanmıştır. 
 * SupabaseProvider bileşeni, Single Responsibility Principle'a uygun olarak yalnızca Supabase istemcisini başlatır ve sağlar.
 *  Open/Closed Principle ise kodun genişlemeye açık, ancak mevcut yapıyı değiştirmeye kapalı olduğunu gösterir; 
 * yeni bir bağlam sağlayıcı eklemek istendiğinde mevcut yapı değişmez, sadece yeni bileşen eklenir. 
 * Liskov Substitution Principle, createClientComponentClient fonksiyonundan dönen istemcinin beklenen türde bir 
 * Supabase istemcisi olduğunu garanti eder. 
 * Interface Segregation Principle, bileşenler arasında net ve spesifik arayüzler kullanarak gereksiz bağımlılıkları azaltır.
 * Son olarak, Dependency Inversion Principle, bağımlılıkları tersine çevirerek 
 * bağımlılıklar doğrudan sağlamak yerine bir bağlam sağlayıcı aracılığıyla enjekte eder. 
 * Bu prensipler kodun okunabilirliğini, bakımını ve genişletilebilirliğini artırır.
 

 
 * Composition Pattern:SupabaseProvider, SessionContextProvider, çocuk bileşenler, 
 * bileşenler arasında bir kompozisyon yapısı oluşturur.
 */
"use client";

import { Database } from "@/types_db";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";

interface SupabaseProviderProps {
  children: React.ReactNode;
};

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({
  children
}) => {
  const [supabaseClient] = useState(() => 
    createClientComponentClient<Database>()
  );

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  )
}

export default SupabaseProvider;