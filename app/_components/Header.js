import Logo from "./HeaderLogo";
import NavItem from "./HeaderItem";

function Header() {
  return (
    <div className="py-4 shadow-2xl relative z-10">
      <ul className="max-w-7xl mx-auto flex justify-between items-center ">
        <li>
          <Logo />
        </li>
        <li>
          <NavItem />
        </li>
      </ul>
    </div>
  );
}

export default Header;
