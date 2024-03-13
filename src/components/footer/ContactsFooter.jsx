import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const ContactsFooter = () => {
  return (
    <div>
      <h3 className='font-bold mb-2'>Kontakt</h3>
      <ul className="space-y-4">
        <li className="group">
          <div className="flex items-start gap-4 cursor-pointer">
            <FaPhoneAlt className="size-5 mt-1" />
            <div>
              <p className="text-lg group-hover:underline">48 111 222 333</p>
              <div className="flex gap-4">
                <p className="text-xs cursor-default">pon. - pt.<br />sob. - niedz.</p>
                <p className="text-xs cursor-default">8:00 - 21:00<br />8:00 - 19:00</p>
              </div>
            </div>
          </div>
        </li>
        <li className="flex gap-4 items-center hover:underline hover:cursor-pointer">
          <IoIosMail className="size-6" />
          <p>electrostore@gmail.com</p>
        </li>
        <li className="flex gap-4 items-center hover:underline hover:cursor-pointer">
          <FaLocationDot className="size-6" />
          <p>Salony ELECTROstore</p>
        </li>
        <li className="flex gap-6 text-gray-500 pt-6">
          <FaFacebook className="size-7 hover:text-blue-500 duration-300 cursor-pointer" />
          <FaInstagram className="size-7 hover:text-fuchsia-500 duration-300 cursor-pointer" />
          <FaYoutube className="size-7 hover:text-red-500 duration-300 cursor-pointer" />
          <FaXTwitter className="size-7 hover:text-black duration-300 cursor-pointer" />
        </li>
      </ul>
    </div>
  )
}