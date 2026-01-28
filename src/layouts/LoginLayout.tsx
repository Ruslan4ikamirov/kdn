import { useState } from "react";
import Footer from "../components/Footer";
import {useForm} from "react-hook-form";

type LoginData = {
  login: string,
  password: string,
}

const LoginLayout = () => {

  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<LoginData>();

  const onSubmit = (data: LoginData) => {
    console.log("export", data);
  }
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex justify-center items-center">
        <form 
          className="flex flex-col gap-8 items-center shadow-2xl py-10 px-20 rounded-2xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <img src="/logo.svg" alt="Logo" width={200} />
          <div className="flex flex-col gap-5">
            <input
                type="text"
                placeholder="Логин"
                className={`${errors.login ? "border-red-500!" : ""} login-input`}
                {...register("login", {required: true})}
          />
          <div className="relative w-60">
            <input
                type={show ? "text" : "password"}
                placeholder="Пароль"
                className={`${errors.password ? "border-red-500!" : ""} login-input`}
                {...register("password", {required: true})}
            />
            <button
                type="button"
                onClick={() => setShow((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            >
                <img
                    src={show ? "/eye-off.svg" : "/eye.svg"}
                    alt="Eye"
                    className="w-6 h-6"
                />
            </button>
            </div>
          </div>
          <button className="button">
            ВОЙТИ
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default LoginLayout;
