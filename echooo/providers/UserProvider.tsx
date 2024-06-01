"use client";

import { MyUserContextProvider } from "@/hooks/useUser";

/**
 * UserProvider bileşeni, MyUserContextProvider bileşenini sağlar.
 * 
 * Bu bileşen, Bileşen Sağlayıcı (Component Provider) tasarım desenini kullanır.
 * Bileşen Sağlayıcı deseni, bileşenlerin içeriğini ve davranışını kapsüller,
 * böylece diğer bileşenler tarafından kolayca kullanılabilir hale gelir.
 * 
 * UserProvider, MyUserContextProvider bileşenini kullanarak kullanıcı bağlamını sağlar
 * ve bu bağlamı alt bileşenlere sunar.
 */
interface UserProvierProps {
  children: React.ReactNode;
};

const UserProvier: React.FC<UserProvierProps> = ({
  children
}) => {
  return (
    <MyUserContextProvider>
      {children}
    </MyUserContextProvider>
  )
};

export default UserProvier;