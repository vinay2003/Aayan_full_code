import Header from "../components/Header";
import Slider from "../components/Slider";
import { About } from "../components/About";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import ContactForm from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Slider />
      <About />
      <Services />
      <Testimonials />
      <ContactForm />
      <Footer />
    </>
  );
}
