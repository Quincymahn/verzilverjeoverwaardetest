function CounterSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {/* Counter 1 */}
          <div className="text-center py-6 sm:py-8">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600 mb-2 sm:mb-3">
              10+
            </div>
            <div className="text-sm sm:text-base lg:text-lg text-gray-700 font-medium">
              Jaar ervaring
            </div>
          </div>

          {/* Counter 2 */}
          <div className="text-center py-6 sm:py-8 border-t sm:border-t-0 sm:border-l sm:border-r border-gray-200">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600 mb-2 sm:mb-3">
              1200+
            </div>
            <div className="text-sm sm:text-base lg:text-lg text-gray-700 font-medium">
              Hypotheken geregeld
            </div>
          </div>

          {/* Counter 3 */}
          <div className="text-center py-6 sm:py-8 border-t sm:border-t-0 border-gray-200">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600 mb-2 sm:mb-3">
              95%
            </div>
            <div className="text-sm sm:text-base lg:text-lg text-gray-700 font-medium">
              Beveelt ons aan
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CounterSection;
