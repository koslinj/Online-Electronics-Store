import { useEffect } from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import { useBlocker, useNavigate } from 'react-router-dom';

export const Confirmation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate('/', {replace: true});
    }, 5000);

    return () => {
      clearTimeout(timeoutId); // Clear the timeout if the component unmounts before 5 seconds
    };
  }, [navigate]);

  let blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      nextLocation.pathname !== "/"
  );

  return (
    <div>
      <FaCheckCircle className='size-40 text-green-500 mt-16 mx-auto' />
      <h1 className="text-6xl text-center font-semibold mt-5">
        Dziękujemy za zakupy w naszym sklepie
      </h1>
      <h2 className="text-xl text-gray-600 text-center mt-10">
        W ciągu kilku minut na twój adres E-mail powinna dotrzeć wiadomość z potwierdzeniem przyjęcia zamówienia. Masz 30 minut na anulowanie zamówienia lub ewentualne zmiany. W przypadku problemów skontaktuj się z działem obsługi klienta
      </h2>
      <h2 className="text-2xl text-gray-700 text-center mt-10 italic">
        W ciągu kilku sekund zostaniesz przekierowany na stronę główną ...
      </h2>
    </div>
  )

}
