import { useEffect, useState, useMemo } from "react";
import { getUsers, deleteUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/user";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  // Pagination State
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0); // starts from 0

  const navigate = useNavigate();

  // ======================
  // Fetch Users
  // ======================
  const fetchUsers = async () => {
    setLoading(true);
    const data = await getUsers();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ======================
  // Delete
  // ======================
  const handleDelete = async (id: string) => {
    await deleteUser(id);
    fetchUsers();
  };

  // ======================
  // Edit
  // ======================
  const handleEdit = (user: User) => {
    navigate("/", { state: { user } });
  };

  // ======================
  // Search Filter
  // ======================
  const filteredUsers = useMemo(() => {
    return users.filter((u) =>
      `${u.firstName} ${u.lastName} ${u.email} ${u.phone}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [users, search]);

  // ======================
  // Pagination Logic
  // ======================
  const start = page * rowsPerPage;
  const end = start + rowsPerPage;

  const paginatedUsers = filteredUsers.slice(
    start,
    end
  );

  const total = filteredUsers.length;

  // Reset page on search / rows change
  useEffect(() => {
    setPage(0);
  }, [search, rowsPerPage]);

  if (loading) {
    return (
      <p className="text-center mt-10">
        Loading users...
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* Title */}
      <h2 className="text-3xl font-bold mb-6 text-center">
        User List
      </h2>

      {/* Search */}
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-64"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full border-collapse">

          {/* Head */}
          <thead className="bg-gray-100">
            <tr>
              {[
                "#",
                "First Name",
                "Last Name",
                "Phone",
                "Email",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-sm font-semibold border"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {paginatedUsers.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-6 text-gray-500"
                >
                  No users found
                </td>
              </tr>
            ) : (
              paginatedUsers.map((u, index) => (
                <tr
                  key={u._id}
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 py-3 border">
                    {start + index + 1}
                  </td>

                  <td className="px-4 py-3 border">
                    {u.firstName}
                  </td>

                  <td className="px-4 py-3 border">
                    {u.lastName}
                  </td>

                  <td className="px-4 py-3 border">
                    {u.phone}
                  </td>

                  <td className="px-4 py-3 border">
                    {u.email}
                  </td>

                  <td className="px-4 py-3 border text-center space-x-3">
                    <button
                      onClick={() => handleEdit(u)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(u._id!)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ======================
          Pagination Bar
      ====================== */}
      <div className="flex items-center justify-end gap-6 mt-4 text-sm text-gray-700">

        {/* Rows Per Page */}
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>

          <select
            value={rowsPerPage}
            onChange={(e) =>
              setRowsPerPage(Number(e.target.value))
            }
            className="border rounded px-2 py-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
        </div>

        {/* Range Info */}
        <div>
          {total === 0
            ? "0–0 of 0"
            : `${start + 1}–${Math.min(
                end,
                total
              )} of ${total}`}
        </div>

        {/* Controls */}
        <div className="flex gap-2">

          {/* Prev */}
          <button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            className="px-2 py-1 rounded hover:bg-gray-200 disabled:opacity-40"
          >
            ◀
          </button>

          {/* Next */}
          <button
            disabled={end >= total}
            onClick={() => setPage(page + 1)}
            className="px-2 py-1 rounded hover:bg-gray-200 disabled:opacity-40"
          >
            ▶
          </button>

        </div>
      </div>
    </div>
  );
};

export default Users;
