// src/app/skills/page.js
async function getSkills() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills`, { cache: 'no-store' });
  return res.ok ? res.json() : [];
}

export default async function SkillsPage() {
  const skills = await getSkills();

  // Group skills by category automatically
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-bold tracking-tight">Tech Arsenal</h1>
      
      <div className="grid gap-8">
        {Object.entries(groupedSkills).map(([category, items]) => (
          <div key={category} className="space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-2">{category}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {items.map((skill) => (
                <div key={skill._id} className="bg-white border p-4 rounded-lg shadow-sm flex items-center gap-3">
                  {skill.icon && <img src={skill.icon} alt={skill.name} className="w-6 h-6 object-contain" />}
                  <span className="font-medium">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        {skills.length === 0 && <p className="text-gray-500">No skills added yet.</p>}
      </div>
    </div>
  );
}