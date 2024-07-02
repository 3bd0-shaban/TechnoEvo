import React from 'react';
import Editor from './Editor';

export default function NEwBlog() {
  return (
    <div className="flex flex-col my-5">
        <p className='text-2xl font-semibold underline'>Create New Blog :</p>
      <Editor />
    </div>
  );
}
