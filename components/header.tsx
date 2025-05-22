import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"

export default function Header() {
  return (
    <header>
      <div className="bg-yellow-400 py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-4">
            <Link href="#" className="text-sm text-gray-800 hover:underline">
              Qëllimi
            </Link>
            <Link href="#" className="text-sm text-gray-800 hover:underline">
              FAQ
            </Link>
            <Link href="#" className="text-sm text-gray-800 hover:underline">
              Vegëza
            </Link>
            <Link href="#" className="text-sm text-gray-800 hover:underline">
              Versionet
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link href="#" className="text-sm text-gray-800 hover:underline">
              Gjuha
            </Link>
            <Link href="#" className="text-sm text-gray-800 hover:underline">
              Shq
            </Link>
            <Link href="#" className="text-sm text-gray-800 hover:underline">
              Eng
            </Link>
            <Link href="#" className="text-sm text-gray-800 hover:underline">
              Srp
            </Link>
          </div>
        </div>
      </div>
      <div className="border-b">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/placeholder.svg?height=50&width=120"
              alt="eKosova Logo"
              width={120}
              height={50}
              className="h-10 w-auto"
            />
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/krysore" className="text-blue-600 hover:text-blue-800">
              Krysore
            </Link>
            <Link href="/sherbimet" className="text-blue-600 hover:text-blue-800">
              Shërbimet
            </Link>
            <Link href="/informatat" className="text-blue-600 hover:text-blue-800">
              Informatat
            </Link>
          </nav>
          <button className="md:hidden">
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  )
}
