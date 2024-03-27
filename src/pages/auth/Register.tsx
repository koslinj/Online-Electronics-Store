import { ChangeEvent, FormEvent, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { Trans, useTranslation } from "react-i18next";
import { z } from "zod";
import { message } from "antd";
import { MdError } from "react-icons/md";

export const Register = () => {
  const { t } = useTranslation()
  const { setToken } = useAuth();

  const User = z.object({
    firstName: z.string().regex(new RegExp(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ'"\-\s]+$/), t("badFirstName")),
    lastName: z.string().regex(new RegExp(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ'"\-\s]+$/), t("badLastName")),
    email: z.string().email(t("badEmail")),
    password: z.string().min(4, t("badPassword"))
  });
  type User = z.infer<typeof User>;

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string, password?: string, firstName?: string, lastName?: string }>();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let result = User.safeParse({ email: email, password: password, firstName: firstName, lastName: lastName })
    if (!result.success) {
      const ob = result.error.flatten().fieldErrors
      setErrors({ email: ob.email?.[0], password: ob.password?.[0], firstName: ob.firstName?.[0], lastName: ob.lastName?.[0] });
      console.log(result.error.flatten().fieldErrors)
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", { firstName, lastName, email, password });
      const token = response.data.token;

      setToken(token);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          console.error("Error during login:", error);
          message.error({
            content:
              <div className='flex items-center gap-3'>
                <MdError className='size-10 text-red-500' />
                <p className='text-xl'>{t('existingEmail')}</p>
              </div>,
            icon: <></>
          });
        } else {
          console.error("Other Axios error:", error);
        }
      } else {
        console.error("Non-Axios error:", error);
      }
    }
  };

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value)
    setErrors({ ...errors, firstName: '' })
  }

  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value)
    setErrors({ ...errors, lastName: '' })
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setErrors({ ...errors, email: '' })
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    setErrors({ ...errors, password: '' })
  }

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleRegister} className="shadow-equal rounded-lg p-4 flex flex-col gap-8 my-6 w-72">
        <h2 className="font-bold text-2xl">{t("createAccount")}</h2>
        <div className="h-12">
          <input
            className={`py-1 px-2 outline-none border-2 rounded-md w-full ${errors?.firstName ? 'border-red-600' : 'border-gray-700'}`}
            type="firstName"
            placeholder={t("name")}
            value={firstName}
            onChange={handleFirstNameChange}
          />
          <p className="text-red-600">{errors?.firstName}</p>
        </div>
        <div className="h-12">
          <input
            className={`py-1 px-2 outline-none border-2 rounded-md w-full ${errors?.lastName ? 'border-red-600' : 'border-gray-700'}`}
            type="lastName"
            placeholder={t("surname")}
            value={lastName}
            onChange={handleLastNameChange}
          />
          <p className="text-red-600">{errors?.lastName}</p>
        </div>
        <div className="h-12">
          <input
            className={`py-1 px-2 outline-none border-2 rounded-md w-full ${errors?.email ? 'border-red-600' : 'border-gray-700'}`}
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={handleEmailChange}
          />
          <p className="text-red-600">{errors?.email}</p>
        </div>
        <div className="h-12">
          <input
            className={`py-1 px-2 outline-none border-2 rounded-md w-full ${errors?.password ? 'border-red-600' : 'border-gray-700'}`}
            type="password"
            placeholder={t("password")}
            value={password}
            onChange={handlePasswordChange}
          />
          <p className="text-red-600">{errors?.password}</p>
        </div>
        <button type="submit" className="bg-green-700 text-white rounded-lg p-2 duration-300 active:bg-green-900 hover:scale-105">
          {t("createAccount")}
        </button>
      </form>

      <div>
        <h2 className="text-lg">
          <Trans i18nKey="haveAccount">
            Masz już konto? &nbsp;
            <span className="text-green-700 hover:underline">
              <Link to="/login">Zaloguj się</Link>
            </span>
          </Trans>
        </h2>
      </div>
    </div>
  );
};
