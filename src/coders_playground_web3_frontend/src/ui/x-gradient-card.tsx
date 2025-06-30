import React from "react";
import { cn } from "../lib/utils";
import { Code, Users, BookOpen } from "lucide-react";

interface XCardProps {
  onOptionSelect: (view: string) => void;
}

function XCard({ onOptionSelect }: XCardProps) {
    const options = [
        {
            title: "Problems",
            icon: <Code className="h-8 w-8 text-white" />,
            description: "Solve coding challenges and improve your skills.",
            view: "problems",
        },
        {
            title: "Multiplayer",
            icon: <Users className="h-8 w-8 text-white" />,
            description: "Compete with other developers in real-time.",
            view: "multiplayer",
        },
        {
            title: "Courses",
            icon: <BookOpen className="h-8 w-8 text-white" />,
            description: "Follow guided paths to learn new technologies.",
            view: "courses",
        },
    ];

    return (
        <div
            className={cn(
                "w-full max-w-2xl p-1.5 rounded-2xl relative isolate overflow-hidden",
                "bg-black/90",
                "backdrop-blur-xl backdrop-saturate-[180%]",
                "border border-white/10",
                "shadow-2xl"
            )}
        >
            <div
                className={cn(
                    "w-full p-8 rounded-xl relative",
                    "bg-white/[0.03]",
                    "text-white"
                )}
            >
                <h2 className="text-2xl font-bold text-center mb-6">Choose Your Challenge</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {options.map((option) => (
                        <div
                            key={option.title}
                            onClick={() => onOptionSelect(option.view)}
                            className={cn(
                                "p-6 rounded-lg text-center cursor-pointer",
                                "bg-white/[0.05] border border-white/10",
                                "hover:bg-white/[0.1] hover:border-white/20 transition-all duration-300"
                            )}
                        >
                            <div className="flex justify-center mb-4">{option.icon}</div>
                            <h3 className="text-lg font-semibold">{option.title}</h3>
                            <p className="text-sm text-white/60 mt-2">{option.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export { XCard };