import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./css/common.css";
import "./css/reset.css";
import Auth from "./pages/Auth";
function App() {
  return (
    <Routes>
      <Route path="auth" element={<Auth></Auth>}></Route>
    </Routes>
  );
}
export default App;
