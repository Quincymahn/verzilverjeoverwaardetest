function CounterSection() {
  return (
    <div className="flex justify-center -mt-20 mb-10">
      <div className="bg-[#f5f9ff] border border-primary-700 inline-flex min-w-5xl py-10 px-20 rounded-xl justify-around gap-10">
        <div className=" flex flex-col items-center gap-2">
          <span className="text-primary-700/60 text-5xl font-bold">10+</span>
          <span className=" text-gray-400 text-sm">Jaar ervaring</span>
        </div>
        <div className=" flex flex-col items-center gap-2">
          <span className="text-primary-700/60 text-5xl font-bold">1200+</span>
          <span className=" text-gray-400 text-sm">Hypotheken geregeld</span>
        </div>
        <div className=" flex flex-col items-center gap-2">
          <span className="text-primary-700/60 text-5xl font-bold">95%</span>
          <span className=" text-gray-400 text-sm">Beveelt ons aan</span>
        </div>
      </div>
    </div>
  );
}

export default CounterSection;
