import { useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const { setToken } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      const token = response.data.token;

      setToken(token);
      // navigate("/profile", { replace: true });
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="shadow-card rounded-lg p-4 flex flex-col gap-8 my-6 w-72">
        <h2 className="font-bold text-2xl">Zaloguj się</h2>
        <input
          className='py-1 px-2 outline-none border-gray-700 border-2 rounded-md'
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className='py-1 px-2 outline-none border-gray-700 border-2 rounded-md'
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} className="bg-green-700 text-white rounded-lg p-2">
          Zaloguj się
        </button>
      </div>

      <h2 className="text-xl mb-4">Nie masz konta?</h2>
      <Link to="/register">
        <button
          className="border-green-700 text-green-700 border-2 rounded-lg p-2 hover:scale-110 hover:bg-green-700 hover:text-white duration-200">
          Załóż konto
        </button>
      </Link>
    </div>
  );
};
