import { useState } from "react";
import Success from '/success.gif'
import ConfettiExplosion from 'react-confetti-explosion'
import { useNavigate } from "react-router-dom";

export function Accepted() {
    const [view, setView] = useState(false);
    const navigate = useNavigate();
 
    const handleView = () => {
        setView((prev) => !prev);
    };

    const closeModal = () => {
        setView(false);
    };

    return (
        <div>
            <ConfettiExplosion force={0.8} duration={3000} particleCount={250} width={3000}/>
             <button 
                className="absolute top-4 left-4 text-white px-4 py-2 rounded" 
                onClick={() => navigate('/koey-invite/')}
            >
                Home
            </button>
            <img className="h-32 w-32" src={Success} alt='success' />
            <p className='mt-4'>Hehehehe YAYYY</p>
            <button onClick={handleView} className='mt-2'>View itinerary</button>
            {view && (
                <ItineraryModal closeModal={closeModal} />
            )}
        </div>
    );
}

const ItineraryModal = ({ closeModal }: {closeModal: () => void}) => {
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
                            <td style={{ padding: '16px' }}>13:45</td>
                            <td style={{ padding: '16px' }}>Pick up from your house</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '16px' }}>14:30</td>
                            <td style={{ padding: '16px' }}>
                                Mini-Golf at <br />
                                <a href="https://www.kulnari.com/">Kulnari Mystery Golf</a>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '16px' }}>16:00</td>
                            <td style={{ padding: '16px' }}>
                                Nua at <a href="https://www.4play.sg/">4 Play</a>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '16px' }}>19:15</td>
                            <td style={{ padding: '16px' }}>
                                Dinner at <a href="https://www.pullmansingaporehillstreet.com/restaurants-bars/moga/">MOGA</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
