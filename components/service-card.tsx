import Link from "next/link"

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  href: string
  highlight?: boolean
}

export default function ServiceCard({ icon, title, href, highlight = false }: ServiceCardProps) {
  return (
    <Link href={href}>
      <div
        className={`flex flex-col items-center p-4 border rounded-md hover:shadow-md transition-shadow ${highlight ? "border-yellow-400 bg-yellow-50" : "border-gray-200"}`}
      >
        <div className="mb-3">
          {icon}
        </div>
        <span className="text-sm text-center text-gray-700">{title}</span>
      </div>
    </Link>
  )
}
