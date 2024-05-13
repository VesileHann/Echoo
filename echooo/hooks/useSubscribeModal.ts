import {create} from "zustand";

interface SubscribeStore{
    isOpen:boolean;
    onOpen:() =>void;
    onClose:()=>void;
};

const useSubscribe = create <SubscribeStore>((set)=> ({
    isOpen:false,
    onOpen:() => set({isOpen:true}),
    onClose: () => set({isOpen:false}),
}));

export default useSubscribe;