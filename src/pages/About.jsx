import React from "react";
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

export default function About() {
  return (
    <>
      <section>
        <AboutHero />
        <FounderNarrative />
        <IndustrialRecognition />
        <VisionStory />
        <LeadershipSection/>
        {/* <MissionValues /> */}
        <PremiumZigZagStory/>
        {/* <LiquidZigZagStory /> */}
        {/* <ZigZagStory /> */}
        <JourneyRoadmap />
        {/* <NationalPresence /> */}
        {/* <CareersSection /> */}
        <AboutCTA />
      </section>
    </>
  );
}
