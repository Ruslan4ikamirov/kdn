import { Navigate, useParams } from "react-router-dom";
import { casesData } from "../data";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {useForm, useWatch} from "react-hook-form";
import { useState } from "react";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

type Params = {id: string};

const PersonLayout = () => {

    const [open, setOpen] = useState<boolean>(false);

    const navigate = useNavigate();

    const closeModal = () => {
        setOpen(false);
        navigate('/list', {replace: true});
    }

    const {
        register,
        handleSubmit,
        control,
        formState: {errors}
    } = useForm({
        shouldUnregister: true,
        defaultValues: {
            measuresTaken: "",
            iprOrg: "",
            terminationReason: "",
            jurisdictionTarget : "",
            targetAdminDistrict: "",
            targetMunicipalDistrict: "",
            refusalReviewResult: "",
            reviewdAt: "",
        }
    });

    const measuresTaken = useWatch({control, name: "measuresTaken"});
    const terminationReason = useWatch({control, name: "terminationReason"});
    const jurisdictionTarget = useWatch({control, name: "jurisdictionTarget"});

    const showIprOrg = measuresTaken === "admin_penalty" || (measuresTaken === "terminate" && terminationReason === "expired_terms");

    const {id} = useParams<Params>();
    if (!id) return <Navigate to="/" replace />
    const person = casesData.find(x => String(x.id) === id);
    const isRefusal = person?.articleOrRefusal === "Отказ в возбуждении";

    const onSubmit = (data) => {
        console.log("export", data);
        setOpen(true);
    }
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 flex items-center justify-center">
                {person ? (<div className="flex flex-col justify-center-center shadow-2xl gap-20 px-10 py-8 mb-20 mt-15 rounded-2xl">
                    <div className="flex flex-col">
                        <p className="text-accent text-2xl text-center font-normal mb-5">Данные по случаю</p>
                        <ul className="space-y-3 max-w-200">
                            <li><span className="font-bold">1. Округ:</span> ЦАО</li>
                            <li><span className="font-bold">2. Район:</span> Басманный</li>
                            <li><span className="font-bold">3. Фамилия:</span> {person.lastName}</li>
                            <li><span className="font-bold">4. Имя:</span> {person.firstName}</li>
                            <li><span className="font-bold">5. Отчество:</span> {person.middleName}</li>
                            <li><span className="font-bold">6. Дата рождения:</span> {person.birthDate}</li>
                            <li><span className="font-bold">7. Основание для <br/> привлечения к ответственности:</span> {person.articleOrRefusal}</li>
                        </ul>
                    </div>
                    <form 
                        className="flex flex-col"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <p className="text-accent text-2xl text-center font-normal mb-5">Данные для заполнения</p>
                        <ul className="space-y-3 max-w-300">
                            <li className="grid grid-cols-[1fr_240px] items-center gap-6 justify-items-end">
                                <span className="font-bold justify-self-start">
                                    Дата фактического рассмотрения административного/отказного материала:
                                </span>
                                <input 
                                    type="date" 
                                    className={`${errors.reviewdAt ? "border-red-500!" : ""} date-input`}
                                    {...register("reviewdAt", {required: true})}
                                />
                            </li>

                            {isRefusal ? (
                                <li className="grid grid-cols-[1fr_240px] items-center gap-6 justify-items-end">
                                <span className="font-bold justify-self-start">Результат рассмотрения отказного материала:</span>
                                <select 
                                    defaultValue=""
                                    className={`${errors.refusalReviewResult ? "border-red-500!" : ""} select-input`}
                                    {...register("refusalReviewResult", {required: true})}
                                >
                                    <option disabled={true}>Выберите вариант</option>
                                    <option>Рассмотрено с организацией ИПР</option>
                                    <option>Рассмотрено без организации ИПР</option>
                                    <option>Отложение рассмотрения</option>
                                    <option>Направление по подведомственности</option>
                                    <option>Прекращено по отсутствию события</option>
                                </select>
                            </li>
                            ) : (
                                <>
                                    <li className="grid grid-cols-[1fr_240px] items-center gap-6 justify-items-end">
                                    <span className="font-bold justify-self-start">Принятые меры:</span>
                                    <select 
                                        defaultValue=""
                                        className={`${errors.measuresTaken ? "border-red-500!" : ""} select-input`}
                                        {...register("measuresTaken", {required: true})}
                                    >
                                        <option disabled={true}>Выберите вариант</option>
                                        <option value="admin_penalty">Административное наказание (штраф или предупреждение) </option>
                                        <option>Отложение рассмотрения</option>
                                        <option value="jurisdiction">Направление по подведомственности</option>
                                        <option value="terminate">Прекращение рассмотрения дела</option>
                                        <option>Возврат на доработку </option>
                                    </select>
                                </li>
                                {measuresTaken === "terminate" && (
                                    <li className="grid grid-cols-[1fr_240px] items-center gap-6 justify-items-end">
                                    <span className="font-bold justify-self-start">Причина прекращения рассмотрения дела:</span>
                                    <select 
                                        defaultValue=""
                                        className={`${errors.terminationReason ? "border-red-500!" : ""} select-input`}
                                        {...register("terminationReason", {required: true})}
                                    >
                                        <option disabled={true}>Выберите вариант</option>
                                        <option value="expired_terms">Истечение сроков</option>
                                        <option>Отсутствие события</option>
                                        <option>Отсутствие состава</option>
                                        <option>Прекращено по малозначительности</option>
                                    </select>
                                </li>
                                )}
                                {showIprOrg && (
                                    <li className="grid grid-cols-[1fr_240px] items-center gap-6 justify-items-end">
                                        <span className="font-bold justify-self-start">Организация ИПР:</span>
                                        <select
                                        defaultValue=""
                                        className={`${errors.iprOrg ? "border-red-500!" : ""} select-input`}
                                        {...register("iprOrg", { required: true })}
                                        >
                                        <option value="" disabled>Выберите вариант</option>
                                        <option value="with_ipr">Рассмотрено с организацией ИПР</option>
                                        <option value="without_ipr">Рассмотрено без организации ИПР</option>
                                        </select>
                                    </li>
                                )}
                                {measuresTaken === "jurisdiction" && (
                                    <>
                                        <li className="grid grid-cols-[1fr_240px] items-center gap-6 justify-items-end">
                                            <span className="font-bold justify-self-start">Направление под подведомственности:</span>
                                            <select 
                                                defaultValue=""
                                                className={`${errors.jurisdictionTarget ? "border-red-500!" : ""} select-input`}
                                                {...register("jurisdictionTarget", {required: true})}
                                            >
                                                <option disabled={true}>Выберите вариант</option>
                                                <option value="district">Округ, район</option>
                                                <option>Московская область</option>
                                                <option>Другой район</option>
                                            </select>
                                        </li>
                                        {jurisdictionTarget === "district" && (
                                            <>
                                                <li className="grid grid-cols-[1fr_240px] items-center gap-6 justify-items-end">
                                                    <span className="font-bold justify-self-start">Выберите округ:</span>
                                                    <select 
                                                        defaultValue=""
                                                        className={`${errors.targetAdminDistrict ? "border-red-500!" : ""} select-input`}
                                                        {...register("targetAdminDistrict", {required: true})}
                                                    >
                                                        <option disabled={true}>Выберите вариант</option>
                                                        <option>ЦАО</option>
                                                        <option>ЮАО</option>
                                                        <option>ЮЗАО</option>
                                                    </select>
                                                </li>
                                                <li className="grid grid-cols-[1fr_240px] items-center gap-6 justify-items-end">
                                                    <span className="font-bold justify-self-start">Выберите район:</span>
                                                    <select 
                                                        defaultValue=""
                                                        className={`${errors.targetMunicipalDistrict ? "border-red-500!" : ""} select-input`}
                                                        {...register("targetMunicipalDistrict", {required: true})}
                                                    >
                                                        <option disabled={true}>Выберите вариант</option>
                                                        <option>Басманный</option>
                                                        <option>Кузьминки</option>
                                                        <option>Тропарёво-Никулино</option>
                                                    </select>
                                                </li>
                                            </>
                                        )}
                                    </>
                                )}
                                </>
                            )}
                        </ul>
                        <div className="flex justify-center mt-10">
                            <button className="button">ОТПРАВИТЬ</button>
                        </div>
                    </form>
                    {open &&
                <Modal 
                    open={open}
                    onClose={closeModal}
                    message="Данные успешно отправлены!"
                />}
                </div>) : (<div className="flex justify-center mt-10">
                            <p className="text-accent text-2xl">Материалы не найдены</p>
                        </div>)}
            </main>
            <Footer/>
        </div>
    );
}

export default PersonLayout;