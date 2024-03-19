import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Blogs } from "./components/Blogs";
import { Blog } from "./pages/Blog";
import { Publish } from "./components/Publish";
import { RecoilRoot } from "recoil";
import { MyBlogs } from "./pages/MyBlogs";
import { MyProfile } from "./pages/MyProfile";
import { EditBlog } from "./pages/EditBlog";

function App() {
  return (
    <>
      <BrowserRouter>
        <RecoilRoot>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Signin />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/publish" element={<Publish />} />
            <Route path="/myBlogs" element={<MyBlogs />} />
            <Route path="/me" element={<MyProfile />} />
            <Route path="/blog/edit/:id" element={<EditBlog />} />
          </Routes>
        </RecoilRoot>
      </BrowserRouter>
    </>
  );
}

export default App;
