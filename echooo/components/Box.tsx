import { twMerge } from "tailwind-merge";

interface BoxProps {
  children: React.ReactNode;
  className?: string; // Dekoratör (Decorator) deseni: Sınıfın işlevselliğini genişletmek için dinamik olarak ek özellikler sağlar.
}

// Dekoratör (Decorator) deseni kullanılıyor çünkü sınıfın işlevselliği, dışarıdan gelen className parametresi ile genişletilebiliyor.
const Box: React.FC<BoxProps> = ({
  children,
  className // Ek özelliklerin uygulanacağı sınıf adı
}) => {
  return (
    <div className={twMerge(`bg-neutral-900 rounded-lg h-fit w-full`, className)}>
      {children} {/* Kompozit (Composite) deseni: Diğer bileşenleri içine alarak bir bileşik bileşen oluşturur. */}
    </div>
  );
}

export default Box;
