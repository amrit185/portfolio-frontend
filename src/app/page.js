
import Link from 'next/link';

async function getAboutData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/about`, { cache: 'no-store' });
  return res.ok ? res.json() : null;
}

export default async function Home() {
  const about = await getAboutData();

  if (!about || !about.name) {
    return <div className="text-center py-20">Please add your details in the CMS Admin panel.</div>;
  }

  return (
    <div className="flex flex-col items-center text-center py-20 space-y-8 animate-fade-in">
      {about.avatar && (
        <img src={about.avatar} alt={about.name} className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white" />
      )}
      <div className="space-y-4 max-w-2xl">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">Hi, I'm {about.name}.</h1>
        <h2 className="text-2xl text-blue-600 font-medium">{about.title}</h2>
        <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-wrap">{about.bio}</p>
      </div>
    </div>
  );
}
