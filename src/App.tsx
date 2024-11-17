import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./css/common.css";
import "./css/reset.css";
import Auth from "./pages/Auth";
import Board from "./pages/Board";
import NotFound from "./pages/NotFound";
import userState from "./store/userState";
import WritePost from "./pages/WritePost";
import ViewPost from "./pages/ViewPost";
function App() {
  const { accessToken } = userState();
  return (
    <Routes>
      <Route index element={<Auth></Auth>}></Route>
      <Route path="*" element={<NotFound />}></Route>
      <Route path="/write" element={<WritePost></WritePost>}></Route>
      <Route path="/view:id" element={<ViewPost></ViewPost>}></Route>
      {accessToken && (
        <>
          <Route path="board" element={<Board></Board>}></Route>
        </>
      )}
    </Routes>
  );
}
export default App;
