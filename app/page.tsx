import { Search, IdCard, User, Book, Heart, Car, Shield, Building2, Gavel, MapPin, Landmark, Gift, Briefcase, FileText } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import ServiceCard from "@/components/service-card"
// import babyphoto from "../public/16447.jpg"

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-6">
      {/* <div className="flex items-center mb-4">
        <Link href="/kryesore" className="text-blue-600 hover:underline mr-2">
          Kryesore
        </Link>
        <span className="mx-2">›</span>
        <Link href="/sherbimet" className="text-blue-600 hover:underline mr-2">
          Shërbimet
        </Link>
        <span className="mx-2">›</span>
        <span className="text-gray-600">Informatat</span>
      </div> */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-normal text-gray-700">Sporteli virtual</h1>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center text-sm text-gray-600  rounded-full px-3 py-1">
            <span className="w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
            Për qytetarë
          </button>
          <button className="flex items-center text-sm text-gray-600  rounded-full px-3 py-1">
            <span className="w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
            Për biznese
          </button>
          <button className="flex items-center text-sm text-gray-600  rounded-full px-3 py-1">
            <span className="w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
            Shërbimet me pagesë
          </button>
          <button className="flex items-center text-sm text-gray-600  rounded-full px-3 py-1">
            <span className="w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
            Të gjitha shërbimet
          </button>
        </div>
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
        <div className="flex items-center mb-2">
          <h2 className="text-lg text-blue-600 mr-4">Ndarje jetësore</h2>
          <div className="flex-1 h-0.5 bg-yellow-400 rounded" />
        </div>
        <div className="flex items-start gap-4 bg-gray-50 p-4 rounded-md">
          <div className="bg-blue-400 p-4 rounded-md">
            <Image src="/16447.jpg" alt="Familja" width={60} height={60} />
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

      <div className="flex items-center mb-2">
        <h2 className="text-lg text-blue-600 mr-4">Shërbimet</h2>
        <div className="flex-1 h-0.5 bg-yellow-400 rounded" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <ServiceCard icon={<IdCard size={60} />} title="Gjendja civile" href="/gjendja-civile" />
        <ServiceCard icon={<User size={60} />} title="Familja" href="/familja" />
        <ServiceCard icon={<Briefcase size={60} />} title="Tatimet" href="/tatimet" />
        <ServiceCard icon={<Book size={60} />} title="Arsimi" href="/arsimi" />
        <ServiceCard icon={<Heart size={60} />} title="Shëndetësia" href="/shendetesia" />
        <ServiceCard icon={<Car size={60} />} title="Automjetet" href="/automjetet" />
        <ServiceCard icon={<Shield size={60} />} title="Policia" href="/policia" />
        <ServiceCard icon={<Building2 size={60} />} title="Prona" href="/prona" />
        <ServiceCard icon={<Gavel size={60} />} title="Gjyqësori" href="/gjyqesori" />
        <ServiceCard icon={<Landmark size={60} />} title="Komunalitë" href="/komunalite" />
        <ServiceCard icon={<MapPin size={60} />} title="Adresa" href="/adresa" />
        <ServiceCard icon={<Landmark size={60} />} title="e-Komuna" href="/e-komuna" />
        <ServiceCard icon={<Gift size={60} />} title="Grantet dhe Kontributet" href="/grantet-kontributet" />
        <ServiceCard icon={<Briefcase size={60} />} title="Pensionet" href="/pensionet" highlight={true} />
        <ServiceCard icon={<FileText size={60} />} title="Regjistrimi i vdekjes" href="/regjistrimi-vdekjes" highlight={true} />
      </div>
    </div>
  )
}
