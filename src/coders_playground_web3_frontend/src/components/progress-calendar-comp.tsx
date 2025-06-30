
import InteractiveCalendar from '../ui/progress-calendar';

const InteractiveCalendarDemo = () => {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-start bg-black px-4 py-10 md:justify-center">
      <InteractiveCalendar />
    </main>
  );
};

export { InteractiveCalendarDemo as calendar };