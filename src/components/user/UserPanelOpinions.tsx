import { fetchOpinionsByProductId, fetchOpinionsByUsername } from "@/api/opinions";
import { Opinion, Product } from "@/types";
import { useEffect, useState } from "react";
import { Stars } from "../productPage/Stars";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

interface Props {
  user: {
    username: string
    role: string
    firstName: string
  }
}

export const UserPanelOpinions = ({ user }: Props) => {
  const { t } = useTranslation()
  const [opinions, setOpinions] = useState<Opinion[]>([])
  const formatStr = 'dd/MM/yyyy'

  useEffect(() => {
    const fetchData = async () => {
      const _ops = await fetchOpinionsByUsername(user.username)
      setOpinions(_ops!)
    }

    fetchData()

  }, [user.username])

  return (
    <div>
      <h2 className="text-3xl">{t('opinions')}</h2>
      <div className="mt-8">
        {opinions?.map(opinion => (
          <div key={opinion.id} className="space-y-1">
            <p className="font-semibold italic">{opinion.user}</p>
            <div className="flex gap-x-4">
              <Stars n={opinion.stars} />
              <p>{format(opinion.createdAt, formatStr)}</p>
            </div>
            <p className="text-lg">{opinion.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}