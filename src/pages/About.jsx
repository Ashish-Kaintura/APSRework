import React, { useEffect } from "react";
import { AboutHero } from "../components/About/AboutHero";
import { VisionStory } from "../components/About/VisionStory";
import { MissionValues } from "../components/About/MissionValues";
import { AboutCTA } from "../components/About/AboutCTA";
import { FounderNarrative } from "../components/About/FounderNarrative";
import { NationalPresence } from "../components/About/NationalPresence";
import { CareersSection } from "../components/About/CareersSection";
import { JourneyRoadmap } from "../components/About/JourneyRoadmap";
import { IndustrialRecognition } from "../components/About/IndustrialRecognition";
import { LiquidZigZagStory } from "../components/About/ZigZagStory";
import { ZigZagStory } from "../components/About/ZigzagstorynoLiquied";
import { LeadershipSection } from "../components/About/LeadershipSection";
import { PremiumZigZagStory } from "../components/About/PremiumZigZagStory";
import { SubBannerSlider } from "../components/About/SubBannerSlider";

export default function About() {
  // useEffect(()=>{
  //   window.scroll(0,0)
  // })
  return (
    <>
      <section>
        <AboutHero />
        <FounderNarrative />
        <IndustrialRecognition />
        <VisionStory />
        <LeadershipSection />
        {/* <MissionValues /> */}
        <PremiumZigZagStory />
        {/* <LiquidZigZagStory /> */}
        {/* <ZigZagStory /> */}

        <JourneyRoadmap />
        <h4 className="text-4xl uppercase  font-sans font-bold tracking-wide text-primary text-center pt-9">
          <span className="text-gray-900 italic "> OUR </span>Clientele 
        </h4>
        <SubBannerSlider />
        {/* <NationalPresence /> */}
        {/* <CareersSection /> */}
        <AboutCTA />
      </section>
    </>
  );
}
