import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm shadow-accent mb-10 flex items-center justify-between py-3">
        <Link to="/list">
            <img 
                src="/logo.svg" 
                alt="Logo" 
                width={140}
            />
        </Link>
        <ul className="flex gap-5 text-accent text-xl font-semibold">
            <li className="px-2 py-0.5 rounded-3xl transition-colors duration-400 ease-in">
                <Link to="/list">Материалы</Link>
            </li>
            <li className="px-2 py-0.5 rounded-3xl transition-colors duration-400 ease-in">
                <Link to="/download">Выгрузка данных</Link>
            </li>
            <li className="px-2 py-0.5 rounded-3xl transition-colors duration-400 ease-in">
                <Link to="/upload">Загрузка данных</Link>
            </li>
        </ul>
        <span className="bg-accent flex items-center text-white px-2 py-1 rounded-3xl">
            <img 
                src="/user.svg" 
                alt="User" 
                width={25}    
            />
            Аналитик ГКДН
        </span>
    </div>
  );
}

export default Header;