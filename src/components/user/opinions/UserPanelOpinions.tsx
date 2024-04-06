import { fetchOpinionsByUsername } from "@/api/opinions";
import { Opinion, User } from "@/types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { UserPanelOneOpinion } from "./UserPanelOneOpinion";

interface Props {
  user: User
}

export const UserPanelOpinions = ({ user }: Props) => {
  const { t } = useTranslation()
  const [opinions, setOpinions] = useState<Opinion[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const _ops = await fetchOpinionsByUsername(user.username)
      setOpinions(_ops!)
    }

    fetchData()

  }, [user.username])

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8">{t('opinions')}</h2>
      <h3 className="text-2xl">{t('yourOpinions')}<span className="text-gray-500">({opinions.length})</span></h3>
      <div className="mt-2 border-t-2 border-gray-400">
        {opinions?.map(opinion => (
          <UserPanelOneOpinion key={opinion.id} opinion={opinion} />
        ))}
      </div>
    </div>
  )
}