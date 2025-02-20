import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    semester: "",
    year: "",
    contact: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify(formData)); // Temporary storage
    navigate("/rules");
  };

  return (
    <>
      <div className="text-white w-full h-screen flex flex-col gap-10 items-center justify-center bg-black">
  {/* Title */}
  <h1 className="text-4xl font-mono font-extrabold text-center mb-6">Code Chronicles</h1>

  {/* Subtitle */}
  <h2 className="text-3xl font-bold text-center mb-8">Enter Your Details</h2>

  {/* Form Container */}
  <div className="w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-lg ">
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Name"
        required
        onChange={handleChange}
        className="w-full p-3 bg-gray-800 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        name="department"
        placeholder="Department"
        required
        onChange={handleChange}
        className="w-full p-3 bg-gray-800 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        name="semester"
        placeholder="Semester"
        required
        onChange={handleChange}
        className="w-full p-3 bg-gray-800 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        name="year"
        placeholder="Year"
        required
        onChange={handleChange}
        className="w-full p-3 bg-gray-800 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        name="contact"
        placeholder="Contact No."
        required
        onChange={handleChange}
        className="w-full p-3 bg-gray-800 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
      >
        Next
      </button>
    </form>
  </div>
</div>

    </>
  );
}

export default Home;
