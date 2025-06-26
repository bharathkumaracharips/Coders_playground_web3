"use client";

import {
  BarChart,
  Database,
  Layers,
  PieChart,
  SquareKanban,
} from "lucide-react";
import { useState } from "react";

import { cn } from "../lib/utils";

import { BorderBeam } from "../ui/explore-border-beams";
import { Button } from "../ui/explore-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/explore-tabs";

export interface Tab {
  title: string;
  icon: React.ReactNode;
  image: string;
}

export interface ExploreProps {
  title: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  primaryButtonUrl: string;
  secondaryButtonUrl?: string;
  tabs?: Tab[];
}

const defaultTabs: Tab[] = [
  {
    title: "Insights",
    icon: <SquareKanban />,
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/dashboard/admin-dashboard-1.png",
  },
  {
    title: "Metrics",
    icon: <BarChart />,
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/dashboard/admin-dashboard-2.png",
  },
  {
    title: "Trends",
    icon: <PieChart />,
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/dashboard/admin-dashboard-3.png",
  },
  {
    title: "Sources",
    icon: <Database />,
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/dashboard/admin-users.png",
  },
  {
    title: "Models",
    icon: <Layers />,
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/dashboard/admin-developer.png",
  },
];

const Explore = ({
  title = "Beautiful blocks for Shadcn UI.",
  description = "Shadcnblocks.com offers the best collection of components and blocks for shadcn/ui.",
  primaryButtonText = "Download",
  primaryButtonUrl = "https://shadcnblocks.com",
  secondaryButtonUrl,
  secondaryButtonText,
  tabs = defaultTabs,
}: ExploreProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.title || "");

  return (
    <section className="">
      <div className="container">
        <div className="border-border border-x py-8">
          <div className="relative mx-auto max-w-2xl p-2">
            <h1 className="mx-1 mt-6 text-center text-5xl font-bold tracking-tighter md:text-7xl">
              {title}
            </h1>
            <p className="text-muted-foreground mx-2 mt-6 max-w-xl text-center text-lg font-medium md:text-xl">
              {description}
            </p>
            <div className="mx-2 mt-6 flex justify-center gap-2">
              <Button asChild>
                <a href={primaryButtonUrl}>{primaryButtonText}</a>
              </Button>
              {secondaryButtonText && (
                <Button variant="outline" asChild>
                  <a href={secondaryButtonUrl}>{secondaryButtonText}</a>
                </Button>
              )}
            </div>
          </div>
          <div className="mt-16 md:mt-20">
            <Tabs defaultValue={tabs[0]?.title} onValueChange={setActiveTab}>
              <div className="px-2">
                <TabsList className="mx-auto mb-6 flex h-auto w-fit max-w-xs flex-wrap justify-center gap-2 md:max-w-none">
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.title}
                      value={tab.title}
                      className="text-muted-foreground font-normal"
                    >
                      {tab.icon}
                      {tab.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              <div className="relative isolate">
                <div className="relative z-10">
                  {tabs.map((tab) => (
                    <TabsContent
                      key={tab.title}
                      value={tab.title}
                      className={cn(
                        "bg-background -mx-px transition-opacity duration-500",
                        {
                          "animate-in fade-in opacity-100":
                            activeTab === tab.title,
                          "opacity-0": activeTab !== tab.title,
                        },
                      )}
                    >
                      <img
                        src={tab.image}
                        alt={tab.title}
                        className="border-border aspect-[16/10] w-full border object-top shadow-[0_6px_20px_rgb(0,0,0,0.12)]"
                      />
                      <BorderBeam duration={8} size={100} />
                    </TabsContent>
                  ))}
                </div>
                <span className="-inset-x-1/5 bg-border absolute top-0 -z-10 h-px [mask-image:linear-gradient(to_right,transparent_1%,black_10%,black_90%,transparent_99%)]"></span>
                <span className="-inset-x-1/5 bg-border absolute bottom-0 -z-10 h-px [mask-image:linear-gradient(to_right,transparent_1%,black_10%,black_90%,transparent_99%)]"></span>

                <span className="-inset-x-1/5 border-border absolute top-12 h-px border-t border-dashed [mask-image:linear-gradient(to_right,transparent_1%,black_10%,black_90%,transparent_99%)]"></span>
                <span className="-inset-x-1/5 border-border absolute bottom-12 h-px border-t border-dashed [mask-image:linear-gradient(to_right,transparent_1%,black_10%,black_90%,transparent_99%)]"></span>

                <span className="-inset-y-1/5 left-1/6 border-border absolute w-px border-r border-dashed [mask-image:linear-gradient(to_bottom,transparent_1%,black_10%,black_90%,transparent_99%)]"></span>
                <span className="-inset-y-1/5 right-1/6 border-border absolute w-px border-r border-dashed [mask-image:linear-gradient(to_bottom,transparent_1%,black_10%,black_90%,transparent_99%)]"></span>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Explore };
