import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-20 py-5 flex justify-between">
      <h1 className="text-2xl font-bold">
        <Link
          to="/"
          className=" text-3xl font-bold"
        >
          CRUD App
        </Link>
        
      </h1>

      <div className="space-x-6">
        <Link
          to="/"
          className="hover:underline text-xl font-bold"
        >
          Add User
        </Link>

        <Link
          to="/users"
          className="hover:underline text-xl font-bold"
        >
          User List
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
