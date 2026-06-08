import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-72 bg-black border-r border-white/10 p-6">

      <h2 className="text-white text-2xl font-bold mb-10">
        Ijeoma Admin
      </h2>

      <nav className="space-y-3">

        <Link
          href="/admin/dashboard"
          className="block text-gray-300 hover:text-white"
        >
          Dashboard
        </Link>

        <Link
          href="/admin/articles"
          className="block text-gray-300 hover:text-white"
        >
          Articles
        </Link>

        <Link
          href="/admin/gallery"
          className="block text-gray-300 hover:text-white"
        >
          Gallery
        </Link>

        <Link
          href="/admin/messages"
          className="block text-gray-300 hover:text-white"
        >
          Messages
        </Link>

        <Link
          href="/admin/profile"
          className="block text-gray-300 hover:text-white"
        >
          Profile
        </Link>

      </nav>
    </aside>
  );
}