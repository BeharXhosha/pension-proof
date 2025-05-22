'use client';

import { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Camera,
  Check,
  AlertTriangle,
  Loader2,
  RefreshCw,
} from 'lucide-react';
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function VerifikimiPage() {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const [personalId, setPersonalId] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<
    'idle' | 'processing' | 'success' | 'failed'
  >('idle');
  const [verificationMessage, setVerificationMessage] = useState('');
  const [scanProgress, setScanProgress] = useState(0);
  const [scanPhase, setScanPhase] = useState(0);
  const [scanMessage, setScanMessage] = useState('');
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [faceMeshData, setFaceMeshData] = useState<any>(null);
  const [wsConnected, setWsConnected] = useState(false);

  // Initialize WebSocket connection
  useEffect(() => {
    wsRef.current = new WebSocket('ws://localhost:8000/ws/face-mesh');

    wsRef.current.onopen = () => {
      console.log('WebSocket connected');
      setWsConnected(true);
    };

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received:', data);
      setFaceMeshData(data);
    };

    wsRef.current.onerror = (err) => {
      console.error('WebSocket error:', err);
    };

    wsRef.current.onclose = () => {
      console.log('WebSocket closed');
      setWsConnected(false);
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  // Send frames via WebSocket
  useEffect(() => {
    const interval = setInterval(() => {
      if (wsRef.current?.readyState === WebSocket.OPEN && videoRef.current) {
        const canvas = document.createElement('canvas');
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const base64 = canvas.toDataURL('image/jpeg');
        wsRef.current.send(base64);
      }
    }, 200); // send every 200ms

    return () => clearInterval(interval);
  }, []);

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
      setWsConnected(false);
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  const switchCamera = () => {
    stopCamera();
    setFacingMode(facingMode === 'user' ? 'environment' : 'user');
  };

  const connectWebSocket = () => {
    setTimeout(() => {
      setWsConnected(true);
      startFaceMeshProcessing();
      toast({
        title: 'Lidhja u krijua',
        description:
          'Lidhja me shërbimin e analizës së fytyrës u krijua me sukses.',
      });
    }, 1000);
  };

  const startFaceMeshProcessing = () => {
    if (!cameraActive || !canvasRef.current || !videoRef.current) return;
    const processFrame = () => {
      if (!cameraActive || !canvasRef.current || !videoRef.current) return;
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      if (!context) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      animationFrameRef.current = requestAnimationFrame(processFrame);
    };
    animationFrameRef.current = requestAnimationFrame(processFrame);
  };

  const processVerification = () => {
    if (!cameraActive) {
      toast({
        title: 'Gabim',
        description:
          'Ju lutemi aktivizoni kamerën para se të filloni verifikimin.',
        variant: 'destructive',
      });
      return;
    }

    setIsVerifying(true);
    setVerificationStatus('processing');
    setScanProgress(0);
    setScanPhase(1);
    setScanMessage('Duke inicializuar skanimin 3D...');
  };

  const renderFaceMesh = () => {
    if (!canvasRef.current || !faceMeshData || !faceMeshData.detected) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    if (videoRef.current) {
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    }

    const { landmarks, mesh_triangles } = faceMeshData;
    context.strokeStyle = 'rgba(0, 255, 0, 0.5)';
    context.lineWidth = 1;

    for (const triangle of mesh_triangles) {
      const [a, b, c] = triangle;
      if (landmarks[a] && landmarks[b] && landmarks[c]) {
        context.beginPath();
        context.moveTo(landmarks[a].x, landmarks[a].y);
        context.lineTo(landmarks[b].x, landmarks[b].y);
        context.lineTo(landmarks[c].x, landmarks[c].y);
        context.closePath();
        context.stroke();
      }
    }

    context.fillStyle = 'rgba(0, 255, 255, 0.7)';
    for (const landmark of landmarks) {
      context.beginPath();
      context.arc(landmark.x, landmark.y, 1, 0, Math.PI * 2);
      context.fill();
    }
  };

  // Simulate scan progress
  useEffect(() => {
    if (!isVerifying) return;

    const scanInterval = setInterval(() => {
      setScanProgress((prev) => {
        const newProgress = prev + 2;

        if (newProgress === 20) {
          setScanPhase(2);
          setScanMessage('Duke identifikuar pikat kyçe të fytyrës...');
        } else if (newProgress === 40) {
          setScanPhase(3);
          setScanMessage('Duke analizuar strukturën 3D...');
        } else if (newProgress === 60) {
          setScanPhase(4);
          setScanMessage('Duke verifikuar gjallërinë...');
        } else if (newProgress === 80) {
          setScanPhase(5);
          setScanMessage('Duke krahasuar me të dhënat e ruajtura...');
        } else if (newProgress >= 100) {
          clearInterval(scanInterval);
          setTimeout(() => {
            setVerificationStatus('success');
            setVerificationMessage(
              'Verifikimi u krye me sukses! Pensioni juaj është konfirmuar për 6 muajt e ardhshëm.'
            );
            toast({
              title: 'Verifikim i suksesshëm',
              description: 'Identiteti juaj u verifikua me sukses.',
            });
            setIsVerifying(false);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(scanInterval);
  }, [isVerifying, toast]);

  // Render face mesh on canvas
  useEffect(() => {
    if (faceMeshData && faceMeshData.detected) {
      renderFaceMesh();
    }
  }, [faceMeshData]);

  // Cleanup camera & animation frame on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Start camera logic
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        connectWebSocket();
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      toast({
        title: 'Gabim',
        description: 'Nuk mund të aktivizohej kamera.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Back Link */}
      <div className="flex items-center mb-6">
        <Link
          href="/pensionet"
          className="flex items-center text-blue-600 hover:underline"
        >
          <ArrowLeft className="mr-2" size={16} />
          Kthehu te pensionet
        </Link>
      </div>

      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-gray-800 mb-2">
          Verifikimi 3D me kamerë
        </h1>
        <p className="text-gray-600">
          Përdorni kamerën për të verifikuar identitetin tuaj me teknologji 3D
          dhe për të konfirmuar që jeni gjallë.
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="flex flex-row gap-8">
        {/* Left Side: Camera Feed Card */}
        <div className="w-full md:w-5/12">
          <Card>
            <CardHeader>
              <CardTitle>Verifikimi i Pensionit</CardTitle>
              <CardDescription>
                Ju lutemi përdorni kamerën për verifikim.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                style={{ position: 'relative', width: '100%', maxWidth: 400 }}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  style={{ width: '100%', borderRadius: 8, minHeight: '100%' }}
                />
                <canvas
                  ref={canvasRef}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                  }}
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {!cameraActive && (
                  <Button onClick={startCamera}>
                    <Camera className="mr-2 h-4 w-4" /> Start Kamera
                  </Button>
                )}

                {cameraActive && (
                  <>
                    <Button onClick={stopCamera} variant="destructive">
                      <AlertTriangle className="mr-2 h-4 w-4" /> Ndalo Kamera
                    </Button>
                    <Button onClick={switchCamera}>
                      <RefreshCw className="mr-2 h-4 w-4" /> Ndrysho Kamera
                    </Button>
                    <Button
                      onClick={processVerification}
                      disabled={isVerifying}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isVerifying ? (
                        <>
                          <Loader2 className="animate-spin mr-2 h-4 w-4" /> Duke
                          verifikuar...
                        </>
                      ) : (
                        <>
                          <Check className="mr-2 h-4 w-4" /> Fillo Verifikimin
                        </>
                      )}
                    </Button>
                  </>
                )}
              </div>

              {verificationStatus === 'success' && (
                <Alert className="mt-4 bg-green-50 border-green-200">
                  <Check className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">Sukses</AlertTitle>
                  <AlertDescription className="text-green-700">
                    {verificationMessage}
                  </AlertDescription>
                </Alert>
              )}

              {verificationStatus === 'failed' && (
                <Alert variant="destructive" className="mt-4">
                  <AlertTitle>Gabim</AlertTitle>
                  <AlertDescription>{verificationMessage}</AlertDescription>
                </Alert>
              )}

              {isVerifying && (
                <div className="mt-4 space-y-2">
                  <Label>Progresi i skanimit: {scanProgress}%</Label>
                  <progress value={scanProgress} max={100} className="w-full" />
                  <p className="text-sm text-gray-600">{scanMessage}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Steps Description */}
        <div className="w-full md:w-7/12">
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Procesi i skanimit 3D</CardTitle>
              <CardDescription>
                Teknologjia jonë e avancuar përdor inteligjencën artificiale për
                të analizuar strukturën 3D të fytyrës suaj.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((step) => {
                  const titles = [
                    'Inicializimi i skanimit',
                    'Identifikimi i pikave kyçe',
                    'Krijimi i modelit 3D',
                    'Verifikimi i gjallërisë',
                    'Krahasimi dhe konfirmimi',
                  ];
                  const descriptions = [
                    'Sistemi aktivizon kamerën dhe përgatit algoritmet e analizës 3D për të filluar procesin e skanimit.',
                    'Algoritmi identifikon 468 pika kyçe në fytyrën tuaj, duke përfshirë sytë, hundën, gojën dhe konturet e fytyrës.',
                    'Bazuar në pikat kyçe, sistemi krijon një model tredimensional të fytyrës suaj, duke kapur detaje unike të strukturës.',
                    'Sistemi verifikon që jeni një person i gjallë duke analizuar mikroshprehjet, reflektimin e dritës dhe strukturën 3D.',
                    'Modeli 3D krahasohet me të dhënat e ruajtura dhe, pas verifikimit të suksesshëm, pensioni konfirmohet për t’u përdorur.',
                  ];
                  return (
                    <div key={step} className="flex items-start">
                      <div
                        className={`${
                          scanPhase >= step
                            ? 'bg-blue-500 text-white'
                            : 'bg-blue-100 text-blue-600'
                        } rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0`}
                      >
                        {step}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {titles[step - 1]}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {descriptions[step - 1]}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
