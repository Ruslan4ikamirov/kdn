import Footer from "../components/Footer";
import Header from "../components/Header";
import {useForm} from "react-hook-form";
import Modal from "../components/Modal";
import { useState } from "react";

type UploadForm = {
    inputFile: FileList | null,
}

const UploadLayout = () => {

  const {
    register,
    handleSubmit,
    resetField,
    formState: {errors}
  } = useForm<UploadForm>({defaultValues: {inputFile: null}});

  const [open, setOpen] = useState<boolean>(false);
  const [fileKey, setFileKey] = useState<number>(0);

  const closeModal = () => {
    setOpen(false);
    resetField("inputFile");
    console.log(fileKey);
    setFileKey(k => k + 1);
  }

  const onSubmit = (data: UploadForm) => {
    console.log("export", data);
    setOpen(true);
  }
  return (
    <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
            <form 
                className="flex flex-col gap-5 items-center"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex items-center gap-3">
                    <img 
                        src="/info.svg" 
                        alt="Info" 
                        width={30}
                    />
                    <p className="text-accent text-2xl font-medium">Прикрепите файл в формате XLSX</p>
                </div>
                <div className="flex gap-5">
                    <input 
                        key={fileKey}
                        type="file" 
                        className="file-input file-input-accent file:text-lg outline-none rounded-3xl border-2" 
                        {...register("inputFile", {required: "Прикрепите файл перед отправкой"})}
                        accept=".xlsx"
                    />
                    <button 
                        type="submit"
                        className="button"
                    >
                        ОТПРАВИТЬ
                    </button>
                </div>
                {errors.inputFile && (
                    <p className="text-red-600 text-sm">{errors.inputFile.message}</p>
                )}
            </form>
            {open &&
            <Modal 
                open={open}
                onClose={closeModal}
                message="Данные успешно загружены!"
            />}
        </main>
        <Footer/>
    </div>
  );
}

export default UploadLayout;