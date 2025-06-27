import React, { useEffect, useState } from 'react';
import { coders_playground_web3_backend } from '../../../declarations/coders_playground_web3_backend';
import { NavbarComp_DF } from '../components/Nav_df_comp';
interface DashboardAfterProps {
  walletId: string;
}

const DashboardAfter: React.FC<DashboardAfterProps> = ({ walletId }) => {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLoginMessage = async () => {
      setLoading(true);
      try {
        const result = await coders_playground_web3_backend.login(walletId);
        setMessage(result.message);
      } catch (e) {
        setMessage('Failed to fetch login message from backend.');
      } finally {
        setLoading(false);
      }
    };
    fetchLoginMessage();
  }, [walletId]);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.5rem' }}>Loading...</div>;
  }

  return (
    <div>
      <NavbarComp_DF />

    <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.5rem' }}>
      {message}
    </div>
    </div>
  );
};

export default DashboardAfter;
