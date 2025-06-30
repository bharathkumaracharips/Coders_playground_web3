import React, { useEffect, useState } from 'react';
import { coders_playground_web3_backend } from '../../../declarations/coders_playground_web3_backend';
import { NavbarComp_DF } from '../components/Nav_df_comp';
import  CoursesComp  from '../components/courses-comp'
interface DashboardAfterProps {
  walletId: string;
}

const DashboardAfter: React.FC<DashboardAfterProps> = ({ walletId }) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLoginStatus = async () => {
      setLoading(true);
      console.log('DashboardAfter: walletId:', walletId);
      try {
        const result = await coders_playground_web3_backend.login(walletId);
        console.log('DashboardAfter: backend login result:', result);
      } catch (e) {
        console.error('DashboardAfter: error calling backend login:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchLoginStatus();
  }, [walletId]);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.5rem' }}>Loading...</div>;
  }

  return (
    <div>
      <NavbarComp_DF />
      <CoursesComp />
    </div>
  );
};

export default DashboardAfter;
