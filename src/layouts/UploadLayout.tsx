import Footer from "../components/Footer";
import Header from "../components/Header";
import {useForm} from "react-hook-form";

type UploadForm = {
    inputFile: FileList | null,
}

const UploadLayout = () => {

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<UploadForm>({defaultValues: {inputFile: null}});

  const onSubmit = (data: UploadForm) => {
    console.log("export", data);
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
        </main>
        <Footer/>
    </div>
  );
}

export default UploadLayout;