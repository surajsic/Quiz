import React from "react";

const CategoryDropdown = ({ categories, onSelectCategory }) => {

  

  return (
    <div className="mb-6">
      <label className="block text-lg font-semibold mb-2 text-blue-500">Select Category:</label>
      <select
        onChange={(e) => onSelectCategory(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md text-blue-800"
      >
        <option value="">-- Choose a Category for your Quiz --</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropdown;
