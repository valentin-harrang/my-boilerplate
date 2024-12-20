import Link from "next/link"
import { ChevronRight, Home } from 'lucide-react'

export default function Breadcrumb() {
  return (
    <nav className="flex py-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
            <Home className="w-4 h-4 mr-2" />
            Home
          </Link>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRight className="w-6 h-6 text-gray-400" />
            <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Account</span>
          </div>
        </li>
      </ol>
    </nav>
  )
}

