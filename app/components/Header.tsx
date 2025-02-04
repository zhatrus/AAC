import { UserCircleIcon } from "lucide-react"
import { Notifications } from "./Notifications"

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-800">Система управління персоналом</h1>
            </div>
          </div>
          <div className="flex items-center">
            <Notifications />
            <div className="ml-3 relative">
              <div>
                <button
                  className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  id="user-menu"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Відкрити меню користувача</span>
                  <UserCircleIcon className="h-8 w-8 rounded-full" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

