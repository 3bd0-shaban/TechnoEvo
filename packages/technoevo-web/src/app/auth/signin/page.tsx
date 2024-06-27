import React from 'react';
import SigninForm from './Signin.form';

export default function page() {
  return (
    <div className="flex h-[60vh] items-center justify-center">
      <div className="container max-w-lg rounded-xl border bg-blue-50/10 p-5 shadow-md shadow-gray-200 backdrop-blur-sm">
        <p>Welcom in TechnoEvo</p>
        <SigninForm />
      </div>
    </div>
  );
}
