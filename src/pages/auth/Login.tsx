import { ChangeEvent, FormEvent, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { message } from "antd";
import { MdError } from "react-icons/md";

export const Login = () => {
  const { t } = useTranslation()
  const { setToken } = useAuth();

  const User = z.object({
    email: z.string().email(t("badEmail")),
    password: z.string().min(4, t("badPassword"))
  });
  type User = z.infer<typeof User>;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string, password?: string }>();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let result = User.safeParse({ email: email, password: password })
    if (!result.success) {
      const ob = result.error.flatten().fieldErrors
      setErrors({ email: ob.email?.[0], password: ob.password?.[0] });
      console.log(result.error.flatten().fieldErrors)
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      const token = response.data.token;

      setToken(token);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 403) {
          console.error("Error during login:", error);
          message.error({
            content:
              <div className='flex items-center gap-3'>
                <MdError className='size-10 text-red-500' />
                <p className='text-xl'>{t('failedLogin')}</p>
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
      <form onSubmit={handleLogin} className="shadow-equal rounded-lg p-4 flex flex-col gap-8 my-6 w-72">
        <h2 className="font-bold text-2xl">{t("login")}</h2>
        <div className="h-12">
          <input
            className={`py-1 px-2 outline-none border-2 rounded-md w-full ${errors?.email ? 'border-red-600' : 'border-gray-700'}`}
            type="email"
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
          {t("login")}
        </button>
      </form>

      <h2 className="text-xl mb-4">{t("noAccount")}</h2>
      <Link to="/register">
        <button
          className="border-green-700 text-green-700 border-2 rounded-lg p-2 hover:scale-110 hover:bg-green-700 hover:text-white duration-200">
          {t("createAccount")}
        </button>
      </Link>
    </div>
  );
};
