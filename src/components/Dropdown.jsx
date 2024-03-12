

export const Dropdown = ({ side, children, element }) => {
  return (
    <div className="group relative">
      {element}
      {side === "right" ?
        <div className="z-10 hidden group-hover:block absolute min-w-40 rounded-r-lg rounded-bl-lg bg-green-200 py-3">
          {children}
        </div>
        :
        <div className="z-10 hidden group-hover:block absolute right-0 min-w-40 rounded-l-lg rounded-br-lg bg-green-200 py-3">
          {children}
        </div>
      }

    </div>
  );
};