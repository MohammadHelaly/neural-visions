const links = ["Try VQnA", "About", "Contact"];

const NavLinks = () => {
  return links.map((link) => {
    const href = "#" + (link.toLowerCase().split(" ")[1] ?? link.toLowerCase());

    return (
      <li key={link}>
        <a href={href} className="flex h-full items-center px-2 py-1">
          <p className="w-full text-center font-poppins text-base font-normal text-white">
            {link}
          </p>
        </a>
      </li>
    );
  });
};

export default NavLinks;
