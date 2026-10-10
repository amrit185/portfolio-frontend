
async function getBlogs() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, { 
      cache: 'no-store' 
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
        <p className="text-xl text-gray-600">My thoughts on tech, development, and life.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <article 
            key={blog._id} 
            className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
          >
            {blog.coverImage && (
              <img 
                src={blog.coverImage} 
                alt={blog.title} 
                className="w-full h-48 object-cover border-b" 
              />
            )}
            <div className="p-6 flex flex-col flex-1">
              <p className="text-sm text-gray-400 mb-2">
                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
              <h2 className="text-2xl font-bold mb-3 line-clamp-2">{blog.title}</h2>
              <p className="text-gray-600 line-clamp-3 mb-4 flex-1">
                {blog.content}
              </p>
              <button className="text-blue-600 font-medium hover:text-blue-800 text-left mt-auto inline-flex items-center gap-1">
                Read More →
              </button>
            </div>
          </article>
        ))}
        
        {blogs.length === 0 && (
          <p className="text-gray-500 col-span-full py-10">No blog posts published yet.</p>
        )}
      </div>
    </div>
  );
}
