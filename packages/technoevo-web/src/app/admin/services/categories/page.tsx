import React from 'react';
import NewCategory from './NewCategory';
import CategoriesTable from './categoriesTable';
export default function Category() {
  return (
    <div className="my-5 flex flex-col">
      <p className="text-2xl font-semibold underline">Create New Blog :</p>
      <NewCategory />
      <CategoriesTable />
    </div>
  );
}
