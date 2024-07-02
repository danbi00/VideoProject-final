import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import PhotoEdit from "./pages/PhotoEdit";
import GlobalStyle from "./GlobalStyle";
import LayOut from "./pages/layout/LayOut";
import VideoEditor from "./component/VideoEditor"; 
import { DarkModeProvider } from "./context/DarkModeContext";

function App() {
  return (
    <DarkModeProvider>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayOut />}>
            <Route index element={<MainPage />} />
            <Route path="/photoedit" element={<PhotoEdit />} /> 
            <Route path="/login" element={<Login />} /> 
            <Route path="/videoeditor" element={<VideoEditor />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;