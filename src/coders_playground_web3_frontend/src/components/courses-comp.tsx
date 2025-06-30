import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/courses-ui";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const courses = [
  {
    name: "C",
    description: "Learn the fundamentals of C programming language.",
    header: <Skeleton />,
    className: "md:col-span-2",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    name: "C++",
    description: "Master object-oriented programming with C++.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    name: "Java",
    description: "Build robust applications using Java.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    name: "Python",
    description: "Explore scripting, data science, and AI with Python.",
    header: <Skeleton />,
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    name: "Solidity",
    description: "Develop smart contracts for Ethereum blockchain.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    name: "Rust",
    description: "Systems programming with safety and speed in Rust.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
  {
    name: "Motoko",
    description: "Build canisters for the Internet Computer with Motoko.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];

const CoursesComp = () => {
  return (
    <div className="py-8 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Courses</h2>
      <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
        {courses.map((item, i) => (
          <Link to={`/problems/${item.name}`} key={i} className={item.className}>
            <BentoGridItem
              title={item.name}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className="h-full"
            />
          </Link>
        ))}
      </BentoGrid>
    </div>
  );
};

export default CoursesComp;
