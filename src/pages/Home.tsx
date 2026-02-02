import Hero from "../components/Hero";
import CompanyMarquee from "../components/CompanyMarquee";
import SkillsGrid from "../components/SkillsGrid";
import Experience from "../components/Experience";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <CompanyMarquee />
      <SkillsGrid />
      <Experience />
      <Contact />
    </>
  );
}
