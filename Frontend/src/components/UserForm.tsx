import { useEffect, useState } from "react";
import type { User } from "../types/user";

interface Props {
  onSubmit: (user: User) => void;
  editUser: User | null;
}

interface Errors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
}

const emptyUser: User = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
};

const UserForm = ({ onSubmit, editUser }: Props) => {
  const [form, setForm] = useState<User>(emptyUser);
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    if (editUser) setForm(editUser);
  }, [editUser]);

  // ======================
  // Validation Function
  // ======================
  const validate = () => {
    const newErrors: Errors = {};

    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ======================
  // Handlers
  // ======================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    // Clear error on typing
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit(form);
    setForm(emptyUser);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl rounded p-10 mb-6 space-y-4"
    >
      <h1 className="text-xl font-bold">
        {editUser ? "Edit User" : "Add User"}
      </h1>

      {/* First Name */}
      <div>
        <input
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm">{errors.firstName}</p>
        )}
      </div>

      {/* Last Name */}
      <div>
        <input
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm">{errors.lastName}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => {
            const onlyNums = e.target.value.replace(/\D/g, "");

            if (onlyNums.length <= 10) {
              setForm({
                ...form,
                phone: onlyNums,
              });
            }
          }}
          className="w-full border px-3 py-2 rounded"
        />

        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      {/* Email */}
      <div>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <button className="bg-blue-600 text-white text-xl font-medium px-4 py-2 rounded w-full">
        {editUser ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default UserForm;
