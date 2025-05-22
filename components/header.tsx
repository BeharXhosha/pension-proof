import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"

export default function Header() {
  return (
    <header>
      <div className="bg-yellow-400 py-2 px-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex space-x-4">
            <Link href="#" className="text-sm text-white hover:underline">
              Qëllimi
            </Link>
            <Link href="#" className="text-sm text-white hover:underline">
              FAQ
            </Link>
            <Link href="#" className="text-sm text-white hover:underline">
              Vegëza
            </Link>
            <Link href="#" className="text-sm text-white hover:underline">
              Versionet
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link href="#" className="text-sm text-white hover:underline">
              Gjuha:
            </Link>
            <Link href="#" className="text-sm text-white hover:underline">
              Shq
            </Link>
            <Link href="#" className="text-sm text-white hover:underline">
              Eng
            </Link>
            <Link href="#" className="text-sm text-white hover:underline">
              Srp
            </Link>
          </div>
        </div>
      </div>
      <div className="border-b">
        <div className="max-w-5xl mx-auto px-6 py-6 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/ekosova.svg"
              alt="eKosova Logo"
              width={160}
              height={70}
              className="h-16 w-auto"
            />
          </Link>
          <div className="hidden md:flex space-x-3 text-lg">
            <span className="mx-2">›</span>
            <Link href="/kryesore" className="text-blue-600 hover:underline mr-3">
              Kryesore
            </Link>
            <span className="mx-2">›</span>
            <Link href="/sherbimet" className="text-blue-600 hover:underline mr-3">
              Shërbimet
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-600">Informatat</span>
          </div>
          {/* <nav className="hidden md:flex space-x-10 text-lg">
            <Link href="/kryesore" className="text-blue-600 hover:text-blue-800">
              Kryesore
            </Link>
            <Link href="/sherbimet" className="text-blue-600 hover:text-blue-800">
              Shërbimet
            </Link>
            <Link href="/informatat" className="text-blue-600 hover:text-blue-800">
              Informatat
            </Link>
          </nav> */}
          <button className="md:hidden">
            <Menu className="h-8 w-8 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  )
}
