import { useState, useRef, useEffect } from 'react'
import './App.css'
function App() {
  // State management
  const [videoEnded, setVideoEnded] = useState(false)
  const [showClickToEnter, setShowClickToEnter] = useState(false)
  const [videoStarted, setVideoStarted] = useState(false)
  const [maskLoaded, setMaskLoaded] = useState(false)
  const videoRef = useRef(null)

  // Handle video autoplay attempt
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Try to autoplay with sound
    const playPromise = video.play()
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Autoplay with sound succeeded
          setVideoStarted(true)
          console.log('Autoplay with sound succeeded')
        })
        .catch((error) => {
          // Autoplay was blocked by the browser
          console.log('Autoplay blocked:', error)
          setShowClickToEnter(true)
        })
    }
  }, [])

  // Handle video end
  const handleVideoEnd = () => {
    console.log('Video ended')
    setVideoEnded(true)
  }

  // Skip video and show popup
  const handleSkip = () => {
    const video = videoRef.current
    if (video) {
      video.pause()
    }
    setVideoEnded(true)
  }

  // Handle click to enter (fallback for blocked autoplay)
  const handleClickToEnter = () => {
    const video = videoRef.current
    if (video) {
      video.play()
        .then(() => {
          setShowClickToEnter(false)
          setVideoStarted(true)
          console.log('Video started after user interaction')
        })
        .catch((error) => {
          console.error('Failed to play video:', error)
        })
    }
  }

  // Handle mask click - redirect to another website
  const handleMaskClick = () => {
    window.location.href = 'https://example.com/next-page'
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Full-screen video player */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        onEnded={handleVideoEnd}
        playsInline
        preload="auto"
      >
        <source src="/vid%20(1).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Click to Enter overlay (shown if autoplay is blocked) */}
      {showClickToEnter && !videoStarted && (
        <div 
          className="absolute inset-0 z-20 flex items-center justify-center bg-black bg-opacity-90 cursor-pointer transition-opacity duration-700"
          onClick={handleClickToEnter}
        >
          <div className="text-center">
            <p className="text-white text-4xl font-bold tracking-wider animate-pulse">
              Click to start
            </p>
            <p className="text-gray-400 text-sm mt-4">
              Your browser requires interaction to play audio.
            </p>
          </div>
        </div>
      )}

      {/* Skip button (shown while video is playing) */}
      {videoStarted && !videoEnded && !showClickToEnter && (
        <button
          type="button"
          onClick={handleSkip}
          className="absolute bottom-6 right-6 z-20 px-4 py-2 text-sm uppercase tracking-widest text-white bg-black/60 border border-white/30 hover:bg-black/80 transition-opacity duration-700"
        >
          Skip
        </button>
      )}

      {/* Horror popup overlay (shown after video ends) */}
      {videoEnded && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black bg-opacity-95 transition-opacity duration-700 animate-fade-in">
          {/* Film grain/noise effect */}
          <div className="absolute inset-0 opacity-10 bg-noise"></div>

          {/* Content container */}
          <div className="relative z-10 text-center">
            {/* Mask image - clickable */}
            <div 
              className="mb-8 cursor-pointer transition-all duration-300 hover:scale-110 animate-pulse-glow"
              onClick={handleMaskClick}
            >
              <img 
                src="/mask.png" 
                alt="Mask" 
                className="w-64 h-64 object-contain mx-auto filter drop-shadow-2xl"
                onLoad={() => setMaskLoaded(true)}
                onError={() => setMaskLoaded(false)}
              />
              {/* Fallback placeholder if image doesn't load */}
              {!maskLoaded && (
                <div className="w-64 h-64 mx-auto rounded-full bg-gradient-to-b from-gray-800 to-black border-4 border-red-900 flex items-center justify-center">
                  <div className="text-6xl">👤</div>
                </div>
              )}
            </div>

            {/* Creepy text with glitch effects */}
            <div className="space-y-6">
              {/* Primary text - most prominent */}
              <h1 className="text-6xl md:text-8xl font-bold text-white animate-glitch tracking-wider">
                I see you.
              </h1>

            
            </div>

           
          </div>
        </div>
      )}
    </div>
  )
}

export default App
