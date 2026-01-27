import { Navigate, useParams } from "react-router-dom";
import { casesData } from "../data";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PersonLayout = () => {

 type Params = {id: string};

  const {id} = useParams<Params>();
  if (!id) return <Navigate to="/" replace />
  const person = casesData.find(x => String(x.id) === id);
  return (
    <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
            {person ? (<div className="flex flex-col justify-center-center shadow-2xl gap-20 px-10 py-8 mb-20 mt-15 rounded-2xl">
                <div className="flex flex-col">
                    <p className="text-accent text-2xl text-center font-normal mb-5">Данные по делу</p>
                    <ul className="space-y-3 max-w-200">
                        <li><span className="font-bold">1. Округ:</span></li>
                        <li><span className="font-bold">2. Район:</span></li>
                        <li><span className="font-bold">3. Фамилия:</span> {person.lastName}</li>
                        <li><span className="font-bold">4. Имя:</span> {person.firstName}</li>
                        <li><span className="font-bold">5. Отчество:</span> {person.middleName}</li>
                        <li><span className="font-bold">6. Дата рождения:</span> {person.birthDate}</li>
                        <li><span className="font-bold">7. Основание для <br/> привлечения к ответственности:</span> {person.articleOrRefusal}</li>
                    </ul>
                </div>
                <form className="flex flex-col">
                    <p className="text-accent text-2xl text-center font-normal mb-5">Данные для заполнения</p>
                    <ul className="space-y-3 max-w-300">
                        <li className="grid grid-cols-[1fr_240px] items-center gap-6 justify-items-end">
                            <span className="font-bold justify-self-start">
                            Дата фактического рассмотрения административного/отказного материала:
                            </span>
                            <input type="date" className="date-input" />
                        </li>

                        <li className="grid grid-cols-[1fr_240px] items-center gap-6 justify-items-end">
                            <span className="font-bold justify-self-start">Результат рассмотрения отказного материала:</span>
                            <select defaultValue="Выберите вариант" className="select w-60 text-black outline-none border-2 border-accent rounded-3xl text-md py-5 cursor-pointer">
                                <option disabled={true}>Выберите вариант</option>
                                <option>Рассмотрено с организацией ИПР</option>
                                <option>Рассмотрено без организации ИПР</option>
                                <option>Отложение рассмотрения</option>
                                <option>Направление по подведомственности</option>
                                <option>Прекращено по отсутствию события</option>
                            </select>
                        </li>

                        <li className="grid grid-cols-[1fr_240px] items-center gap-6 justify-items-end">
                            <span className="font-bold justify-self-start">Принятые меры:</span>
                            <select defaultValue="Выберите вариант" className="select w-60 text-black outline-none border-2 border-accent rounded-3xl text-md py-5 cursor-pointer">
                                <option disabled={true}>Выберите вариант</option>
                                <option>Административное наказание (штраф или предупреждение) </option>
                                <option>Отложение рассмотрения</option>
                                <option>Направление по подведомственности</option>
                                <option>Прекращение рассмотрения дела</option>
                                <option>Возврат на доработку </option>
                            </select>
                        </li>

                        <li className="grid grid-cols-[1fr_240px] items-center gap-6 justify-items-end">
                            <span className="font-bold justify-self-start">Организация ИПР:</span>
                            <select defaultValue="Выберите вариант" className="select w-60 text-black outline-none border-2 border-accent rounded-3xl text-md py-5 cursor-pointer">
                                <option disabled={true}>Выберите вариант</option>
                                <option>Рассмотрено с организацией ИПР</option>
                                <option>Рассмотрено без организации ИПР</option>
                            </select>
                        </li>
                        <li className="grid grid-cols-[1fr_240px] items-center gap-6 justify-items-end">
                            <span className="font-bold justify-self-start">Принятые меры:</span>
                            <select defaultValue="Выберите вариант" className="select w-60 text-black outline-none border-2 border-accent rounded-3xl text-md py-5 cursor-pointer">
                                <option disabled={true}>Выберите вариант</option>
                                <option>Административное наказание (штраф или предупреждение) </option>
                                <option>Отложение рассмотрения</option>
                                <option>Направление по подведомственности</option>
                                <option>Прекращение рассмотрения дела</option>
                                <option>Возврат на доработку </option>
                            </select>
                        </li>

                        <li className="grid grid-cols-[1fr_240px] items-center gap-6 justify-items-end">
                            <span className="font-bold justify-self-start">Организация ИПР:</span>
                            <select defaultValue="Выберите вариант" className="select w-60 text-black outline-none border-2 border-accent rounded-3xl text-md py-5 cursor-pointer">
                                <option disabled={true}>Выберите вариант</option>
                                <option>Рассмотрено с организацией ИПР</option>
                                <option>Рассмотрено без организации ИПР</option>
                            </select>
                        </li>
                        <li className="grid grid-cols-[1fr_240px] items-center gap-6 justify-items-end">
                            <span className="font-bold justify-self-start">Принятые меры:</span>
                            <select defaultValue="Выберите вариант" className="select w-60 text-black outline-none border-2 border-accent rounded-3xl text-md py-5 cursor-pointer">
                                <option disabled={true}>Выберите вариант</option>
                                <option>Административное наказание (штраф или предупреждение) </option>
                                <option>Отложение рассмотрения</option>
                                <option>Направление по подведомственности</option>
                                <option>Прекращение рассмотрения дела</option>
                                <option>Возврат на доработку </option>
                            </select>
                        </li>

                        <li className="grid grid-cols-[1fr_240px] items-center gap-6 justify-items-end">
                            <span className="font-bold justify-self-start">Организация ИПР:</span>
                            <select defaultValue="Выберите вариант" className="select w-60 text-black outline-none border-2 border-accent rounded-3xl text-md py-5 cursor-pointer">
                                <option disabled={true}>Выберите вариант</option>
                                <option>Рассмотрено с организацией ИПР</option>
                                <option>Рассмотрено без организации ИПР</option>
                            </select>
                        </li>
                    </ul>
                    <div className="flex justify-center mt-10">
                        <button className="button">ОТПРАВИТЬ</button>
                    </div>
                </form>
            </div>) : (<div className="flex justify-center mt-10">
                        <p className="text-accent text-2xl">Материалы не найдены</p>
                      </div>)}
        </main>
        <Footer/>
    </div>
  );
}

export default PersonLayout;