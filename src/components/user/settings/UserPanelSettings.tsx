import { fetchOpinionsByUsername } from "@/api/opinions";
import { Opinion, User } from "@/types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  user: User
}

export const UserPanelSettings = ({ user }: Props) => {
  const { t } = useTranslation()

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8">{t('accountSettings')}</h2>
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <p className="text-2xl text-gray-600">{t('name')}:</p>
          <p className="text-2xl font-semibold">{user.firstName}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-2xl text-gray-600">{t('surname')}:</p>
          <p className="text-2xl font-semibold">{user.lastName}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-2xl text-gray-600">E-mail:</p>
          <p className="text-2xl font-semibold">{user.username}</p>
        </div>
      </div>
    </div>
  )
}