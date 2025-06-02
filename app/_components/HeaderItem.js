import Image from "next/image";

function NavItem() {
  return (
    <div className="flex gap-2 items-center mr-5">
      <Image
        src="/img/ringing-phone-icon.png"
        width={50}
        height={50}
        alt="Telefoon foto"
        className="xl:w-12 xl:h-12 w-8 h-8"
      />
      <div>
        <h3 className="text-xs xl:text-base">Maak een afspraak</h3>
        <h3 className="text-primary-700 font-semibold text-sm xl:text-base">
          085 401 5280
        </h3>
      </div>
    </div>
  );
}

export default NavItem;
