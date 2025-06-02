import Image from "next/image";

function Logo() {
  return (
    <Image
      src="/img/logo-blue.png"
      width={200}
      height={50}
      alt="Website Logo"
      className="xl:w-50 xl:h-15 w-33 h-11 ml-5"
    />
  );
}

export default Logo;
