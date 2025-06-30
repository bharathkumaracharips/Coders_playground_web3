import { Card, CardCanvas } from "../ui/animated-glow-card";
import { XCard } from "../ui/x-gradient-card";

interface OptionCompProps {
  onOptionSelect: (view: string) => void;
}

const OptionComp: React.FC<OptionCompProps> = ({ onOptionSelect }) => {
  return (
    <div className="flex w-full h-screen justify-center items-center bg-black">
      <CardCanvas>
        <Card>
          <XCard onOptionSelect={onOptionSelect} />
        </Card>
      </CardCanvas>
    </div>
  );
};

export { OptionComp };
