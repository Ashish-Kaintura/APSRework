import { Section } from 'lucide-react'
import React from 'react'
import PremiumSlider from '../components/PremiumSlider'
import APSBannerSlider from '../components/APSBannerSlider'
import AccordionSlider from '../components/AccordionSlider'
import AccordionSliderLight from '../components/AccordionSliderLinght'
import { FaPlane } from 'react-icons/fa'
import about from "../images/home/home about.jpg"
import { SiSecurityscorecard } from 'react-icons/si'
import { AboutSummary } from '../components/AboutSummary'
import HorizontalScroll from '../components/HorizontalScroll'
import { TestimonialSection } from '../components/TestimonialSection'

export default function Home() {
    return (
        <>
            <section>
                {/* <PremiumSlider/> */}
                <div className=''>
                    {/* <APSBannerSlider />  */}
                    <AccordionSlider />
                </div>
            </section>
            <AboutSummary />
            {/* <HeroSection/> */}
         
            <HorizontalScroll/>

            <TestimonialSection/>
            <section className='h-96 bg-black' ></section>
        </>
    )
}
