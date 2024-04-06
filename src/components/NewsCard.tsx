import React from 'react'

interface Props {
  data: {
    image: string
    title: string
    time: string
    comments: string
  }
}

export const NewsCard = ({ data }: Props) => {
  return (
    <div className='cursor-pointer'>
      <div className='border-2 rounded-xl border-gray-300 px-2'>
        <img src={data.image} alt="" />
      </div>
      <h3 className='font-semibold text-2xl'>{data.title}</h3>
      <div className='flex items-center gap-2'>
        <p>{data.time}</p>
        <p className='font-bold'>·</p>
        <p>{data.comments}</p>
      </div>
    </div>
  )
}
