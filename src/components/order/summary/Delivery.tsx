
interface Props {
  method: {
    desc: string
    icon: string
    price: number
    title: string
  }
}

export const Delivery = ({ method }: Props) => {

  return (
    <div className='bg-white p-4 rounded-xl'>
      <p className='text-2xl font-bold mb-3'>Dostawa</p>
      <div className="flex items-center gap-4">
        <p className="text-xl font-semibold">{method.title}</p>
        <img className="w-14" src={method.icon} alt="" />
      </div>
      <p className="text-xl">{method.desc}</p>
    </div>
  )
}
