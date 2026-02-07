'use client';

import { useState } from 'react';

type ProjectFormValues = {
  title: string;
  content: string;
};

type ProjectFormProps = {
  initialTitle?: string;
  initialContent?: string;
  submitLabel: string;
  onSubmit: (values: ProjectFormValues) => Promise<void> | void;
  loading?: boolean;
  errorMessage?: string | null;
};

export const ProjectForm = ({
  initialTitle = '',
  initialContent = '',
  submitLabel,
  onSubmit,
  loading = false,
  errorMessage = null,
}: ProjectFormProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    await onSubmit({ title, content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
          className="block p-4 border rounded hover:bg-gray-600"
        />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          required
          className="block p-4 border rounded hover:bg-gray-600"
        />
      </div>
      <hr className="my-4 h-px bg-gray-600" />
      {errorMessage ? <p>Error: {errorMessage}</p> : null}
      <button type="submit" disabled={loading} className="block p-4 border rounded hover:bg-gray-600 cursor-pointer">
        {loading ? `Loading...` : submitLabel}
      </button>
    </form>
  );
};
