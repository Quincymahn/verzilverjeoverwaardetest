import Image from "next/image";

function TestimonialTrustPilot() {
  return (
    <div className="relative flex flex-col justify-between h-full">
      <div className="flex justify-between gap-4">
        <div className="relative">
          <Image
            src="/img/kiyohreviewlogo.png"
            width={60}
            height={60}
            alt="Kiyoh review logo"
          />
          <p className="absolute text-md font-semibold top-4.5 left-5">9.9</p>
        </div>
        <div>
          <div className="flex gap-1 mt-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Image
                key={i}
                src="/img/starrating.png"
                width={15}
                height={15}
                alt="Star rating"
              />
            ))}
          </div>
          <div className="text-center text-sm text-text-50">
            <p>175</p>
            <p>Beoordelingen</p>
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <p className="text-sm mb-4 w-[90%]">
          Deze klanten zijn u al voor gegaan
        </p>
        <a
          href="#"
          className="btn-4 bg-accent-50 text-white py-2 px-4 rounded-full  hover:bg-accent-50/70 transition-all duration-300"
        >
          <span>Vul het formulier in</span>
        </a>
      </div>
    </div>
  );
}

export default TestimonialTrustPilot;
