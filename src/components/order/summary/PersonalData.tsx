interface Props {
  data: {
    fullName: string
    street: string
    zipCode: string
    city: string
    email: string
    phone: string
  }
}

export const PersonalData = ({ data }: Props) => {

  return (
    <div className='bg-white p-4 rounded-xl'>
      <p className='text-2xl font-bold mb-4'>Dane osoby odbierającej</p>
      <p className='text-xl font-semibold mb-3'>{data.fullName}</p>
      <div className="space-y-1">
        <p className='text-xl'>{data.street}</p>
        <p className='text-xl'>{data.zipCode} {data.city}</p>
        <p className='text-xl'>{data.email}</p>
        <p className='text-xl'>{data.phone}</p>
      </div>
    </div>
  )
}