import React from "react";
import { SharedNavigation } from "../../components/ui/SharedNavigation";
import { SEO } from "../../components/SEO";
import { DivSubsection } from "./sections/DivSubsection";
import { DivWrapperSubsection } from "./sections/DivWrapperSubsection";
import { Group1Subsection } from "./sections/Group1Subsection";
import { Group2Subsection } from "./sections/Group2Subsection";
import { GroupSubsection } from "./sections/GroupSubsection";
import { GroupWrapperSubsection } from "./sections/GroupWrapperSubsection";
import { OverlapGroupWrapperSubsection } from "./sections/OverlapGroupWrapperSubsection";
import { SectionComponentNodeSubsection } from "./sections/SectionComponentNodeSubsection/SectionComponentNodeSubsection";
import { VerifiedSellersSubsection } from "./sections/VerifiedSellersSubsection";

export const Homepage = (): JSX.Element => {

  return (
    <>
      <SEO
        title="Acreage for Sale | Buy & Sell Land Nationwide – Acreage Sale"
        description="Acreage Sale is a dedicated marketplace for acreage for sale across the United States. Browse verified land listings, buy acreage directly from owners, or list your land for sale."
        keywords="acreage for sale, buy acreage, sell acreage, land for sale, acreage listings, buy land, sell land, acreage marketplace, acreage by owner, land marketplace"
        canonical="https://acreagesale.com/"
      />
    <div className="bg-white w-full min-h-screen">
      <SharedNavigation />

        {/* Hero Section */}
        <section className="w-full relative pt-8 lg:pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <GroupSubsection />
          </div>
        </section>

        {/* Main Content Sections */}
        <main className="w-full">
          <DivWrapperSubsection />
          <SectionComponentNodeSubsection />
          <VerifiedSellersSubsection />
          <DivSubsection />
          <Group2Subsection />
          <Group1Subsection />
          <OverlapGroupWrapperSubsection />
        </main>

        {/* Footer */}
        <GroupWrapperSubsection />
    </div>
    </>
  );
};