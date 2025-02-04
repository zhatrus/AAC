import Link from "next/link"
import { UsersIcon, FolderIcon, ShieldIcon, SettingsIcon, ShieldCheckIcon, UserIcon } from "lucide-react"

export default function Sidebar() {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        <Link
          href="/employees"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <UsersIcon className="inline-block mr-2 h-5 w-5" />
          Персонал
        </Link>
        <Link
          href="/projects"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <FolderIcon className="inline-block mr-2 h-5 w-5" />
          Проекти
        </Link>
        <Link
          href="/access"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <ShieldIcon className="inline-block mr-2 h-5 w-5" />
          Доступи
        </Link>
        <Link
          href="/access-requests"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <ShieldCheckIcon className="inline-block mr-2 h-5 w-5" />
          Запити на доступ
        </Link>
        <Link
          href="/access-requests/my-requests"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <UserIcon className="inline-block mr-2 h-5 w-5" />
          Мої запити на доступ
        </Link>
        <Link
          href="/settings"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <SettingsIcon className="inline-block mr-2 h-5 w-5" />
          Налаштування
        </Link>
      </nav>
    </div>
  )
}

