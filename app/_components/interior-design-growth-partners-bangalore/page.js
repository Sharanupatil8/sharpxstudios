// app/interior-designers/page.jsx

import InteriorCaseStudies from "../_components/interior-growth-partner-components/InteriorCaseStudies";
import { InteriorClientJourney } from "../_components/interior-growth-partner-components/InteriorClientJourney";
import InteriorContact from "../_components/interior-growth-partner-components/InteriorContact";
import InteriorFaq from "../_components/interior-growth-partner-components/InteriorFaq";
import InteriorHero from "../_components/interior-growth-partner-components/InteriorHero";
import InteriorPricing from "../_components/interior-growth-partner-components/InteriorPricing";
import InteriorProcess from "../_components/interior-growth-partner-components/InteriorProcess";
import { InteriorServices } from "../_components/interior-growth-partner-components/InteriorServices";
import InteriorFooter from "../_components/interior-growth-partner-components/InteriorFooter";

export default function Page() {
  return (
    <>
      <InteriorHero />
      <InteriorClientJourney />
      <InteriorServices />
      <InteriorCaseStudies />
      <InteriorProcess />
      <InteriorPricing />
      <InteriorFaq />
      <InteriorContact />
      <InteriorFooter />
    </>
  );
}
