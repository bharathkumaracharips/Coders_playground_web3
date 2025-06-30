import React, { useEffect, useState } from 'react';
import { coders_playground_web3_backend } from '../../../declarations/coders_playground_web3_backend';
import { NavbarComp_DF } from '../components/Nav_df_comp';
import CoursesComp from '../components/courses-comp';
import CodingProblemsTable from '../components/problem_set_comp';
import { Footer } from '../components/footer-comp';
import { OptionComp } from '../components/options';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardAfterProps {
  walletId: string;
}

const DashboardAfter: React.FC<DashboardAfterProps> = ({ walletId }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [activeView, setActiveView] = useState('dashboard'); // 'dashboard', 'problems', 'courses', 'multiplayer'

  useEffect(() => {
    const fetchLoginStatus = async () => {
      setLoading(true);
      try {
        await coders_playground_web3_backend.login(walletId);
      } catch (e) {
        console.error('DashboardAfter: error calling backend login:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchLoginStatus();
  }, [walletId]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.5rem' }}>
        Loading...
      </div>
    );
  }

  const renderContent = () => {
    switch (activeView) {
      case 'problems':
        return <CodingProblemsTable />;
      case 'courses':
        return <CoursesComp />;
      case 'multiplayer':
        return (
          <div className="text-white text-center p-8 text-lg flex-grow flex items-center justify-center">
            Multiplayer mode is coming soon!
          </div>
        );
      case 'dashboard':
      default:
        return <OptionComp onOptionSelect={setActiveView} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <NavbarComp_DF />
      <main className="flex flex-col flex-grow">
        {activeView !== 'dashboard' && (
          <button
            onClick={() => setActiveView('dashboard')}
            className="sticky top-0 z-10 flex items-center gap-2 text-white/70 hover:text-white m-4 self-start bg-black/80 backdrop-blur-sm p-2 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>
        )}
        <div
          className={cn(
            'flex flex-grow justify-center',
            activeView === 'dashboard' && 'items-center'
          )}
        >
          {renderContent()}
        </div>
        {activeView === 'dashboard' && <Footer />}
      </main>
    </div>
  );
};

export default DashboardAfter;
