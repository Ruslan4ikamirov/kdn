import { Routes, Route } from "react-router-dom";
import ListLayout from "./layouts/ListLayout";
import LoginLayout from "./layouts/LoginLayout";
import UploadLayout from "./layouts/UploadLayout";
import DownloadLayout from "./layouts/DownloadLayout";
import PersonLayout from "./layouts/PersonLayout";

const App = () => {
  return (
   <Routes>
    <Route path="/" element={<LoginLayout />} />
    <Route path="/list" element={<ListLayout />} />
    <Route path="/upload" element={<UploadLayout />} />
    <Route path="/download" element={<DownloadLayout />} />
    <Route path="/person/:id" element={<PersonLayout />} />
   </Routes>
  );
};

export default App;
