'use client';

import { useParams, useRouter } from 'next/navigation';
import { useProjectQuery, useDeleteProjectMutation } from '@/features/projects/generated/queries.graphql';
import Link from 'next/link';

const ProjectPage = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { loading, error, data } = useProjectQuery({
    variables: { id: id ?? '' },
    skip: !id,
  });
  const [deleteProject, { loading: deleting }] = useDeleteProjectMutation({
    update(cache, { data }) {
      const deletedId = data?.deleteProject?.id;
      if (!deletedId) return;

      cache.modify({
        fields: {
          projects(existingRefs = [], { readField }) {
            return existingRefs.filter(
              (ref: { __ref: string }) => readField('id', ref) !== deletedId
            );
          },
        },
      });
    },
  });

  const handleDelete = async () => {
    await deleteProject({ variables: { id } });
    router.push('/projects');
  };
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const project = data?.project;

  return (
    <div>
    <div>
      <h1>Project</h1>
      {project ? (
        <div>
          <h2>{project.title}</h2>
          <p>{project.content}</p>
        </div>
      ) : (
        <p>Project not found</p>
      )}
    </div>
      <hr className="my-4 h-px bg-gray-600" />
      <div>
        <div className="block p-4 border rounded hover:bg-gray-600">
          <Link href={`/projects/${id}/edit`}>
              <h3>Edit project</h3>
          </Link>
        </div>
        <button className="block p-4 border rounded hover:bg-gray-600 cursor-pointer" 
                onClick={handleDelete}
                disabled={deleting}
        >
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default ProjectPage;
