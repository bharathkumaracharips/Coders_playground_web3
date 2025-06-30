import { Card, CardCanvas } from "../ui/animated-glow-card";
import { XCard } from "../ui/x-gradient-card";

interface OptionCompProps {
  onOptionSelect: (view: string) => void;
}

const OptionComp: React.FC<OptionCompProps> = ({ onOptionSelect }) => {
  return (
    <CardCanvas>
      <Card>
        <XCard onOptionSelect={onOptionSelect} />
      </Card>
    </CardCanvas>
  );
};

export { OptionComp };
