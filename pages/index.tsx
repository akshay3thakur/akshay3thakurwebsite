import Head from 'next/head';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Timeline from '@/components/Timeline';
import ProjectsGrid from '@/components/ProjectsGrid';
import SkillsGrid from '@/components/SkillsGrid';
import Education from '@/components/Education';
import Achievements from '@/components/Achievements';
import Volunteering from '@/components/Volunteering';
import Certifications from '@/components/Certifications';
import QuoteCard from '@/components/QuoteCard';
import SmileButton from '@/components/SmileButton';
import ContactCard from '@/components/ContactCard';
import Footer from '@/components/Footer';
import RightSideProgressBar from '@/components/RightSideProgressBar';

export default function Home() {
  return (
    <>
      <Head>
        <title>Akshay Thakur Resume Website</title>
        <meta
          name="description"
          content="Portfolio of Akshay Thakur - Customer Success & Product Enthusiast. Building, testing, and optimizing solutions where product and people meet."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <RightSideProgressBar />
      <Header />

      <main>
        <Hero />
        <Timeline />
        <ProjectsGrid />
        <SkillsGrid />
        <Education />
        <Achievements />
        <Volunteering />
        <Certifications />
        <QuoteCard />
        <SmileButton />
        <ContactCard />
      </main>

      <Footer />
    </>
  );
}

