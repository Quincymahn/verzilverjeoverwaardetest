import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

function Form() {
  return (
    <div className="w-4xl bg-white mt-10 m-auto rounded-xl relative">
      <div className="rounded-xl bg-gray-100 h-10 w-full"></div>
      <div className=" bg-accent-50 absolute -right-[0.65rem] top-[2.6rem] -z-3 text-accent-50 rotate-60">
        lor
      </div>
      <div className="p-0.5 bg-accent-50 absolute -right-4 top-7">
        Lorem ipsum
      </div>
      <div className="p-6">
        <div className="py-4 px-12 w-[80%] border-1 border-gray-300 rounded-xl mx-auto">
          <div className="rounded-full w-15 h-15 bg-primary-950 mx-auto mb-5"></div>
          <p className="text-center text-lg font-semibold">
            Bereken uw hypotheek mogelijkheden
          </p>
        </div>
        <div className="pt-6 w-[80%] flex flex-col gap-4 mx-auto">
          <div className="ml-15">
            <h2>1. Kennismaking</h2>
            <p className="text-text-100">
              Dit is de huidige stap. Aangenaam kennis te maken.
            </p>
          </div>
          <div className="ml-15">
            <h2>2. Jouw situatie</h2>
            <p className="text-text-100">
              Kies de berekening die past bij jouw situatie.
            </p>
          </div>
          <div className="ml-15">
            <h2>3. Jouw Inkomen</h2>
            <p className="text-text-100">
              We stellen een aantal vragen om een nauwkeurige berekening te
              maken.
            </p>
          </div>
          <div className="ml-15">
            <h2>4. Jouw gegevens</h2>
            <p className="text-text-100">
              Hier ontvang je direct een indicatieve berekening.
            </p>
          </div>

          <div className="flex items-center w-full pt-7">
            <button className="text-sm ">Ga Terug</button>
            <button className="bg-accent-50 text-lg font-semibold text-white py-1 px-6 rounded-full flex mx-auto gap-3 ">
              Volgende stap <ArrowLongRightIcon className="w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
