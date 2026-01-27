import Header from "../components/Header";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import {useForm, useWatch} from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Filters = {
    decisionFrom: string,
    decisionTo: string,
    incidentFrom: string,
    incidentTo: string,
}

const defaultValues: Filters = {
    decisionFrom: "",
    decisionTo: "",
    incidentFrom: "",
    incidentTo: "",
}

const isRangeOk = (from?: string, to?: string) => {
    if (!from || !to) return true;
    return from <= to;
}

const DownloadLayout = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    trigger,
    formState: {errors, touchedFields, isSubmitted},
  } = useForm<Filters>({
    defaultValues,
    mode: "onChange",
  });

  const [open, setOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const decisionFrom = useWatch({control, name: "decisionFrom"});
  const incidentFrom = useWatch({control, name: "incidentFrom"});

  useEffect(() => {
    void trigger("decisionTo");
  }, [decisionFrom, trigger]);

  useEffect(() => {
    void trigger("incidentTo");
  }, [incidentFrom, trigger]);

  const onSubmit = (data: Filters) => {
    console.log("export", data);
    setOpen(true);
  }

  const closeModal = () => {
    setOpen(false);
    navigate("/", {replace: true});
  }
  
  return (
    <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
            <form 
                className="flex flex-col items-center gap-10 shadow-2xl px-10 py-8 rounded-2xl mb-15"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex justify-center gap-32">
                    <div className="flex flex-col gap-5 items-center">
                        <p className="text-accent text-2xl font-normal">Дата принятия решения</p>
                        <div className="flex items-center gap-2">
                            <div className="flex flex-col gap-5">
                                <div className="flex items-center">
                                <span className="text-accent text-lg font-semibold w-10">С:</span>
                            <input 
                                type="date" 
                                className={`date-input ${errors.decisionFrom ? "border-red-600" : ""}`}
                                {...register("decisionFrom", {required: "Обязательное поле"})}
                            />
                            </div>
                            {errors.decisionFrom && (
                                <p className="text-red-600 text-sm self-center">{errors.decisionFrom.message}</p>
                            )}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-accent text-lg font-semibold w-10">ПО:</span>
                            <input 
                                type="date" 
                                className="date-input" 
                                {...register("decisionTo", {
                                    required: "Обязательное поле",
                                    validate: to => isRangeOk(decisionFrom, to) || "Дата «ПО» должна быть не раньше «С»"
                                })}
                            />
                        </div>
                        {errors.decisionTo && (touchedFields.decisionTo || isSubmitted) && (
                            <p className="text-red-600 text-sm">{errors.decisionTo.message}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-5 items-center">
                        <p className="text-accent text-2xl font-normal">Дата инцидента</p>
                        <div className="flex items-center gap-2">
                            <div className="flex flex-col gap-5">
                                <div className="flex items-center">
                                <span className="text-accent text-lg font-semibold w-10">С:</span>
                            <input 
                                type="date" 
                                className={`date-input ${errors.incidentFrom ? "border-red-600" : ""}`}
                                {...register("incidentFrom", {required: "Обязательное поле"})}
                            />
                            </div>
                            {errors.incidentFrom && (
                                <p className="text-red-600 text-sm self-center">{errors.incidentFrom.message}</p>
                            )}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-accent text-lg font-semibold w-10">ПО:</span>
                            <input 
                                type="date" 
                                className="date-input" 
                                {...register("incidentTo", {
                                    required: "Обязательное поле",
                                    validate: to => isRangeOk(incidentFrom, to) || "Дата «ПО» должна быть не раньше «С»"
                                })}
                            />
                        </div>
                        {errors.incidentTo && (touchedFields.incidentTo || isSubmitted) && (
                            <p className="text-red-600 text-sm">{errors.incidentTo.message}</p>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-5">
                    <button 
                        type="button"
                        className="button"
                        onClick={() => reset(defaultValues)}
                    >
                        СБРОС
                    </button>
                    <button className="button">
                        ВЫГРУЗКА
                        <img 
                            src="/download.svg" 
                            alt="Download" 
                            width={20}    
                        />
                    </button>
                </div>
            </form>
            {open && <Modal open={open} onClose={closeModal} />}
        </main>
        <Footer/>
    </div>
  );
}

export default DownloadLayout;