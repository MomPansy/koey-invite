import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import pleaseGif from '/please.webp'
import cryingGif from '/sad.gif'
import pochaccoImg from '/pochacco.png'
import './App.css'

type Position = 'absolute' | 'relative' | 'fixed' | 'sticky' | 'static';

export function App() {
  const [count, setCount] = useState(0)
  const [acceptButtonSize, setAcceptButtonSize] = useState(1)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)
  const [hoverReject, setHoverReject] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Initial positions for the buttons
  const initialAcceptButtonPosition = { top: 50, left: 50 }
  const initialRejectButtonPosition = { top: 50, left: 150 }

  const [rejectButtonPosition, setRejectButtonPosition] = useState(
    initialRejectButtonPosition
  )
  const [rejectButtonPositionType, setRejectButtonPositionType] = useState<Position | undefined>('absolute')

  const RejectText = [
    'Reject',
    'Please',
    'Pretty please',
    "You don't wanna do this",
    'You will regret this',
    'Last chance',
    'I beg you',
    'I will cry',
    "I'm on my knees",
    "Why are you doing this?",
    "Please, I'm begging you",
    "This means so much to me",
    "You're hurting me",
    "Don't make me suffer",
    "I'll never forget this",
    "You're my only hope",
    "Please don't reject me",
    "I can't handle this",
    "Bye"
  ]

  const handleAccept = () => {
    navigate('/accepted')
  }

  const handleReject = () => {
    if (count < RejectText.length) {
      setCount((prev) => prev + 1)
    } else {
      setCount(0)
    }

    // Increase accept button size
    setAcceptButtonSize((prevSize) => prevSize + 0.1)

    // Change position type to 'fixed' to allow movement anywhere on the screen
    setRejectButtonPositionType('fixed')

    // Randomize reject button position within viewport
    const buttonWidth = 100 // approximate button width
    const buttonHeight = 50 // approximate button height

    const maxTop = windowHeight - buttonHeight
    const maxLeft = windowWidth - buttonWidth - 60

    const randomTop = Math.floor(Math.random() * maxTop)
    const randomLeft = Math.floor(Math.random() * maxLeft)

    setRejectButtonPosition({ top: randomTop, left: randomLeft })
  }

  // Handle hover state
  const handleMouseEnter = () => {
    setHoverReject(true)
  }

  const handleMouseLeave = () => {
    setHoverReject(false)
  }

  return (
    <>
    <div className="flex flex-col justify-center items-center">
      <img className="w-32 h-32" src={hoverReject ? cryingGif : pleaseGif} alt="please gif" />
      <p className="text-black mt-4">
        You have been invited to celebrate your birthday with Jayden
      </p>
      <div
        className="button-container"
        style={{
          position: 'relative',
          width: '300px',
          height: '200px',
        }}
      >
        <button
          style={{
            position: 'absolute',
            top: `${initialAcceptButtonPosition.top}px`,
            left: `${initialAcceptButtonPosition.left - 60}px`,
            transform: `scale(${acceptButtonSize})`,
            transformOrigin: 'top left',
          }}
          onClick={handleAccept}
        >
          Accept
        </button>
        {count < RejectText.length && (
          <button
            onClick={handleReject}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              position: rejectButtonPositionType,
              top: `${rejectButtonPosition.top}px`,
              left: `${rejectButtonPosition.left + 20}px`,
            }}
          >
            {RejectText[count]}
          </button>
        )}
      </div>
    </div>
    <img className='absolute bottom-0 right-0' src={pochaccoImg} alt='pochacco'/>
    </>
  )
}

export default App
