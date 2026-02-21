import { Section } from 'lucide-react'
import React from 'react'
import PremiumSlider from '../components/PremiumSlider'
import APSBannerSlider from '../components/APSBannerSlider'
import AccordionSlider from '../components/AccordionSlider'
import AccordionSliderLight from '../components/AccordionSliderLinght'

export default function Home() {
    return (
        <>
            <section>
                {/* <PremiumSlider/> */}
                <div className=''>
                    {/* <APSBannerSlider />  */}
                    <AccordionSlider/>
                    </div>
            </section>
            <section className='h-96 bg-black' ></section>
            <section className='h-96 bg-black' ></section>
            <section className='h-96 bg-black' ></section>
            <section className='h-96 bg-black' ></section>
            <section className='h-96 bg-black' ></section>
            <section className='h-96 bg-black' ></section>
            <section className='h-96 bg-black' ></section>
            <section className='h-96 bg-black' ></section>
            <section className='h-96 bg-black' ></section>
            <section className='h-96 bg-black' ></section>
            <section className='h-96 bg-black' ></section>
        </>
    )
}
