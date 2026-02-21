import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import Preloader from './components/Preloader';
import PremiumLandingPage from './pages/Home';
import Navbar from './components/Navbar';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Only enable smooth scroll AFTER loading is done
        if (!isLoading) {
            const lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });

            function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);

            return () => lenis.destroy();
        }
    }, [isLoading]);
    return (
        <Router>
            {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
            <div className={isLoading ? "h-screen overflow-hidden" : " bg-white h-screen"}>
                <main>
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<PremiumLandingPage/>} />
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App
