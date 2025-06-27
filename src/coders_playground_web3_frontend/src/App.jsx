import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import Dashboard from './Dashboard/App';
import DashboardAfter from './Dashboard-after/App';
import { LoginUI } from './components/login-comp';

function DashboardAfterWrapper() {
  const { walletId } = useParams();
  return <DashboardAfter walletId={walletId || ""} />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginUI />} />
        <Route path="/dashboard-after/:walletId" element={<DashboardAfterWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;
