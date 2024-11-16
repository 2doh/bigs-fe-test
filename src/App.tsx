import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./css/common.css";
import "./css/reset.css";
import Auth from "./pages/Auth";
import Board from "./pages/Board";
import userState from "./store/userState";
import NotFound from "./pages/NotFound";
function App() {
  const { accessToken } = userState();
  return (
    <Routes>
      <Route index element={<Auth></Auth>}></Route>
      <Route path="*" element={<NotFound />}></Route>
      {accessToken && <Route path="board" element={<Board></Board>}></Route>}
    </Routes>
  );
}
export default App;
