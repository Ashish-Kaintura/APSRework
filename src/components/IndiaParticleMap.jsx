import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import indiaSVG from "../images/home/india.png";

gsap.registerPlugin(ScrollTrigger);

const IndiaScrollParticles = () => {
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 200;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();

    loader.load(indiaSVG, (texture) => {
      const geometry = new THREE.PlaneGeometry(200, 200, 200, 200);
      const material = new THREE.PointsMaterial({
        size: 2,
        map: texture,
        transparent: true,
        color: 0xffffff,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      // scatter initially left side
      geometry.attributes.position.array.forEach((v, i) => {
        geometry.attributes.position.array[i] = Math.random() * -300;
      });

      gsap.to(geometry.attributes.position.array, {
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom+=1000 top",
          scrub: true,
          pin: true,
        },
        duration: 1,
        onUpdate: () => {
          geometry.attributes.position.needsUpdate = true;
        },
      });

      function animate() {
        requestAnimationFrame(animate);
        points.rotation.y += 0.001;
        renderer.render(scene, camera);
      }

      animate();
    });
  }, []);

  return <section ref={containerRef} className="h-[200vh] bg-black"></section>;
};

export default IndiaScrollParticles;
