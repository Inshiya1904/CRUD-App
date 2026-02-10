import UserForm from "../components/UserForm";
import { createUser, updateUser } from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import type { User } from "../types/user";

const AddUser = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const editUser = location.state?.user || null;

  const handleSubmit = async (user: User) => {
    if (editUser?._id) {
      await updateUser(editUser._id, user);
    } else {
      await createUser(user);
    }

    navigate("/users"); // Go to list page
  };

  return (
    <div className="max-w-xl mx-auto p-10">
      <UserForm
        onSubmit={handleSubmit}
        editUser={editUser}
      />
    </div>
  );
};

export default AddUser;
