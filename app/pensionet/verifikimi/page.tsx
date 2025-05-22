"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Camera, Check, AlertTriangle, Loader2, RefreshCw } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function VerifikimiPage() {
  const { toast } = useToast()
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [personalId, setPersonalId] = useState("")
  const [cameraActive, setCameraActive] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "processing" | "success" | "failed">("idle")
  const [verificationMessage, setVerificationMessage] = useState("")
  const [scanProgress, setScanProgress] = useState(0)
  const [scanPhase, setScanPhase] = useState(0)
  const [scanMessage, setScanMessage] = useState("")
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user")
  const [faceMeshData, setFaceMeshData] = useState<any>(null)
  const [wsConnected, setWsConnected] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  // Start camera
  const startCamera = async () => {
    try {
      if (!personalId) {
        toast({
          title: "Gabim",
          description: "Ju lutemi vendosni numrin personal të identifikimit",
          variant: "destructive",
        })
        return
      }

      const constraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)

        // Connect to WebSocket after camera is active
        connectWebSocket()
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      toast({
        title: "Gabim",
        description: "Nuk mund të aksesohet kamera. Ju lutemi kontrolloni lejet e kamerës.",
        variant: "destructive",
      })
    }
  }

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      const tracks = stream.getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setCameraActive(false)
    }

    // Disconnect WebSocket
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
      setWsConnected(false)
    }

    // Cancel animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
  }

  // Switch camera (front/back)
  const switchCamera = () => {
    stopCamera()
    setFacingMode(facingMode === "user" ? "environment" : "user")
  }

  // Connect to WebSocket for face mesh processing
  const connectWebSocket = () => {
    // In a real implementation, this would connect to your deployed Python service
    // For demo purposes, we'll simulate the connection

    // Simulated WebSocket connection
    setTimeout(() => {
      setWsConnected(true)
      startFaceMeshProcessing()
      toast({
        title: "Lidhja u krijua",
        description: "Lidhja me shërbimin e analizës së fytyrës u krijua me sukses.",
      })
    }, 1000)

    // In a real implementation, this would be:
    /*
    const ws = new WebSocket('ws://your-python-service-url/ws/face-mesh')
    
    ws.onopen = () => {
      setWsConnected(true)
      toast({
        title: "Lidhja u krijua",
        description: "Lidhja me shërbimin e analizës së fytyrës u krijua me sukses.",
      })
      startFaceMeshProcessing()
    }
    
    ws.onclose = () => {
      setWsConnected(false)
      toast({
        title: "Lidhja u mbyll",
        description: "Lidhja me shërbimin e analizës së fytyrës u mbyll.",
      })
    }
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
      toast({
        title: "Gabim në lidhje",
        description: "Ndodhi një gabim gjatë lidhjes me shërbimin e analizës së fytyrës.",
        variant: "destructive",
      })
    }
    
    wsRef.current = ws
    */
  }

  // Start face mesh processing
  const startFaceMeshProcessing = () => {
    if (!cameraActive || !canvasRef.current || !videoRef.current) return

    const processFrame = () => {
      if (!cameraActive || !canvasRef.current || !videoRef.current) return

      const canvas = canvasRef.current
      const video = videoRef.current
      const context = canvas.getContext("2d")

      if (!context) return

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Draw video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height)

      // Get image data from canvas
      const imageData = canvas.toDataURL("image/jpeg", 0.8)

      // In a real implementation, send image data to WebSocket
      // wsRef.current?.send(JSON.stringify({ image: imageData }))

      // For demo purposes, we'll simulate face mesh detection
      simulateFaceMeshDetection()

      // Request next animation frame
      animationFrameRef.current = requestAnimationFrame(processFrame)
    }

    // Start processing frames
    animationFrameRef.current = requestAnimationFrame(processFrame)
  }

  // Simulate face mesh detection (in a real implementation, this would come from the Python backend)
  const simulateFaceMeshDetection = () => {
    // Only generate new face mesh data occasionally to simulate processing time
    if (Math.random() > 0.2) return

    // Generate simulated face mesh data
    const centerX = 300
    const centerY = 200
    const landmarks = []

    // Generate face landmarks in an oval pattern
    for (let i = 0; i < 468; i++) {
      const angle = (i / 468) * Math.PI * 2
      const radiusX = 100 + Math.sin(i * 0.5) * 20
      const radiusY = 130 + Math.cos(i * 0.5) * 20

      const x = centerX + Math.cos(angle) * radiusX + (Math.random() * 5 - 2.5)
      const y = centerY + Math.sin(angle) * radiusY + (Math.random() * 5 - 2.5)
      const z = Math.sin(angle) * 0.05

      landmarks.push({ x, y, z })
    }

    // Generate triangles (simplified)
    const triangles = []
    for (let i = 0; i < 200; i++) {
      triangles.push([
        Math.floor(Math.random() * 468),
        Math.floor(Math.random() * 468),
        Math.floor(Math.random() * 468),
      ])
    }

    setFaceMeshData({
      detected: true,
      landmarks,
      mesh_triangles: triangles,
    })
  }

  // Process verification with scanning animation
  const processVerification = () => {
    if (!cameraActive) {
      toast({
        title: "Gabim",
        description: "Ju lutemi aktivizoni kamerën para se të filloni verifikimin.",
        variant: "destructive",
      })
      return
    }

    setIsVerifying(true)
    setVerificationStatus("processing")
    setScanProgress(0)
    setScanPhase(1)
    setScanMessage("Duke inicializuar skanimin 3D...")
  }

  // Render face mesh on canvas
  const renderFaceMesh = () => {
    if (!canvasRef.current || !faceMeshData || !faceMeshData.detected) return

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    if (!context) return

    // Clear previous drawings
    context.clearRect(0, 0, canvas.width, canvas.height)

    // Draw video frame
    if (videoRef.current) {
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
    }

    // Draw face mesh
    const { landmarks, mesh_triangles } = faceMeshData

    // Draw triangles
    context.strokeStyle = "rgba(0, 255, 0, 0.5)"
    context.lineWidth = 1

    for (const triangle of mesh_triangles) {
      const [a, b, c] = triangle

      if (landmarks[a] && landmarks[b] && landmarks[c]) {
        context.beginPath()
        context.moveTo(landmarks[a].x, landmarks[a].y)
        context.lineTo(landmarks[b].x, landmarks[b].y)
        context.lineTo(landmarks[c].x, landmarks[c].y)
        context.closePath()
        context.stroke()
      }
    }

    // Draw landmarks
    context.fillStyle = "rgba(0, 255, 255, 0.7)"

    for (const landmark of landmarks) {
      context.beginPath()
      context.arc(landmark.x, landmark.y, 1, 0, Math.PI * 2)
      context.fill()
    }
  }

  // Scanning animation effect
  useEffect(() => {
    if (!isVerifying) return

    const scanInterval = setInterval(() => {
      setScanProgress((prev) => {
        const newProgress = prev + 2

        // Update scan phases and messages
        if (newProgress === 20) {
          setScanPhase(2)
          setScanMessage("Duke identifikuar pikat kyçe të fytyrës...")
        } else if (newProgress === 40) {
          setScanPhase(3)
          setScanMessage("Duke analizuar strukturën 3D...")
        } else if (newProgress === 60) {
          setScanPhase(4)
          setScanMessage("Duke verifikuar gjallërinë...")
        } else if (newProgress === 80) {
          setScanPhase(5)
          setScanMessage("Duke krahasuar me të dhënat e ruajtura...")
        } else if (newProgress >= 100) {
          clearInterval(scanInterval)

          // Complete verification
          setTimeout(() => {
            setVerificationStatus("success")
            setVerificationMessage(
              "Verifikimi u krye me sukses! Pensioni juaj është konfirmuar për 6 muajt e ardhshëm.",
            )

            toast({
              title: "Verifikim i suksesshëm",
              description: "Identiteti juaj u verifikua me sukses.",
            })

            setIsVerifying(false)
          }, 500)

          return 100
        }

        return newProgress
      })
    }, 200)

    return () => clearInterval(scanInterval)
  }, [isVerifying, toast])

  // Render face mesh when data changes
  useEffect(() => {
    if (faceMeshData && faceMeshData.detected) {
      renderFaceMesh()
    }
  }, [faceMeshData])

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Link href="/pensionet" className="flex items-center text-blue-600 hover:underline">
          <ArrowLeft className="mr-2" size={16} />
          Kthehu te pensionet
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-medium text-gray-800 mb-2">Verifikimi 3D me kamerë</h1>
        <p className="text-gray-600">
          Përdorni kamerën për të verifikuar identitetin tuaj me teknologji 3D dhe për të konfirmuar që jeni gjallë.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Pamja e kamerës 3D</CardTitle>
            <CardDescription>
              Sistemi do të analizojë strukturën 3D të fytyrës suaj për verifikim të sigurt.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
              {!cameraActive ? (
                <div className="text-center">
                  <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Klikoni "Aktivizo kamerën" për të filluar</p>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  {/* Live video feed */}
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                    style={{ display: isVerifying ? "none" : "block" }}
                  />

                  {/* Canvas for face mesh rendering */}
                  <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                    style={{ display: isVerifying ? "none" : "block" }}
                  />

                  {/* Scanning overlay during verification */}
                  {isVerifying && (
                    <div className="absolute inset-0">
                      {/* Show canvas during verification too */}
                      <canvas ref={canvasRef} className="w-full h-full" />

                      {/* Scanning grid */}
                      <div className="absolute inset-0 bg-transparent">
                        <div
                          className="w-full h-full"
                          style={{
                            backgroundImage:
                              "linear-gradient(to right, rgba(0,150,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,150,255,0.1) 1px, transparent 1px)",
                            backgroundSize: "20px 20px",
                          }}
                        ></div>
                      </div>

                      {/* Scanning line */}
                      <div
                        className="absolute left-0 right-0 h-1 bg-blue-500 opacity-70"
                        style={{
                          top: `${(Math.sin(scanProgress / 10) * 0.4 + 0.5) * 100}%`,
                          boxShadow: "0 0 10px 2px rgba(59, 130, 246, 0.7)",
                        }}
                      ></div>

                      {/* Scanning info overlay */}
                      <div className="absolute inset-0 flex flex-col items-center justify-end p-4">
                        <div className="bg-black/50 text-white p-3 rounded-lg w-full max-w-md">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">{scanMessage}</span>
                            <span className="text-xs">{scanProgress}%</span>
                          </div>
                          <div className="w-full bg-gray-300 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full transition-all duration-200 ease-out"
                              style={{ width: `${scanProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* WebSocket connection indicator */}
                  {cameraActive && !isVerifying && (
                    <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-1 ${wsConnected ? "bg-green-500" : "bg-red-500"}`}></div>
                      {wsConnected ? "Lidhur me AI" : "Duke u lidhur..."}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="personal-id">Numri personal i identifikimit</Label>
                <Input
                  id="personal-id"
                  placeholder="Vendosni numrin personal"
                  value={personalId}
                  onChange={(e) => setPersonalId(e.target.value)}
                  disabled={isVerifying || cameraActive}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                {!cameraActive ? (
                  <Button className="bg-blue-600 hover:bg-blue-700 w-full" onClick={startCamera}>
                    Aktivizo kamerën
                  </Button>
                ) : !isVerifying ? (
                  <>
                    <Button className="bg-green-600 hover:bg-green-700 w-full" onClick={processVerification}>
                      Fillo verifikimin
                    </Button>
                    <Button variant="outline" className="w-full" onClick={switchCamera}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Ndërro kamerën
                    </Button>
                    <Button variant="destructive" className="w-full" onClick={stopCamera}>
                      Ndalo kamerën
                    </Button>
                  </>
                ) : (
                  <Button className="bg-green-600 hover:bg-green-700 w-full" disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Duke verifikuar...
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            {verificationStatus === "success" && (
              <Alert className="w-full bg-green-50 border-green-200">
                <Check className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Verifikim i suksesshëm</AlertTitle>
                <AlertDescription className="text-green-700">{verificationMessage}</AlertDescription>
              </Alert>
            )}
            {verificationStatus === "failed" && (
              <Alert className="w-full bg-red-50 border-red-200">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertTitle className="text-red-800">Verifikimi dështoi</AlertTitle>
                <AlertDescription className="text-red-700">{verificationMessage}</AlertDescription>
              </Alert>
            )}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Procesi i skanimit 3D</CardTitle>
            <CardDescription>
              Teknologjia jonë e avancuar përdor inteligjencën artificiale për të analizuar strukturën 3D të fytyrës
              suaj.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div
                  className={`${scanPhase >= 1 ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-600"} rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 transition-colors duration-300`}
                >
                  1
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Inicializimi i skanimit</h3>
                  <p className="text-sm text-gray-600">
                    Sistemi aktivizon kamerën dhe përgatit algoritmet e analizës 3D për të filluar procesin e skanimit.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div
                  className={`${scanPhase >= 2 ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-600"} rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 transition-colors duration-300`}
                >
                  2
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Identifikimi i pikave kyçe</h3>
                  <p className="text-sm text-gray-600">
                    Algoritmi identifikon 468 pika kyçe në fytyrën tuaj, duke përfshirë sytë, hundën, gojën dhe konturet
                    e fytyrës.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div
                  className={`${scanPhase >= 3 ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-600"} rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 transition-colors duration-300`}
                >
                  3
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Krijimi i modelit 3D</h3>
                  <p className="text-sm text-gray-600">
                    Bazuar në pikat kyçe, sistemi krijon një model tredimensional të fytyrës suaj, duke kapur detaje
                    unike të strukturës.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div
                  className={`${scanPhase >= 4 ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-600"} rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 transition-colors duration-300`}
                >
                  4
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Verifikimi i gjallërisë</h3>
                  <p className="text-sm text-gray-600">
                    Sistemi verifikon që jeni një person i gjallë duke analizuar mikroshprehjet, reflektimin e dritës
                    dhe strukturën 3D.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div
                  className={`${scanPhase >= 5 ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-600"} rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 transition-colors duration-300`}
                >
                  5
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Krahasimi dhe konfirmimi</h3>
                  <p className="text-sm text-gray-600">
                    Modeli 3D krahasohet me të dhënat e ruajtura dhe, pas verifikimit të suksesshëm, pensioni
                    konfirmohet për 6 muajt e ardhshëm.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Siguria:</strong> Teknologjia jonë 3D është 99.9% e saktë dhe e pamundur për t'u falsifikuar
                    me fotografi apo video.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
