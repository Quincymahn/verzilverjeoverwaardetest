import AboutUsSection from "./_components/AboutUsSection";
import Accordion from "./_components/Accordion";
import BankCtaSection from "./_components/BankCtaSection";
import Copyright from "./_components/Copyright";
import CounterSection from "./_components/CounterSection";
import CtaFooterSection from "./_components/CtaFooterSection";
import Footer from "./_components/Footer";
import InfoList from "./_components/InfoList";
import Main from "./_components/Main";
import TestimonialsSection from "./_components/TestimonialsSection";
import TimelineSection from "./_components/TimelineSection";

function Home() {
  return (
    <>
      <Main />
      <section className="mx-auto">
        <TestimonialsSection />
        {/* <Accordion /> */}
        <AboutUsSection />
        <CounterSection />
        <TimelineSection />
        <InfoList />
        <CtaFooterSection />
        <BankCtaSection />
      </section>
      <Footer />
      <Copyright />
    </>
  );
}

export default Home;
