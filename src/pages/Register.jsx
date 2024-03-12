import { useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import axios from "axios";

export const Register = () => {
  const { setToken } = useAuth();

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });

      const token = response.data.token;

      setToken(token);
      // navigate("/profile", { replace: true });
    } catch (error) {
      console.error("Error during register:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="shadow-card rounded-lg p-4 flex flex-col gap-8 my-6 w-72">
        <h2 className="font-bold text-2xl">Załóż konto</h2>
        <input
          className='py-1 px-2 outline-none border-gray-700 border-2 rounded-md'
          type="firstName"
          placeholder="Imię"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className='py-1 px-2 outline-none border-gray-700 border-2 rounded-md'
          type="lastName"
          placeholder="Nazwisko"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
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

        <button onClick={handleRegister} className="bg-green-700 text-white rounded-lg p-2">
          Załóż konto
        </button>
      </div>

      <div>
        <h2 className="text-lg">
          Masz już konto? &nbsp;
          <span className="text-green-700 hover:underline">
            <Link to="/login">Zaloguj się</Link>
          </span>
        </h2>

      </div>


    </div>
  );
};
