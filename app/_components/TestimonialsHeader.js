import Image from "next/image";

function TestimonialsHeader() {
  return (
    <div className="relative flex flex-col items-center w-sm mx-auto xl:mt-0 mt-25">
      {/* SVG Blob */}
      <svg
        viewBox="0 0 200 200"
        width="300"
        height="300"
        className="fill-grey-50 -mt-[18rem] xl:-mt-[16rem] mx-auto w-40 xl:w-80"
      >
        <path
          d="M44.6,-57.6C58,-52.1,70.5,-38.4,74.9,-23.4C79.3,-8.4,75.5,7.9,69.1,23C62.7,38.2,53.7,52.1,40.8,60.1C27.8,68.2,13.9,70.4,-1.3,72.2C-16.4,74,-32.9,75.5,-45.2,68.2C-57.5,60.9,-65.6,44.8,-66.1,30.2C-66.7,15.6,-59.8,2.4,-57.2,-14.1C-54.5,-40.7,-56.1,-50.6,-46.5,-57.4C-36.8,-64.2,-18.4,-67.9,-0.6,-67.2C27.2,-66.5,34.3,-61.6,44.6,-57.6Z"
          transform="translate(100 100)"
        />
      </svg>

      {/* Centered Circles */}
      <div className="absolute -top-42 justify-center flex gap-3 xl:gap-10">
        <Image
          width={200}
          height={200}
          alt="Review image 1"
          className="xl:h-30 xl:w-30 h-18 w-18 mt-5 xl:mt-10"
          src="/img/testimonialimage1.png"
        />
        <Image
          width={200}
          height={200}
          alt="Review image 2"
          className="xl:h-30 xl:w-30 h-18 w-18"
          src="/img/testimonialimage2.png"
        />
        <Image
          width={200}
          height={200}
          alt="Review image 3"
          className="xl:h-30 xl:w-30 h-18 w-18 mt-2 xl:mt-6"
          src="/img/testimonialimage1.png"
        />
        <Image
          width={200}
          height={200}
          alt="Review image 4"
          className="xl:h-30 xl:w-30 h-18 w-18 mt-5 xl:mt-10"
          src="/img/testimonialimage2.png"
        />
      </div>

      {/* Small Circles on Top-Right */}
      <div className="absolute xl:-top-[11rem] -top-45 right-28 xl:right-13 flex flex-col gap-1">
        <div className="xl:w-3 xl:h-3 w-2 h-2 rounded-full bg-accent-50"></div>
        <div className="xl:w-3 xl:h-3 w-2 h-2 rounded-full bg-accent-50"></div>
        <div className="xl:w-3 xl:h-3 w-2 h-2 rounded-full bg-accent-50"></div>
      </div>

      {/* Small Circles on Bottom-Left */}
      <div className="absolute xl:left-13 xl:mt-0 -mt-19 left-27 flex flex-row gap-1">
        <div className="xl:w-3 xl:h-3 w-2 h-2 rounded-full bg-primary-700"></div>
        <div className="xl:w-3 xl:h-3 w-2 h-2 rounded-full bg-primary-700"></div>
        <div className="xl:w-3 xl:h-3 w-2 h-2 rounded-full bg-primary-700"></div>
      </div>
      <h2 className="text-lg xl:text-2xl -mt-17 xl:mt-0">
        Onze tevreden klanten
      </h2>
    </div>
  );
}

export default TestimonialsHeader;
