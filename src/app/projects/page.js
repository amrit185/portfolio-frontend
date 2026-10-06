// src/app/projects/page.js
async function getProjects() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, { cache: 'no-store' });
  return res.ok ? res.json() : [];
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {project.image && (
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover border-b" />
            )}
            <div className="p-6 space-y-4">
              <h2 className="text-2xl font-bold">{project.title}</h2>
              <p className="text-gray-600 line-clamp-3">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        {projects.length === 0 && <p className="text-gray-500">No projects added yet.</p>}
      </div>
    </div>
  );
}