import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import male1 from "/male1.png";
import female1 from "/female1.png";
import male2 from "/male2.png";
import female2 from "/female2.png";
import squish from "/squish.png";

type Position = 'absolute' | 'relative' | 'fixed' | 'sticky' | 'static';

export function GF() {
    const navigate = useNavigate();
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    useEffect(() => {
        const targetDate = new Date('2024-11-08T11:00:00Z'); // 7 PM GMT+8 in UTC
        const checkDate = () => {
            const now = new Date();
            setIsButtonEnabled(now >= targetDate);
        };

        checkDate();
        const interval = setInterval(checkDate, 1000); // Check every second

        return () => clearInterval(interval); // Clean up interval on component unmount
    }, []);
    return (
        <div className="flex gap-2">
            <Itinerary />
            <button onClick={() => navigate('/koey-invite/gf/proposal')} disabled={!isButtonEnabled} style={{
                backgroundColor: isButtonEnabled ? 'black' : 'lightgray',
                color: isButtonEnabled ? 'initial' : 'darkgray',
                cursor: isButtonEnabled ? 'pointer' : 'not-allowed',
            }}>Proposal</button>
        </div>
    )
}
export function Proposal() {
    const navigate = useNavigate();
    const [level, setLevel] = useState(1);
    return (
        <>
  
            <div className="absolute top-4 left-4 gap-2">
                <button onClick={() => setLevel(1)}>Reset</button>
                <button
                onClick={() => navigate('/koey-invite/')}
            >
                Home
            </button>
            </div>
            <div className="w-screen py-24">
                <div>
                    {(level === 1 && <LevelOne setLevel={setLevel} />) ||
                        (level === 2 && <LevelTwo setLevel={setLevel} />) ||
                        (level === 3 && <LevelThree setLevel={setLevel} />) ||
                        (level === 4 && <LevelFour />)}
                </div>
            </div>
        </>
    );
}


function LevelOne({ setLevel }: { setLevel: React.Dispatch<React.SetStateAction<number>> }) {
    return (
        <LevelContent
            setLevel={setLevel}
            question="Where did we first meet?"
            correctAnswer="sukiya"
            images={[male1, female1]}
            offset={0} // Starting offset
        />
    );
}


function LevelTwo({ setLevel }: { setLevel: React.Dispatch<React.SetStateAction<number>> }) {
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    type Answer = {
        answer: boolean;
    }

    const offset = 200; // Adjust offset for image movement

    const handleAnswer = async () => {
        try {
            setLoading(true);

            const messages = [
                { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    content: `Help me validate this answer, the answer should be "Did you get home safe?", so if the answer is similar to "Did you get home safely?" it should be correct. Your output format should be in this json object
                            {
                                answer: true                      
                            } or 
                            {
                                answer: false
                            }
                            
                            The answer is: ${answer}`,
                },
            ]

            const model = "gpt-4o-mini";
            const response_format = {
                type: "json_object",
            };

            const res = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    model,
                    response_format,
                    messages
                })

            })

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const completion = await res.json()

            const reply = completion.choices[0].message.content;
            if (!reply) return;
            const result: Answer = JSON.parse(reply);  // Parse the string into a JavaScript object

            if (result['answer'] === true) {
                setLevel((prev) => prev + 1);
            } else {
                setLevel((prev) => prev - 1);
            }
        }
        catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="w-full">
            <h1>What was my first text to you?</h1>
            <div className="flex gap-4 justify-center mt-4 rounded-md">
                <input
                    className="bg-white p-2"
                    placeholder="Answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !loading && handleAnswer()}
                />
                <button onClick={handleAnswer} disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </div>
            <div className="flex justify-between mt-10 px-2">
                <img
                    src={male2}
                    alt="male"
                    className="md:w-[256px] md:h-[412px]"
                    style={{ transform: `translateX(${offset}px)` }}
                />
                <img
                    src={female2}
                    alt="female"
                    className="md:w-[256px] md:h-[412px]"
                    style={{ transform: `translateX(-${offset}px)` }}
                />
            </div>
        </div>
    );
}


function LevelThree({ setLevel }: { setLevel: React.Dispatch<React.SetStateAction<number>> }) {
    return (
        <LevelContent
            setLevel={setLevel}
            question="What's our favourite activity?"
            correctAnswer="nua"
            images={[male2, female2]}
            offset={400} // Further reduced offset
        />
    );
}

function LevelFour() {
    const [accepted, setAccepted] = useState(false)
    const initialRejectButtonPosition = { top: 0, left: 0 }
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [windowHeight, setWindowHeight] = useState(window.innerHeight)

    const [rejectButtonPosition, setRejectButtonPosition] = useState(
        initialRejectButtonPosition
    )
    const [rejectButtonPositionType, setRejectButtonPositionType] = useState<Position | undefined>('absolute')
    const yesButtonRef = useRef<HTMLButtonElement>(null);


    useEffect(() => {
        if (yesButtonRef.current) {
            const yesButtonRect = yesButtonRef.current.getBoundingClientRect();

            // Set the "No" button position right next to the "Yes" button
            setRejectButtonPosition({
                top: yesButtonRect.top,
                left: yesButtonRect.right + 10 // Adjust spacing as needed
            });
        }

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    const handleReject = () => {
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

    return (
        <>
            {!accepted ? (
                <>
                    <h1>Will you be my girlfriend?</h1>
                    <div className="flex justify-center gap-4 mt-4">
                        <button ref={yesButtonRef} onClick={() => setAccepted(true)}>Yes</button>
                        <button
                            onMouseEnter={handleReject}
                            style={{
                                position: rejectButtonPositionType,
                                top: `${rejectButtonPosition.top}px`,
                                left: `${rejectButtonPosition.left + 20}px`,
                            }}
                        >
                            No
                        </button>
                    </div>
                </>
            ) : <h1>Thats right</h1>}
            <div className="flex justify-center mt-4 px-2">
                <img src={squish} alt="squish" className="md:w-[400px] md:h-[600px]" />
            </div>
        </>
    );
}

function LevelContent({ setLevel, question, correctAnswer, images, offset }: { setLevel: React.Dispatch<React.SetStateAction<number>>, question: string, correctAnswer: string, images: string[], offset: number }) {
    const [answer, setAnswer] = useState("");

    const handleAnswer = () => {
        if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
            setLevel((prev) => prev + 1);
        } else {
            setLevel((prev) => Math.max(1, prev - 1)); // Prevent level from going below 1
        }
    };

    return (
        <div className="w-full">
            <h1>{question}</h1>
            <div className="flex gap-4 justify-center mt-4">
                <input
                    className="bg-white p-2 rounded-md"
                    placeholder="Answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAnswer()}
                />
                <button onClick={handleAnswer}>Submit</button>
            </div>
            <div className="flex justify-between mt-10 px-2">
                <img
                    src={images[0]}
                    alt="male"
                    className="md:w-[256px] md:h-[412px]"
                    style={{ transform: `translateX(${offset}px)` }}
                />
                <img
                    src={images[1]}
                    alt="female"
                    className="md:w-[256px] md:h-[412px]"
                    style={{ transform: `translateX(-${offset}px)` }}
                />
            </div>
        </div>
    );
}


function Itinerary() {
    const [view, setView] = useState(false);
    const navigate = useNavigate();

    const handleView = () => {
        setView((prev) => !prev);
    }

    const closeModal = () => {
        setView(false);
    }
    return (
        <div>
            <button
                className="absolute top-4 left-4 text-white px-4 py-2 rounded"
                onClick={() => navigate('/koey-invite/')}
            >
                Home
            </button>
            <button onClick={handleView}>View itinerary</button>
            {view && (
                <ItineraryModal closeModal={closeModal} />
            )}
        </div>
    );
}

const ItineraryModal = ({ closeModal }: { closeModal: () => void }) => {
    const handleBackgroundClick = () => {
        closeModal();
    };

    return (
        <div className='fixed left-0 top-0 bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center' onClick={handleBackgroundClick}>
            <div className='bg-white rounded shadow-sm p-8' onClick={(e) => e.stopPropagation()}>
                <table>
                    <thead>
                        <tr>
                            <th style={{ padding: '16px' }}>Time</th>
                            <th style={{ padding: '16px' }}>Activity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ padding: '16px' }}>13:30</td>
                            <td style={{ padding: '16px' }}>Pick up from your house</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '16px' }}>14:00</td>
                            <td style={{ padding: '16px' }}>
                                Sushi Lunch
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '16px' }}>15:30</td>
                            <td style={{ padding: '16px' }}>
                                SEA Aquarium @Sentosa
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '16px' }}>19:00</td>
                            <td style={{ padding: '16px' }}>
                                Dinner at <a href="https://www.skirt.sg/">SKIRT</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
