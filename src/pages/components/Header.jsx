import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between max-w-6xl mx-auto p-3 items-center">
      <Link to="/">
        <h1 className="flex flex-wrap font-bold text-sm sm:text-xl ">
          <span className="text-slate-500">Mern</span>
          <span className="text-slate-700">Estate</span>
        </h1>
      </Link>
      <form className="flex items-center rounded-lg p-3 bg-slate-100">
        <input type="text" placeholder="Search..." className="bg-transparent outline-none w-24 sm:w-64 "/>
        <FaSearch className="text-slate-600" />
      </form>
      <ul className="flex gap-4">
        <Link to="/">
          <li className="hidden sm:inline text-slate-700 hover:underline">Home</li>
        </Link>
        <Link to="/about">
          <li className="hidden sm:inline text-slate-700 hover:underline">About</li>
        </Link>
        <Link to="/sign-in">
          <li className="hover:underline text-slate-700">Sign in</li>
        </Link>
      </ul>
      </div>

    </header>
  );
}
