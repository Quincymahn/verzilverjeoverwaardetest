import Image from "next/image";

function TestimonialTrustPilot() {
  return (
    <div className="flex flex-col items-center ">
      <div className="flex items-end gap-1 mb-2">
        <Image
          src="/img/trustpilot-2.svg"
          width={50}
          height={50}
          alt="trustpilot star"
          className="w-8 h-8"
        />
        <p className="text-xl font-bold">Trustpilot</p>
      </div>
      <div className="flex gap-[2px] mb-1">
        {/* <span className=" px-1.5 bg-green-600 text-white text-xl">★</span>
        <span className=" px-1.5 bg-green-600 text-white text-xl">★</span>
        <span className=" px-1.5 bg-green-600 text-white text-xl">★</span>
        <span className=" px-1.5 bg-green-600 text-white text-xl">★</span>
        <span className=" px-1.5 bg-gray-300 text-white text-xl">★</span> */}
        <Image
          src="/img/trustpilotwhite.png"
          width={100}
          height={100}
          alt="trustpilot star rating"
          className="w-8 h-8 p-1 bg-[#08b87e]"
        />
        <Image
          src="/img/trustpilotwhite.png"
          width={100}
          height={100}
          alt="trustpilot star rating"
          className="w-8 h-8 p-1 bg-[#08b87e]"
        />
        <Image
          src="/img/trustpilotwhite.png"
          width={100}
          height={100}
          alt="trustpilot star rating"
          className="w-8 h-8 p-1 bg-[#08b87e]"
        />
        <Image
          src="/img/trustpilotwhite.png"
          width={100}
          height={100}
          alt="trustpilot star rating"
          className="w-8 h-8 p-1 bg-[#08b87e]"
        />
        <Image
          src="/img/trustpilotwhite.png"
          width={100}
          height={100}
          alt="trustpilot star rating"
          className="w-8 h-8 p-1 bg-gradient-to-r from-[#08b87e] from-50% to-gray-300 to-50%"
        />
      </div>
      <div className="flex text-gray-500 text-xs gap-1 mb-4">
        <p>
          TrustScore <span className="font-semibold">4.4 / 5</span>{" "}
        </p>
        <span>|</span>
        <p className="font-semibold underline">127 reviews</p>
      </div>
      <div className="text-center">
        <p className="text-sm mb-3">Deze klanten zijn u voor gegaan</p>
        <a
          className="bg-accent-50 rounded-full py-1.5 duration-300 px-4 text-white font-semibold hover:shadow-md hover:shadow-gray-400 hover:-translate-y-1 inline-block"
          href="#"
        >
          Vul het formulier in
        </a>
      </div>
    </div>
  );
}

export default TestimonialTrustPilot;
