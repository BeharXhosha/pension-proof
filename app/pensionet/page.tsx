import { ArrowLeft, Camera, Check, Upload, Info } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function PensionetPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Link href="/" className="flex items-center text-blue-600 hover:underline">
          <ArrowLeft className="mr-2" size={16} />
          Kthehu në faqen kryesore
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-medium text-gray-800 mb-2">Verifikimi i Pensionit</h1>
        <p className="text-gray-600">
          Verifikoni pensionin tuaj në mënyrë të sigurt dhe të shpejtë, pa pasur nevojë të paraqiteni fizikisht.
        </p>
      </div>

      <Tabs defaultValue="remote" className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="remote">Verifikim në distancë</TabsTrigger>
          <TabsTrigger value="info">Informacione</TabsTrigger>
        </TabsList>
        <TabsContent value="remote">
          <Card>
            <CardHeader>
              <CardTitle>Verifikimi i pensionit me njohje të fytyrës</CardTitle>
              <CardDescription>
                Përdorni kamerën për të verifikuar identitetin tuaj dhe për të konfirmuar që jeni gjallë, pa pasur
                nevojë të paraqiteni fizikisht.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-4">
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                    <div className="mb-4 bg-blue-100 p-4 rounded-full">
                      <Camera className="h-10 w-10 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Verifikimi 3D me kamerë</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Klikoni butonin më poshtë për të filluar procesin e verifikimit 3D me kamerë
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 items-center">
                      <Link href="/pensionet/verifikimi">
                        <Button className="bg-blue-600 hover:bg-blue-700">Fillo verifikimin 3D</Button>
                      </Link>
                      <Badge className="bg-green-500 hover:bg-green-600">E RE</Badge>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Teknologjia jonë e re përdor inteligjencën artificiale për të analizuar strukturën 3D të fytyrës
                      suaj
                    </p>
                  </div>

                  {/* <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                    <div className="mb-4 bg-blue-100 p-4 rounded-full">
                      <Upload className="h-10 w-10 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Ngarko dokument identifikimi</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Nëse nuk mund të përdorni kamerën, ngarkoni një fotografi të dokumentit tuaj të identifikimit
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700">Ngarko dokumentin</Button>
                  </div> */}
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Info className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        Të dhënat tuaja janë të sigurta dhe të mbrojtura. Procesi i verifikimit përdor teknologji të
                        avancuar të inteligjencës artificiale për të verifikuar identitetin tuaj.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Informacione për verifikimin e pensionit</CardTitle>
              <CardDescription>
                Mësoni më shumë për procesin e ri të verifikimit të pensionit dhe përfitimet e tij.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">Çfarë është verifikimi i pensionit me AI 3D?</h3>
                  <p className="text-sm text-gray-600">
                    Verifikimi i pensionit me inteligjencë artificiale 3D është një proces i ri që lejon pensionistët të
                    verifikojnë statusin e tyre pa pasur nevojë të paraqiten fizikisht në zyrat e pensioneve çdo gjashtë
                    muaj. Teknologjia 3D siguron një nivel më të lartë sigurie dhe saktësie.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">Si funksionon?</h3>
                  <p className="text-sm text-gray-600">
                    Sistemi përdor teknologji të avancuar të njohjes së fytyrës 3D për të verifikuar identitetin tuaj
                    dhe për të konfirmuar që jeni gjallë. Kamera analizon strukturën tredimensionale të fytyrës suaj,
                    duke krijuar një model 3D që është unik për ju. Ky model krahasohet me të dhënat në bazën e të
                    dhënave për të konfirmuar identitetin tuaj.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">Përfitimet</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Eliminon nevojën për të udhëtuar në zyrat e pensioneve</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Kursen kohë dhe para për pensionistët</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Procesi është i shpejtë dhe i thjeshtë për t'u përdorur</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Siguron që pensionet shkojnë vetëm te përfituesit e ligjshëm</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Redukton mashtrimet dhe pagesat e paligjshme</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Teknologjia 3D ofron siguri më të lartë se sistemet tradicionale 2D</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
