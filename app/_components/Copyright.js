function Copyright() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="w-full p-6  border-t-1 border-black flex justify-center gap-2">
      <p className="font-semibold text-xs lg:text-base">
        &copy;{year} Verzilverjeoverwaarde.nl{" "}
      </p>
      <span className="text-xs lg:text-base"> | </span>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="/vergelijkingskaart-hypotheek.pdf"
        className="text-blue-600 underline font-semibold text-xs lg:text-base"
      >
        {" "}
        Vergelijkingskaart
      </a>
    </div>
  );
}

export default Copyright;
