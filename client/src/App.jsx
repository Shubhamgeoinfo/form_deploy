import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Page1 } from "./component/page1/Page1";
import { Page2 } from "./component/page2/Page2";

function App() {
  return (
    <div className="appContainer">
      <h1 className="header">Digital Code Editor</h1>
      <Routes>
        <Route path="/" element={<Page1 />} />
        <Route path="/submit/:username" element={<Page2 />} />
      </Routes>
    </div>
  );
}

export default App;
