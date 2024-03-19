import { SigninInput } from "@tillu002/medium-common";
import { Design } from "../components/Design";
import { LabelledInput } from "../components/Input";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useSetRecoilState } from "recoil";
import { nameAtom, userIdAtom } from "../atoms";

export const Signin = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<SigninInput>({
    username: "",
    password: "",
  });

  useEffect(() => {
    const auth = localStorage.getItem("token");
    if (auth) {
      navigate("/blogs");
    }
  }, []);

  const setAuthorName = useSetRecoilState(nameAtom);
  const setUid = useSetRecoilState(userIdAtom);

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        inputs
      );

      const jwt = response.data.token;
      setAuthorName(response.data.name);
      setUid(response.data.uid);
      localStorage.setItem("token", jwt);
      localStorage.setItem("uid", response.data.uid);
      navigate("/blogs");
    } catch (e) {}
  }

  return (
    <div className="w-full h-screen">
      <div className="w-full h-screen bg-bannerBg bg-cover bg-center">
        <div className="z-1">
          <Design />
        </div>
        <div className="w-full h-screen grid place-items-center z-20 opacity-100">
          <div className="w-[400px] h-[500px] bg-black flex flex-col">
            <h1 className="text-white text-center text-5xl font-bold">
              Signin
            </h1>
            <p className="text-white text-center mt-2 text-xs">
              Enter your credentials to Signin
            </p>
            <div className="mt-auto mb-auto flex flex-col justify-center items-center">
              <LabelledInput
                className="w-[300px] text-xl  p-2 rounded-md"
                label="Email"
                type="email"
                placeholder="pavansohith@example.com"
                onChange={(e) => {
                  setInputs({ ...inputs, username: e.target.value });
                }}
              />

              <LabelledInput
                className="w-[300px] text-xl  p-2 rounded-md"
                label="Password"
                type="password"
                onChange={(e) => {
                  setInputs({ ...inputs, password: e.target.value });
                }}
              />
              <button
                onClick={sendRequest}
                data-variant="flat"
                className="text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none  bg-blue-400 text-white px-3 md:px-6 lg:px-6 py-2 md:py-3.5 lg:py-4 hover:text-white hover:bg-blue-500 hover:shadow-cart h-12 lg:h-14 mt-3 text-sm lg:text-base w-full sm:w-auto"
              >
                Signin
              </button>
              <p className="text-white mt-3">
                New to Blogger?
                <Link className="underline" to={"/signup"}>
                  Signup
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
