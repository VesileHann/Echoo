
// 1. Facade Pattern: `Dialog.Root`, `Dialog.Overlay`, `Dialog.Content`, ve `Dialog.Title` gibi bileşenler, Radix UI tarafından 
//sağlanan ve arka planda karmaşık mantıkları yöneten bir arayüz sağlayıcısı gibi davranıyor. 
//Bu, kullanıcının Modal bileşenini basit bir şekilde kullanmasına olanak tanır.

// 2. State Pattern: `isOpen` ve `onChange` prop'ları aracılığıyla Modal'ın açık veya kapalı olduğunu ve bu durumun değişimini
// yönetiriz. Bu, bileşenin durumunu ve davranışını kontrol etmek için kullanılır.

// 3. Builder Pattern: Modal bileşeninin içeriği, başlık ve açıklama gibi bileşenlerle birlikte yapılandırılır. 
//Bu, bileşenin kullanımını kolaylaştırır ve yapılandırmasını modüler hale getirir.

// 4. Singleton Pattern: Radix UI'nin sağladığı bileşenler, tek bir örnekle temsil edilir ve genellikle 
//içsel olarak bu örnek üzerinden yönetilir. Bu, uygulamanın bellek kullanımını optimize edebilir ve aynı bileşenin farklı yerlerdeki kullanımlarını aynı temel özelliklerle tutarlı hale getirebilir.


import * as Dialog from '@radix-ui/react-dialog';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onChange,
  title,
  description,
  children
}) => {
  return (
    <Dialog.Root
      open={isOpen}
      defaultOpen={isOpen}
      onOpenChange={onChange}
    >
      <Dialog.Portal>
        <Dialog.Overlay
          className="
            bg-neutral-900/90
            backdrop-blur-sm
            fixed
            inset-0
          "
        />
        <Dialog.Content
          className="
            fixed
            drop-shadow-md
            border
            border-neutral-700
            top-[50%]
            left-[50%]
            max-h-full
            h-full
            md:h-auto
            md:max-h-[85vh]
            w-full
            md:w-[90vw]
            md:max-w-[450px]
            translate-x-[-50%]
            translate-y-[-50%]
            rounded-md
            bg-neutral-800
            p-[25px]
            focus:outline-none
          "
        >
          <Dialog.Title
            className="
              text-xl
              text-center
              font-bold
              mb-4
            "
          >
            {title}
          </Dialog.Title>
          <Dialog.Description
            className="
              mb-5
              text-sm
              leading-normal
              text-center
            "
          >
            {description}
          </Dialog.Description>
          <div>
            {children}
          </div>
          <Dialog.Close asChild>
            <button
              className="
                text-neutral-400
                hover:text-white
                absolute
                top-[10px]
                right-[10px]
                inline-flex
                h-[25px]
                w-[25px]
                appearance-none
                items-center
                justify-center
                rounded-full
                focus:outline-none
              "
            >
              <IoMdClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal; 