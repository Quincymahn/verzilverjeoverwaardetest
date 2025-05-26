import Image from "next/image";

function NavItem() {
  return (
    <div className="flex gap-2">
      <Image
        src="/img/ringing-phone-icon.png"
        width={50}
        height={50}
        alt="Telefoon foto"
      />
      <div>
        <h3>Maak een afspraak</h3>
        <h3 className="text-primary-700 font-semibold ">085 401 5280</h3>
      </div>
    </div>
  );
}

export default NavItem;
