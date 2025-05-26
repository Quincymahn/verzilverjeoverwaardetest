import Image from "next/image";

function Logo() {
  return (
    <Image
      src="/img/logo-blue.png"
      width={200}
      height={50}
      alt="Website Logo"
    />
  );
}

export default Logo;
