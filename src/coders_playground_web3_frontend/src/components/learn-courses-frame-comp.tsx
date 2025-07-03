"use client"

import { useNavigate } from "react-router-dom";
import { DynamicFrameLayout } from "../ui/learn-courses-layout"

const demoFrames = [
  {
    id: 1,
    title: "Programming Languages",
    video: "https://static.cdn-luma.com/files/981e483f71aa764b/Company%20Thing%20Exported.mp4",
    defaultPos: { x: 0, y: 0, w: 4, h: 4 },
    mediaSize: 1,
    isHovered: false,
    corner: "0",
    edgeHorizontal: "0",
    edgeVertical: "0",
    borderThickness: 1,
    borderSize: 1,
  },
  {
    id: 2,
    title: "Data Structures",
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/WebGL%20Exported%20(1).mp4",
    defaultPos: { x: 4, y: 0, w: 4, h: 4 },
    mediaSize: 1,
    isHovered: false,
    corner: "0",
    edgeHorizontal: "0",
    edgeVertical: "0",
    borderThickness: 1,
    borderSize: 1,
  },
  {
    id: 3,
    title: "Blockchain",
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Jitter%20Exported%20Poster.mp4",
    defaultPos: { x: 8, y: 0, w: 4, h: 4 },
    mediaSize: 1,
    isHovered: false,
    corner: "0",
    edgeHorizontal: "0",
    edgeVertical: "0",
    borderThickness: 1,
    borderSize: 1,
  },
  {
    id: 4,
    title: "AI/ML",
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Exported%20Web%20Video.mp4",
    defaultPos: { x: 0, y: 4, w: 4, h: 4 },
    mediaSize: 1,
    isHovered: false,
    corner: "0",
    edgeHorizontal: "0",
    edgeVertical: "0",
    borderThickness: 1,
    borderSize: 1,
  },
  {
    id: 5,
    title: "Web Development",
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Logo%20Exported.mp4",
    defaultPos: { x: 4, y: 4, w: 4, h: 4 },
    mediaSize: 1,
    isHovered: false,
    corner: "0",
    edgeHorizontal: "0",
    edgeVertical: "0",
    borderThickness: 1,
    borderSize: 1,
  },
  {
    id: 6,
    title: "Cloud Computing",
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Animation%20Exported%20(4).mp4",
    defaultPos: { x: 8, y: 4, w: 4, h: 4 },
    mediaSize: 1,
    isHovered: false,
    corner: "0",
    edgeHorizontal: "0",
    edgeVertical: "0",
    borderThickness: 1,
    borderSize: 1,
  },
  {
    id: 7,
    title: "Cybersecurity",
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Illustration%20Exported%20(1).mp4",
    defaultPos: { x: 0, y: 8, w: 4, h: 4 },
    mediaSize: 1,
    isHovered: false,
    corner: "0",
    edgeHorizontal: "0",
    edgeVertical: "0",
    borderThickness: 1,
    borderSize: 1,
  },
  {
    id: 8,
    title: "DevOps",
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Art%20Direction%20Exported.mp4",
    defaultPos: { x: 4, y: 8, w: 4, h: 4 },
    mediaSize: 1,
    isHovered: false,
    corner: "0",
    edgeHorizontal: "0",
    edgeVertical: "0",
    borderThickness: 1,
    borderSize: 1,
  },
  {
    id: 9,
    title: "UI/UX Design",
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Product%20Video.mp4",
    defaultPos: { x: 8, y: 8, w: 4, h: 4 },
    mediaSize: 1,
    isHovered: false,
    corner: "0",
    edgeHorizontal: "0",
    edgeVertical: "0",
    borderThickness: 1,
    borderSize: 1,
  },
]

export function LearnCoursesFrame() {
  const navigate = useNavigate();
  const handleFrameClick = () => {
    navigate("/learn-sidebar");
  };

  return (
    <div className="h-screen w-screen bg-zinc-900">
      <DynamicFrameLayout 
        frames={demoFrames} 
        className="w-full h-full" 
        hoverSize={6}
        gapSize={4}
        onFrameClick={handleFrameClick}
      />
    </div>
  )
}