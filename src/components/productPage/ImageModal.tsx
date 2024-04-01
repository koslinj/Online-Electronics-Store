import Modal from "react-modal";
import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Product } from "@/types";

interface Props {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  product: Product | undefined
}

export const ImageModal = ({ showModal, setShowModal, product }: Props) => {
  return (
    <Modal
      ariaHideApp={false}
      style={{
        content: {
          color: 'lightsteelblue',
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "0px",
          border: "2px solid black",
          borderRadius: "16px",
        }
      }}
      isOpen={showModal}
      onRequestClose={() => setShowModal(false)}
    >
      <img className="w-full" src={product?.imageUrl} alt={product?.name} />
      <button onClick={() => setShowModal(false)}>
        <X className="size-12 text-black hover:scale-125 absolute top-5 right-5 duration-200" />
      </button>
    </Modal>
  )
}
