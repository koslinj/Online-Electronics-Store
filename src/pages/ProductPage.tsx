import { fetchProductByName } from "@/api/products";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import { X } from "lucide-react";

export const ProductPage = () => {
  const { productName } = useParams();
  const [product, setProduct] = useState<Product>()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const _prod = await fetchProductByName(productName!);
      setProduct(_prod);
    }

    fetchData()

  }, [productName])

  return (
    <div className="flex mt-10 max-w-6xl mx-auto border-4 py-6">
      <div className="w-2/5">
        <img className="cursor-pointer border-2" src={product?.imageUrl} alt={product?.name} onClick={() => setShowModal(true)} />
      </div>
      <div className="w-3/5">
        <h3 className="text-2xl font-semibold">{product?.name}</h3>
        <p>{product?.description}</p>
      </div>
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
    </div>
  )
}
