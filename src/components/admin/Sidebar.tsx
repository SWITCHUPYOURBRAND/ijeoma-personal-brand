import Link from "next/link";

export default function Sidebar() {
  return (
    <aside
      className="
        w-full
        md:w-72
        bg-black
        border-b
        md:border-b-0
        md:border-r
        border-white/10
        p-6
      "
    >
      <h2 className="text-white text-2xl font-bold mb-8">
        Ijeoma Admin
      </h2>

      <nav className="flex md:block gap-6 md:space-y-3 overflow-x-auto">

        <Link
          href="/admin/dashboard"
          className="whitespace-nowrap text-gray-300 hover:text-white"
        >
          Dashboard
        </Link>

        <Link
          href="/admin/articles"
          className="whitespace-nowrap text-gray-300 hover:text-white"
        >
          Articles
        </Link>

        <Link
          href="/admin/gallery"
          className="whitespace-nowrap text-gray-300 hover:text-white"
        >
          Gallery
        </Link>

        <Link
          href="/admin/messages"
          className="whitespace-nowrap text-gray-300 hover:text-white"
        >
          Messages
        </Link>

        <Link
          href="/admin/profile"
          className="whitespace-nowrap text-gray-300 hover:text-white"
        >
          Profile
        </Link>

      </nav>
    </aside>
  );
}