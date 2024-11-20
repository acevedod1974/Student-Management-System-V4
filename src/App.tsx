import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { CoursePage } from "./pages/CoursePage";
import { StudentDetailPage } from "./pages/StudentDetailPage";
import { Header } from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <div className="mt-8 font-sans">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/course/:courseId" element={<CoursePage />} />
          <Route
            path="/course/:courseId/student/:studentId"
            element={<StudentDetailPage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
