import Image from "next/image";

function BankCtaSection() {
  return (
    <div className="p-4 sm:p-8 lg:p-20 bg-grey-50/20">
      <h3 className="uppercase text-[#155dfc] text-sm sm:text-base lg:text-lg text-center mb-6 sm:mb-8 lg:mb-9 px-2">
        Erkend door en samenwerking met
      </h3>

      {/* Mobile: Stack logos and rating vertically */}
      <div className="flex flex-col items-center gap-6 sm:hidden">
        {/* Bank logos in 2x3 grid on mobile */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
          <div className="shadow-sm hover:shadow-md rounded-lg py-2 px-3 hover:-translate-y-0.5 transition-all duration-300 flex justify-center">
            <Image
              className="w-auto h-7 grayscale-75 hover:grayscale-0 opacity-70"
              src="/img/ING_Group_N.V._Logo.svg.png"
              alt="ING logo"
              width={100}
              height={100}
            />
          </div>
          <div className="shadow-sm hover:shadow-md rounded-lg py-2 px-3 hover:-translate-y-0.5 transition-all duration-300 flex justify-center">
            <Image
              className="w-auto h-7 grayscale-75 hover:grayscale-0 opacity-70"
              src="/img/Rabobank-logo.png"
              alt="Rabobank logo"
              width={100}
              height={100}
            />
          </div>
          <div className="shadow-sm hover:shadow-md rounded-lg py-2 px-3 hover:-translate-y-0.5 transition-all duration-300 flex justify-center">
            <Image
              className="w-auto h-7 grayscale-75 hover:grayscale-0 opacity-70"
              src="/img/ABN-AMRO_Logo_new_colors.svg.png"
              alt="ABN AMRO logo"
              width={100}
              height={100}
            />
          </div>
          <div className="shadow-sm hover:shadow-md rounded-lg py-2 px-3 hover:-translate-y-0.5 transition-all duration-300 flex justify-center">
            <Image
              className="w-auto h-7 grayscale-75 hover:grayscale-0 opacity-70"
              src="/img/images.png"
              alt="Bank logo"
              width={100}
              height={100}
            />
          </div>
        </div>

        {/* Fifth logo centered below */}
        <div className="shadow-sm hover:shadow-md rounded-lg py-2 px-3 hover:-translate-y-0.5 transition-all duration-300">
          <Image
            className="w-auto h-7 grayscale-75 hover:grayscale-0 opacity-70"
            src="/img/sns-bank-logo.webp"
            alt="SNS Bank logo"
            width={100}
            height={100}
          />
        </div>

        {/* Rating badge */}
        <div className="border border-green-200 bg-green-50/70 py-2 px-3 gap-2 rounded-full inline-flex font-semibold text-gray-700 text-sm">
          <span className="text-green-500">
            ★★★★
            <span className="bg-gradient-to-r from-green-500 from-50% to-gray-200 to-50% bg-clip-text text-transparent">
              ★
            </span>
          </span>
          <span>4.4/5 (127 reviews)</span>
        </div>
      </div>

      {/* Tablet: Show logos in rows with rating below */}
      <div className="hidden sm:flex lg:hidden flex-col items-center gap-6">
        {/* First row - 3 logos */}
        <div className="flex gap-6 justify-center">
          <div className="shadow-sm hover:shadow-md rounded-lg py-2 px-3 hover:-translate-y-0.5 transition-all duration-300">
            <Image
              className="w-auto h-8 grayscale-75 hover:grayscale-0 opacity-70"
              src="/img/ING_Group_N.V._Logo.svg.png"
              alt="ING logo"
              width={100}
              height={100}
            />
          </div>
          <div className="shadow-sm hover:shadow-md rounded-lg py-2 px-3 hover:-translate-y-0.5 transition-all duration-300">
            <Image
              className="w-auto h-8 grayscale-75 hover:grayscale-0 opacity-70"
              src="/img/Rabobank-logo.png"
              alt="Rabobank logo"
              width={100}
              height={100}
            />
          </div>
          <div className="shadow-sm hover:shadow-md rounded-lg py-2 px-3 hover:-translate-y-0.5 transition-all duration-300">
            <Image
              className="w-auto h-8 grayscale-75 hover:grayscale-0 opacity-70"
              src="/img/ABN-AMRO_Logo_new_colors.svg.png"
              alt="ABN AMRO logo"
              width={100}
              height={100}
            />
          </div>
        </div>

        {/* Second row - 2 logos */}
        <div className="flex gap-6 justify-center">
          <div className="shadow-sm hover:shadow-md rounded-lg py-2 px-3 hover:-translate-y-0.5 transition-all duration-300">
            <Image
              className="w-auto h-8 grayscale-75 hover:grayscale-0 opacity-70"
              src="/img/images.png"
              alt="Bank logo"
              width={100}
              height={100}
            />
          </div>
          <div className="shadow-sm hover:shadow-md rounded-lg py-2 px-3 hover:-translate-y-0.5 transition-all duration-300">
            <Image
              className="w-auto h-8 grayscale-75 hover:grayscale-0 opacity-70"
              src="/img/sns-bank-logo.webp"
              alt="SNS Bank logo"
              width={100}
              height={100}
            />
          </div>
        </div>

        {/* Rating badge */}
        <div className="border border-green-200 bg-green-50/70 py-2 px-3 gap-2 rounded-full inline-flex font-semibold text-gray-700">
          <span className="text-green-500">
            ★★★★
            <span className="bg-gradient-to-r from-green-500 from-50% to-gray-200 to-50% bg-clip-text text-transparent">
              ★
            </span>
          </span>
          <span>4.4/5 (127 reviews)</span>
        </div>
      </div>

      {/* Desktop: Original horizontal layout */}
      <div className="hidden lg:flex gap-12 justify-center">
        <div className="shadow-sm hover:shadow-md rounded-lg py-2 px-3 hover:-translate-y-0.5 transition-all duration-300">
          <Image
            className="w-auto h-9 grayscale-75 hover:grayscale-0 opacity-70"
            src="/img/ING_Group_N.V._Logo.svg.png"
            alt="ING logo"
            width={100}
            height={100}
          />
        </div>
        <div className="shadow-sm hover:shadow-md rounded-lg py-2 px-3 hover:-translate-y-0.5 transition-all duration-300">
          <Image
            className="w-auto h-9 grayscale-75 hover:grayscale-0 opacity-70"
            src="/img/Rabobank-logo.png"
            alt="Rabobank logo"
            width={100}
            height={100}
          />
        </div>
        <div className="shadow-sm hover:shadow-md rounded-lg py-2 px-3 hover:-translate-y-0.5 transition-all duration-300">
          <Image
            className="w-auto h-9 grayscale-75 hover:grayscale-0 opacity-70"
            src="/img/ABN-AMRO_Logo_new_colors.svg.png"
            alt="ABN AMRO logo"
            width={100}
            height={100}
          />
        </div>
        <div className="shadow-sm hover:shadow-md rounded-lg py-2 px-3 hover:-translate-y-0.5 transition-all duration-300">
          <Image
            className="w-auto h-9 grayscale-75 hover:grayscale-0 opacity-70"
            src="/img/images.png"
            alt="Bank logo"
            width={100}
            height={100}
          />
        </div>
        <div className="shadow-sm hover:shadow-md rounded-lg py-2 px-3 hover:-translate-y-0.5 transition-all duration-300">
          <Image
            className="w-auto h-9 grayscale-75 hover:grayscale-0 opacity-70"
            src="/img/sns-bank-logo.webp"
            alt="SNS Bank logo"
            width={100}
            height={100}
          />
        </div>
        <div className="border border-green-200 my-auto bg-green-50/70 py-2 px-3 gap-2 rounded-full inline-flex font-semibold text-gray-700">
          <span className="text-green-500">
            ★★★★
            <span className="bg-gradient-to-r from-green-500 from-50% to-gray-200 to-50% bg-clip-text text-transparent">
              ★
            </span>
          </span>
          <span>4.4/5 (127 reviews)</span>
        </div>
      </div>
    </div>
  );
}

export default BankCtaSection;
