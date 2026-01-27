import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {casesData} from "../data";

const ListLayout = () => {

  const [q, setQ] = useState<string>("");
  const [page, setPage]= useState<number>(1);

  const PAGE_SIZE = 5;

  const filteredRows = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return casesData;

    return casesData.filter(r => {
        const fio = `${r.lastName} ${r.firstName} ${r.middleName}`.toLowerCase();
        return fio.includes(query);
    });
  }, [q]);

  const lastPage = useMemo(() => {
    return Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));
  }, [filteredRows.length]);

  const currentPage = Math.min(Math.max(page, 1), lastPage);

  useEffect(() => {
    setPage(1);
  }, [q]);

  const pageRows = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredRows.slice(start, start + PAGE_SIZE);
  }, [filteredRows, currentPage]);

  const goPrev = () => setPage(p => Math.max(1, p - 1));
  const goNext = () => setPage(p => Math.min(lastPage, p + 1));

  return (
    <div className="min-h-screen flex flex-col">
    <Header />
    <div className="p-3">
        <input
          className="input w-60 text-black outline-none border-2 border-accent rounded-3xl placeholder:text-[#635353] text-md"
          placeholder="Поиск"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
    {filteredRows.length > 0 ? (<div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table text-black">
        <thead>
          <tr>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Дата рождения</th>
            <th>Статья или отказное</th>
            <th>Дата отправки</th>
            <th>Дата рассмотрения</th>
            <th>Результат рассмотрения</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {pageRows.map(row => (
            <tr key={row.id}>
                 <td>{row.lastName}</td>
                 <td>{row.firstName}</td>
                 <td>{row.middleName}</td>
                 <td>{row.birthDate}</td>
                 <td>{row.articleOrRefusal}</td>
                 <td>{row.sentAt}</td>
                 <td>{row.reviewedAt}</td>
                 <td>{row.result}</td>
                 <th>
                    <Link
                        to={`/person/${row.id}`}
                        className="bg-accent text-white font-semibold px-2 py-1 rounded-md"
                    >
                        Подробнее
                    </Link>
                </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>) : <div className="flex justify-center mt-10">
        <p className="text-accent text-2xl">Материалы не найдены</p>
    </div>}
    {filteredRows.length > 0 && (
        <div className="flex justify-end items-center gap-3 px-10 py-4">
          <span className="text-sm text-gray-600">
            Стр. {currentPage} из {lastPage}
          </span>
          <div className="join flex gap-1">
            <button
              className="paginate-button"
              onClick={goPrev}
              disabled={currentPage === 1}
            >
              «
            </button>

            <button
              className={`paginate-button ${currentPage === 1 ? "btn-active" : ""}`}
              onClick={() => setPage(1)}
            >
              1
            </button>

            {lastPage === 2 && (
              <button
                className={`paginate-button ${currentPage === 2 ? "btn-active" : ""}`}
                onClick={() => setPage(2)}
              >
                2
              </button>
            )}

            {lastPage >= 3 && (
              <>
                <button className="btn-disabled paginate-button" disabled>
                  ...
                </button>
                <button
                  className={`paginate-button ${currentPage === lastPage ? "btn-active" : ""}`}
                  onClick={() => setPage(lastPage)}
                >
                  {lastPage}
                </button>
              </>
            )}

            <button
              className="paginate-button"
              onClick={goNext}
              disabled={currentPage === lastPage}
            >
              »
            </button>
          </div>
        </div>
      )}
    <div className="mt-auto">
      <Footer />
    </div>
    </div>
  );
};

export default ListLayout;
