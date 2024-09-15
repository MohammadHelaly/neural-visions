import { scrollTo } from "@/lib/utils";

const links = ["Try VQnA", "About", "Contact"];

const NavLinks = () => {
  return links.map((link) => {
    const handleClick = () => {
      scrollTo(link.toLowerCase().split(" ")[1] ?? link.toLowerCase());
    };

    return (
      <li key={link}>
        <button
          onClick={handleClick}
          className="flex h-full cursor-pointer items-center px-2 py-1"
        >
          <p className="w-full text-center font-poppins text-base font-normal text-white">
            {link}
          </p>
        </button>
      </li>
    );
  });
};

export default NavLinks;
