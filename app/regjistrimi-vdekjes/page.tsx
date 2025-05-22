'use client';

import type React from 'react';

import { useState } from 'react';
import { ArrowLeft, FileText, Check, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

export default function RegjistrimiVdekjesPage() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<
    'initial' | 'form' | 'processing' | 'complete'
  >('initial');
  const [noSpouse, setNoSpouse] = useState(false);
  const [processingStep, setProcessingStep] = useState<
    'idle' | 'validating' | 'validated' | 'recording' | 'recorded'
  >('idle');
  const [transactionId, setTransactionId] = useState('');

  // Document upload states
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, string>>({});

  const handleStartRegistration = () => {
    setCurrentStep('form');
  };

  const handleDocumentUpload = (docType: string) => {
    // Simulate file selection
    const fileName = `${docType.split(' ')[0]}_${Math.floor(
      Math.random() * 10000
    )}.pdf`;
    setUploadedDocs((prev) => ({ ...prev, [docType]: fileName }));

    toast({
      title: 'Dokumenti u ngarkua',
      description: `${fileName} u ngarkua me sukses.`,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('processing');
    simulateProcessing();
  };

  const simulateProcessing = () => {
    // Step 1: AI Document Validation
    setProcessingStep('validating');
    setTimeout(() => {
      setProcessingStep('validated');

      // Step 2: Blockchain Recording
      setTimeout(() => {
        setProcessingStep('recording');

        // Complete the process
        setTimeout(() => {
          setProcessingStep('recorded');
          setTransactionId(
            `0x${Array.from({ length: 64 }, () =>
              Math.floor(Math.random() * 16).toString(16)
            ).join('')}`
          );
          setCurrentStep('complete');
        }, 3000);
      }, 1000);
    }, 5000);
  };

  const renderInitialScreen = () => (
    <Card>
      <CardHeader>
        <CardTitle>Regjistrimi i Vdekjes</CardTitle>
        <CardDescription>
          Regjistroni vdekjen e një personi në mënyrë të sigurt dhe të shpejtë,
          duke përdorur teknologjinë blockchain për të siguruar integritetin e
          të dhënave.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-blue-800 mb-3">
            Rreth shërbimit të regjistrimit të vdekjes online
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Shërbimi i regjistrimit të vdekjes online ju lejon të regjistroni
            vdekjen e një personi pa pasur nevojë të paraqiteni fizikisht në
            zyrat e gjendjes civile. Procesi është i sigurt, i shpejtë dhe i
            lehtë për t'u përdorur.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-start">
              <div className="bg-blue-100 p-1 rounded-full mr-2 flex-shrink-0">
                <Check className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">
                Regjistrim i sigurt me teknologji blockchain
              </span>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 p-1 rounded-full mr-2 flex-shrink-0">
                <Check className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">
                Validim i dokumenteve me inteligjencë artificiale
              </span>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 p-1 rounded-full mr-2 flex-shrink-0">
                <Check className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">
                Përditësim automatik i regjistrave të pensioneve
              </span>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 p-1 rounded-full mr-2 flex-shrink-0">
                <Check className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">
                Konfirmim i menjëhershëm i regjistrimit
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Për të filluar procesin e regjistrimit, ju duhet të keni gati
            dokumentet e nevojshme dhe të dhënat personale të personit të vdekur
            dhe informuesit.
          </p>
          <Button
            className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto"
            onClick={handleStartRegistration}
          >
            Fillo Regjistrimin
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">
              Dokumentet e nevojshme
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start">
                <div className="bg-gray-200 p-1 rounded-full mr-2 flex-shrink-0">
                  <FileText className="h-3 w-3 text-gray-600" />
                </div>
                <span>
                  Dëshmia nga institucioni shëndetësor mbi vdekjen e personit
                </span>
              </li>
              <li className="flex items-start">
                <div className="bg-gray-200 p-1 rounded-full mr-2 flex-shrink-0">
                  <FileText className="h-3 w-3 text-gray-600" />
                </div>
                <span>
                  Letërnjoftimi apo pasaporta e personit të vdekur (kopje)
                </span>
              </li>
              <li className="flex items-start">
                <div className="bg-gray-200 p-1 rounded-full mr-2 flex-shrink-0">
                  <FileText className="h-3 w-3 text-gray-600" />
                </div>
                <span>
                  Ekstrakti i lindjes ose i kurorëzimit të qytetarit të vdekur
                </span>
              </li>
              <li className="flex items-start">
                <div className="bg-gray-200 p-1 rounded-full mr-2 flex-shrink-0">
                  <FileText className="h-3 w-3 text-gray-600" />
                </div>
                <span>Letërnjoftimin e informuesit</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">
              Procesi i regjistrimit
            </h3>
            <ol className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start">
                <div className="bg-gray-200 text-gray-600 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">
                  1
                </div>
                <span>Plotësoni formularin me të dhënat e kërkuara</span>
              </li>
              <li className="flex items-start">
                <div className="bg-gray-200 text-gray-600 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">
                  2
                </div>
                <span>Ngarkoni dokumentet e nevojshme</span>
              </li>
              <li className="flex items-start">
                <div className="bg-gray-200 text-gray-600 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">
                  3
                </div>
                <span>
                  Sistemi verifikon dokumentet me inteligjencë artificiale
                </span>
              </li>
              <li className="flex items-start">
                <div className="bg-gray-200 text-gray-600 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">
                  4
                </div>
                <span>
                  Të dhënat regjistrohen në blockchain për siguri maksimale
                </span>
              </li>
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8">
        {/* Informer Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informuesi (Informant)</CardTitle>
            <CardDescription>
              Plotësoni të dhënat e personit që po raporton vdekjen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="informer-personal-number">Numri Personal</Label>
                <Input
                  id="informer-personal-number"
                  placeholder="Numri personal"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="informer-name">Emri</Label>
                <Input id="informer-name" placeholder="Emri" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="informer-surname">Mbiemri</Label>
                <Input id="informer-surname" placeholder="Mbiemri" required />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Deceased Person Information */}
        <Card>
          <CardHeader>
            <CardTitle>
              Të Dhënat e Personit të Vdekur (Deceased Person's Data)
            </CardTitle>
            <CardDescription>
              Plotësoni të dhënat e personit të vdekur
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="deceased-personal-number">Numri Personal</Label>
                <Input
                  id="deceased-personal-number"
                  placeholder="Numri personal"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deceased-name">Emri</Label>
                <Input id="deceased-name" placeholder="Emri" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deceased-surname">Mbiemri</Label>
                <Input id="deceased-surname" placeholder="Mbiemri" required />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Spouse Information */}
        <Card>
          <CardHeader>
            <CardTitle>
              Bashkëshorti/ja e Personit të Vdekur (Spouse of the Deceased)
            </CardTitle>
            <CardDescription>
              Plotësoni të dhënat e bashkëshortit/es (nëse ka)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Checkbox
                id="no-spouse"
                checked={noSpouse}
                onCheckedChange={(checked) => setNoSpouse(!!checked)}
              />
              <label
                htmlFor="no-spouse"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Nuk ka bashkëshort/e (No Spouse)
              </label>
            </div>

            {!noSpouse && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="spouse-personal-number">Numri Personal</Label>
                  <Input
                    id="spouse-personal-number"
                    placeholder="Numri personal"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="spouse-name">Emri</Label>
                  <Input id="spouse-name" placeholder="Emri" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="spouse-surname">Mbiemri</Label>
                  <Input id="spouse-surname" placeholder="Mbiemri" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Document Uploads */}
        <Card>
          <CardHeader>
            <CardTitle>
              Ngarko Dokumentet e Nevojshme (Upload Required Documents)
            </CardTitle>
            <CardDescription>
              Shumica e dokumenteve mbushen automatikisht nga sistemi eKosova.
              Ju duhet të ngarkoni vetëm dokumentet që nuk janë në sistem.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Document 1 - With checkmark */}
              <div className="space-y-2">
                <div className="flex items-start">
                  <Label className="flex-1">
                    Dëshmia nga institucioni shëndetësor mbi vdekjen e personit
                    apo Aktvendimi i gjykatës mbi shpalljen e personit për të
                    vdekur (Death Certificate from Health Institution or Court
                    Decision on Declaration of Death)
                  </Label>
                  <div className="bg-green-100 p-1 rounded-full ml-2 flex-shrink-0">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-1 rounded-full mr-2">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-700">
                      Dokumenti u ngarkua nga burimet e gjendjes se vdekjes
                    </span>
                  </div>
                </div>
              </div>

              {/* Document 2 - Auto-filled */}
              <div className="space-y-2">
                <Label>
                  Letërnjoftimi apo pasaporta e personit të vdekur (kopje) (ID
                  Card or Passport of the Deceased - Copy)
                </Label>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-1 rounded-full mr-2">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-700">
                      Dokumenti u gjet automatikisht në sistemin eKosova
                    </span>
                  </div>
                </div>
              </div>

              {/* Document 3 - Auto-filled */}
              <div className="space-y-2">
                <Label>
                  Ekstrakti i lindjes ose i kurorëzimit të qytetarit të vdekur
                  (Birth or Marriage Certificate of the Deceased)
                </Label>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-1 rounded-full mr-2">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-700">
                      Dokumenti u gjet automatikisht në sistemin eKosova
                    </span>
                  </div>
                </div>
              </div>

              {/* Document 4 - Only if spouse exists - Auto-filled */}
              {!noSpouse && (
                <div className="space-y-2">
                  <Label>
                    Ekstrakti i lindjes së bashkëshortes të qytetarit të vdekur
                    (Birth Certificate of the Spouse of the Deceased)
                  </Label>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-1 rounded-full mr-2">
                        <Check className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="text-sm text-gray-700">
                        Dokumenti u gjet automatikisht në sistemin eKosova
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Document 5 - Auto-filled */}
              <div className="space-y-2">
                <Label>
                  Ekstrakti i lindjes për informuesin (Birth Certificate of the
                  Informant)
                </Label>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-1 rounded-full mr-2">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-700">
                      Dokumenti u gjet automatikisht në sistemin eKosova
                    </span>
                  </div>
                </div>
              </div>

              {/* Document 6 - Auto-filled */}
              <div className="space-y-2">
                <Label>
                  Letërnjoftimin e informuesit (ID Card of the Informant)
                </Label>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-1 rounded-full mr-2">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-700">
                      Dokumenti u gjet automatikisht në sistemin eKosova
                    </span>
                  </div>
                </div>
              </div>

              {/* Document 7 - Auto-filled */}
              <div className="space-y-2">
                <Label>
                  Dëshmia nga institucionet fetare (opsionale) (Certificate from
                  Religious Institutions - Optional)
                </Label>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-1 rounded-full mr-2">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-700">
                      Dokumenti u gjet automatikisht në sistemin eKosova
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment - Online */}
              <div className="space-y-2 mt-8">
                <Label>Pagesa e taksës 1 euro (1 Euro Tax Payment)</Label>
                <div className="p-4 border border-gray-200 rounded-md">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-yellow-100 p-1 rounded-full mr-2 flex-shrink-0">
                        <svg
                          className="h-4 w-4 text-yellow-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-700">
                          Pagesa Online
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          Pagesa e taksës prej 1 euro mund të kryhet online me
                          kartë bankare ose përmes e-banking.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button
                        type="button"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Paguaj me Kartë Bankare
                      </Button>
                      <Button type="button" variant="outline">
                        Paguaj përmes e-Banking
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep('initial')}
            >
              Kthehu
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Dërgo Aplikimin
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );

  const renderProcessingScreen = () => (
    <Card>
      <CardHeader>
        <CardTitle>Përpunimi i Regjistrimit të Vdekjes</CardTitle>
        <CardDescription>Sistemi po përpunon aplikimin tuaj</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Step 1: AI Document Validation */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    processingStep === 'validating'
                      ? 'bg-blue-100 text-blue-600'
                      : processingStep === 'validated' ||
                        processingStep === 'recording' ||
                        processingStep === 'recorded'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {processingStep === 'validating' ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : processingStep === 'validated' ||
                    processingStep === 'recording' ||
                    processingStep === 'recorded' ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    '1'
                  )}
                </div>
                <h3 className="font-medium">
                  AI Document Validation & Data Extraction
                </h3>
              </div>
              {processingStep === 'validated' ||
              processingStep === 'recording' ||
              processingStep === 'recorded' ? (
                <span className="text-green-600 text-sm font-medium">
                  Completed
                </span>
              ) : processingStep === 'validating' ? (
                <span className="text-blue-600 text-sm font-medium">
                  In Progress
                </span>
              ) : (
                <span className="text-gray-400 text-sm">Pending</span>
              )}
            </div>
            <div className="ml-11">
              {processingStep === 'validating' && (
                <div className="flex items-center text-sm text-gray-600">
                  <Loader2 className="h-4 w-4 mr-2 animate-spin text-blue-600" />
                  AI validating documents and extracting information...
                </div>
              )}
              {(processingStep === 'validated' ||
                processingStep === 'recording' ||
                processingStep === 'recorded') && (
                <div className="flex items-center text-sm text-green-600">
                  <Check className="h-4 w-4 mr-2" />
                  AI Validation: Successful ✅
                </div>
              )}
            </div>
          </div>

          {/* Step 2: Blockchain Recording */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    processingStep === 'recording'
                      ? 'bg-blue-100 text-blue-600'
                      : processingStep === 'recorded'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {processingStep === 'recording' ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : processingStep === 'recorded' ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    '2'
                  )}
                </div>
                <h3 className="font-medium">Recording on Blockchain</h3>
              </div>
              {processingStep === 'recorded' ? (
                <span className="text-green-600 text-sm font-medium">
                  Completed
                </span>
              ) : processingStep === 'recording' ? (
                <span className="text-blue-600 text-sm font-medium">
                  In Progress
                </span>
              ) : (
                <span className="text-gray-400 text-sm">Pending</span>
              )}
            </div>
            <div className="ml-11">
              {processingStep === 'recording' && (
                <div className="flex items-center text-sm text-gray-600">
                  <Loader2 className="h-4 w-4 mr-2 animate-spin text-blue-600" />
                  Recording Death Registration on Blockchain...
                </div>
              )}
              {processingStep === 'recorded' && (
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center text-sm text-green-600">
                    <Check className="h-4 w-4 mr-2" />
                    Blockchain Record Created ✅
                  </div>
                  <div className="text-xs text-gray-500 font-mono">
                    Transaction ID: {transactionId}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderCompletionScreen = () => (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <CardTitle>Regjistrimi i Vdekjes u Krye me Sukses!</CardTitle>
        <CardDescription>
          Të dhënat janë regjistruar me sukses dhe janë ruajtur në mënyrë të
          sigurt në blockchain.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <Alert className="bg-green-50 border-green-200">
            <Check className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">
              Regjistrimi u krye me sukses
            </AlertTitle>
            <AlertDescription className="text-green-700">
              Regjistrimi i vdekjes u dorëzua me sukses! Të dhënat janë ruajtur
              në mënyrë të sigurt në blockchain.
            </AlertDescription>
          </Alert>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">
              Detajet e Transaksionit
            </h3>
            <div className="space-y-2">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Transaction ID:</span>
                <span className="text-xs font-mono text-gray-700 break-all">
                  {transactionId}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">
                  Data e regjistrimit:
                </span>
                <span className="text-sm text-gray-700">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Statusi:</span>
                <span className="text-sm text-green-600 font-medium">
                  Konfirmuar
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" onClick={() => window.print()}>
              Shtyp Konfirmimin
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setCurrentStep('initial')}
            >
              Kthehu në Faqen Kryesore
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Link
          href="/"
          className="flex items-center text-blue-600 hover:underline"
        >
          <ArrowLeft className="mr-2" size={16} />
          Kthehu në faqen kryesore
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-medium text-gray-800 mb-2">
          Regjistrimi i Vdekjes
        </h1>
        <p className="text-gray-600">
          Regjistroni vdekjen e një personi në mënyrë të sigurt dhe të shpejtë,
          duke përdorur teknologjinë blockchain për të siguruar integritetin e
          të dhënave.
        </p>
      </div>

      {currentStep === 'initial' && renderInitialScreen()}
      {currentStep === 'form' && renderRegistrationForm()}
      {currentStep === 'processing' && renderProcessingScreen()}
      {currentStep === 'complete' && renderCompletionScreen()}
    </div>
  );
}
