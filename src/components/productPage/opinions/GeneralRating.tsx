import { useEffect, useState } from 'react'
import { ConfigProvider, Rate } from 'antd'
import { Opinion } from '@/types';

interface Props {
  opinions: Opinion[]
}

export const GeneralRating = ({ opinions }: Props) => {
  const [averageStars, setAverageStars] = useState<number>(0);

  useEffect(() => {
    if (opinions.length > 0) {
      const totalStars = opinions.reduce((acc, opinion) => acc + opinion.stars, 0);
      const average = totalStars / opinions.length;

      setAverageStars(average);
    }
  }, [opinions]);

  return (
    <div className='flex flex-col items-center gap-y-1'>
      <p className='text-5xl font-semibold mb-4'>{averageStars}<span className='text-3xl text-gray-500 font-light'> /6</span></p>
      <ConfigProvider
        theme={{
          components: {
            Rate: {
              starBg: 'rgb(200 200 200)',
              starColor: '#ffd100',
              starSize: 30
            }
          }
        }}
      >
        <Rate
          disabled
          allowHalf
          count={6}
          value={Math.round(averageStars * 2) / 2}
        />
      </ConfigProvider>
      <p className='text-lg text-gray-500'>({opinions.length})</p>
    </div>
  )
}
