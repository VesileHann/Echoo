"use Client";

import { Toaster } from "react-hot-toast";

/**
 * ToasterProvider bileşeni, react-hot-toast kütüphanesinin Toaster bileşenini sağlar
 * ve toast bildirimleri için özelleştirilmiş bir stil yapılandırması sunar.
 * 
 * Bu bileşen, Bileşen Sağlayıcı (Component Provider) tasarım desenini kullanır.
 * Bileşen Sağlayıcı deseni, bileşenlerin içeriğini ve davranışını kapsüller,
 * böylece diğer bileşenler tarafından kolayca kullanılabilir hale gelir.
 * 
 * ToasterProvider, toast bildirimleri ile ilgili tüm mantığı kapsüller ve
 * diğer bileşenlerin bu mantığa erişmesini sağlar.
 */
const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          background: "#333333",
          color: "#ffffff",
        }
      }}
    />
  )
}

export default ToasterProvider;