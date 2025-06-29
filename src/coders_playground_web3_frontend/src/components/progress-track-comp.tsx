import { CircleProgress } from "../ui/progress-graph";

export function CircleProgress_comp() {
  return (
    <div className="flex flex-wrap gap-8 justify-center">
      <div className="flex flex-col items-center">
        <CircleProgress 
          value={65} 
          maxValue={100} 
          size={80} 
          useGradient={true}
          gradientColors={["#10b981", "#f59e0b", "#ef4444"]}
        />
        <span className="mt-2 text-sm">Green → Red</span>
      </div>
      <div className="flex flex-col items-center">
        <CircleProgress 
          value={65} 
          maxValue={100} 
          size={80} 
          useGradient={true}
          gradientColors={["#3b82f6", "#8b5cf6", "#ec4899"]}
        />
        <span className="mt-2 text-sm">Blue → Pink</span>
      </div>
      <div className="flex flex-col items-center">
        <CircleProgress 
          value={65} 
          maxValue={100} 
          size={80} 
          useGradient={true}
          gradientColors={["#f59e0b", "#f97316", "#ef4444"]}
          gradientId="warm-gradient"
        />
        <span className="mt-2 text-sm">Warm Colors</span>
      </div>
    </div>
  );
}