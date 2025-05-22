import { Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import ServiceCard from "@/components/service-card"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-4">
        <Link href="/krysore" className="text-blue-600 hover:underline mr-2">
          Krysore
        </Link>
        <span className="mx-2">›</span>
        <Link href="/sherbimet" className="text-blue-600 hover:underline mr-2">
          Shërbimet
        </Link>
        <span className="mx-2">›</span>
        <span className="text-gray-600">Informatat</span>
      </div>

      <h1 className="text-2xl font-normal text-gray-700 mb-6">Sporteli virtual</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <button className="flex items-center text-sm text-gray-600 border border-gray-300 rounded-full px-3 py-1">
          <span className="w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
          Për qytetarë
        </button>
        <button className="flex items-center text-sm text-gray-600 border border-gray-300 rounded-full px-3 py-1">
          <span className="w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
          Për biznese
        </button>
        <button className="flex items-center text-sm text-gray-600 border border-gray-300 rounded-full px-3 py-1">
          <span className="w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
          Shërbimet me pagesë
        </button>
        <button className="flex items-center text-sm text-gray-600 border border-gray-300 rounded-full px-3 py-1">
          <span className="w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
          Të gjitha shërbimet
        </button>
      </div>

      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Kërko shërbimin"
          className="w-full border border-gray-300 rounded-md py-2 px-4 pr-10"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>

      <div className="mb-8">
        <h2 className="text-lg text-blue-600 mb-2 pb-2 border-b border-yellow-400">Ndarje jetësore</h2>
        <div className="flex items-start gap-4 bg-gray-50 p-4 rounded-md">
          <div className="bg-blue-400 p-4 rounded-md">
            <Image src="/placeholder.svg?height=60&width=60" alt="Familja" width={60} height={60} />
          </div>
          <div className="flex-1">
            <h3 className="text-blue-600 mb-2">Lindja e fëmijës</h3>
            <p className="text-sm text-gray-600">
              Shërbimet publike që lidhen me ngjarjet jetësore të lindjes së fëmijës ofrohen si shërbime proaktive dhe
              do të nisin me rastin e lindjes në maternitetet publike dhe private të Kosovës.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-lg text-blue-600 mb-4 pb-2 border-b border-yellow-400">Shërbimet</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <ServiceCard icon="/placeholder.svg?height=40&width=40" title="Gjendja civile" href="/gjendja-civile" />
        <ServiceCard icon="/placeholder.svg?height=40&width=40" title="Familja" href="/familja" />
        <ServiceCard icon="/placeholder.svg?height=40&width=40" title="Tatimet" href="/tatimet" />
        <ServiceCard icon="/placeholder.svg?height=40&width=40" title="Arsimi" href="/arsimi" />
        <ServiceCard icon="/placeholder.svg?height=40&width=40" title="Shëndetësia" href="/shendetesia" />
        <ServiceCard icon="/placeholder.svg?height=40&width=40" title="Automjetet" href="/automjetet" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <ServiceCard icon="/placeholder.svg?height=40&width=40" title="Policia" href="/policia" />
        <ServiceCard icon="/placeholder.svg?height=40&width=40" title="Prona" href="/prona" />
        <ServiceCard icon="/placeholder.svg?height=40&width=40" title="Gjyqësori" href="/gjyqesori" />
        <ServiceCard icon="/placeholder.svg?height=40&width=40" title="Komunalitë" href="/komunalite" />
        <ServiceCard icon="/placeholder.svg?height=40&width=40" title="Adresa" href="/adresa" />
        <ServiceCard icon="/placeholder.svg?height=40&width=40" title="e-Komuna" href="/e-komuna" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <ServiceCard
          icon="/placeholder.svg?height=40&width=40"
          title="Grantet dhe Kontributet"
          href="/grantet-kontributet"
        />
        <ServiceCard icon="/placeholder.svg?height=40&width=40" title="Pensionet" href="/pensionet" highlight={true} />
        <ServiceCard
          icon="/placeholder.svg?height=40&width=40"
          title="Regjistrimi i vdekjes"
          href="/regjistrimi-vdekjes"
          highlight={true}
        />
      </div>
    </div>
  )
}
