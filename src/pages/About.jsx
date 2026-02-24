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

export default function About() {
  return (
    <>
      <section>
        <AboutHero />
        <FounderNarrative />
        <IndustrialRecognition />
        <VisionStory />

        <MissionValues />

        <JourneyRoadmap />
        <NationalPresence />
        <CareersSection />
        <AboutCTA />
      </section>
    </>
  );
}
