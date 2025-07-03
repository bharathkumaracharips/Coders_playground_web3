import React from "react";
import { FeaturesSectionWithHoverEffects } from "../ui/propose-ui";

function ProposeComp() {
  return (
    <div className="min-h-screen w-full">
      <div className="absolute top-0 left-0 w-full">
        <FeaturesSectionWithHoverEffects />
      </div>
    </div>
  );
}

export { ProposeComp };