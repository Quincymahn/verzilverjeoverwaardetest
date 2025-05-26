import Image from "next/image";

function BankCtaSection() {
  return (
    <div className="p-20">
      <h3 className="uppercase text-[#155dfc] text-lg flex justify-center mb-9">
        Erkend door en samenwerking met
      </h3>
      <div className="flex gap-12 justify-center">
        <div className="shadow-sm hover:shadow-md rounded-lg py-2 px-3 hover:-translate-y-0.5 transition-all duration-300">
          <Image
            className="w-auto h-9 grayscale-75 hover:grayscale-0  opacity-70"
            src="/img/ING_Group_N.V._Logo.svg.png"
            alt="ing logo"
            width={100}
            height={100}
          />
        </div>
        <div className="shadow-sm hover:shadow-md rounded-lg py-2 px-3 hover:-translate-y-0.5 transition-all duration-300">
          <Image
            className="w-auto h-9 grayscale-75 hover:grayscale-0  opacity-70"
            src="/img/Rabobank-logo.png"
            alt="ing logo"
            width={100}
            height={100}
          />
        </div>
        <div className="shadow-sm hover:shadow-md rounded-lg py-2 px-3 hover:-translate-y-0.5 transition-all duration-300">
          <Image
            className="w-auto h-9 grayscale-75 hover:grayscale-0  opacity-70"
            src="/img/ABN-AMRO_Logo_new_colors.svg.png"
            alt="ing logo"
            width={100}
            height={100}
          />
        </div>
        <div className="shadow-sm hover:shadow-md rounded-lg py-2 px-3 hover:-translate-y-0.5 transition-all duration-300">
          <Image
            className="w-auto h-9 grayscale-75 hover:grayscale-0 opacity-70"
            src="/img/images.png"
            alt="ing logo"
            width={100}
            height={100}
          />
        </div>
        <div className="shadow-sm hover:shadow-md rounded-lg py-2 px-3 hover:-translate-y-0.5 transition-all duration-300">
          <Image
            className="w-auto h-9 grayscale-75 hover:grayscale-0  opacity-70"
            src="/img/sns-bank-logo.webp"
            alt="ing logo"
            width={100}
            height={100}
          />
        </div>
        <div className="border border-green-200 my-auto bg-green-50/70 py-2 px-3 gap-2 rounded-full inline-flex font-semibold text-gray-700">
          <span>⭐⭐⭐⭐⭐</span>
          <span>4.8/5 (127 reviews)</span>
        </div>
      </div>
    </div>
  );
}

export default BankCtaSection;
