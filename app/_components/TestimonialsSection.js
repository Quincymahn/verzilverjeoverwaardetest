import Testimonials from "./Testimonials";
import TestimonialsHeader from "./TestimonialsHeader";

function TestimonialsSection({ testimonialsComponentData }) {
  return (
    <section className="max-w-7xl mx-auto">
      <TestimonialsHeader />
      <Testimonials
        testimonial1Data={testimonialsComponentData?.Testimonial1}
        testimonial2Data={testimonialsComponentData?.Testimonial2}
        testimonial3Data={testimonialsComponentData?.Testimonial3?.[0]}
      />
    </section>
  );
}

export default TestimonialsSection;
