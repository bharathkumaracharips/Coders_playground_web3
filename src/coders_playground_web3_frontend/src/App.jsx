import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import Dashboard from './Dashboard/App';
import DashboardAfter from './Dashboard-after/App';
import { LoginUI } from './components/login-comp';
import CodingProblemsTable from "./components/problem_set_comp";
import SubmissionsComp from './components/submissions-comp';

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
        <Route path="/problems" element={<CodingProblemsTable />} />
        <Route path="/problems/:courseName" element={<CodingProblemsTable />} />
        <Route path="/score" element={<SubmissionsComp />} />
      </Routes>
    </Router>
  );
}

export default App;
