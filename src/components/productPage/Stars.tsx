import { IoMdStarOutline } from "react-icons/io";
import { IoMdStar } from "react-icons/io";
import { IoMdStarHalf } from "react-icons/io";

export const Stars = ({ n }: { n: number }) => {
  const totalStars = 6; // Assuming total stars to be 5

  const starIcons = [];

  for (let i = 0; i < n; i++) {
    starIcons.push(<IoMdStar className="size-6 text-green-700" key={i} />);
  }

  const remainingStars = totalStars - n;
  for (let i = 0; i < remainingStars; i++) {
    starIcons.push(<IoMdStarOutline className="size-6 text-green-500" key={n + i} />);
  }

  return (
    <div className="flex">
      {starIcons}
    </div>
  );
}
