import { Etheral } from "@/components/etheral-shadow";
import { FeaturesSectionWithHoverEffects } from "@/components/feature-section-with-hover-effects";
import GradualBlurMemo from "@/components/GradualBlur";
import { SimpleHeader } from "@/components/simple-header";
import React from "react";

const Landingpage = () => {
  return (
    <div className="w-full">
      <div className="fixed top-0 left-0 w-full z-20">
        <SimpleHeader />
      </div>
      <section id="home" className="h-screen w-full scroll-mt-20">
        <Etheral
          animation={{ scale: 100, speed: 90 }}
          noise={{ opacity: 1, scale: 1.2 }}
          sizing="fill"
        />
      </section>
      <section id="about" className="h-screen w-full scroll-mt-20"></section>
      <section id="contact" className="h-screen w-full scroll-mt-20">
        <FeaturesSectionWithHoverEffects />
      </section>
      <div className="fixed bottom-0 right-0 w-full z-20">
        <GradualBlurMemo
        target="parent"
        position="bottom"
        height="2rem"
        strength={1}
        divCount={10}
        curve="bezier"
        exponential={true}
        opacity={1}
      />
      </div>
    </div>
  );
};

export default Landingpage;
