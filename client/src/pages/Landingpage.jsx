import { Etheral } from "@/components/etheral-shadow";
import { FeaturesSectionWithHoverEffects } from "@/components/feature-section-with-hover-effects";
import React from "react";

const Landingpage = () => {
  return (
    <div className="h-screen w-full">
      <section id="#" className="h-screen w-full">
        <Etheral
          color="rgba(128, 128, 128, 1)"
          animation={{ scale: 100, speed: 90 }}
          noise={{ opacity: 1, scale: 1.2 }}
          sizing="fill"
        />
      </section>
      <section id="#about" className="h-screen w-full">
        <FeaturesSectionWithHoverEffects/>
      </section>
    </div>
  );
};

export default Landingpage;
