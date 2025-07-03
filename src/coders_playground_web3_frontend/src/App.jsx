import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import Dashboard from './Dashboard/App';
import DashboardAfter from './Dashboard-after/App';
import { LoginUI } from './components/login-comp';
import CodingProblemsTable from "./components/problem_set_comp";
import SubmissionsComp from './components/submissions-comp';
import LearnSidebar from "./components/learn-sidebar";
import { LearnCoursesFrame } from "./components/learn-courses-frame-comp";
import { ProposeComp } from "./components/propose-comp";
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
        <Route path="/learn-sidebar" element={<LearnSidebar />} />
        <Route path="/learn-courses-frame" element={<LearnCoursesFrame />} />
        <Route path="/propose" element={<ProposeComp />} />
      </Routes>
    </Router>
  );
}

export default App;
