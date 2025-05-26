function Copyright() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="w-full p-6 text-center border-t-1 border-black">
      <p>&copy;{year} Verzilverjeoverwaarde.nl</p>
    </div>
  );
}

export default Copyright;
