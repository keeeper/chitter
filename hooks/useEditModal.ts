import { create } from "zustand";

interface ILoginEditStore {
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void
}

const useEditModal = create<ILoginEditStore>((set)=>({
  isOpen: false,
  onOpen: () => set ({isOpen: true}),
  onClose: () => set ({isOpen: false})
}))

export default useEditModal;