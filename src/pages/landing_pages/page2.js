import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ShopBg from '../../../public/shop.webp';
import ShopKeeper from '../../../public/shopkeeper.webp';
import Head from 'next/head';
import TypingEffect from 'react-typing-effect';

const Page2 = ({ onTransitionToPage3, showThankYou, onThankYouClose }) => {
    const [showMessage, setShowMessage] = useState(false);
    const [dialogStage, setDialogStage] = useState(0);

    useEffect(() => {
        if (dialogStage === 0) {
            const timer = setTimeout(() => {
                setDialogStage(1);
            }, 10000);
            return () => clearTimeout(timer);
        } else if (dialogStage === 1) {
            const transitionTimer = setTimeout(() => {
                setDialogStage(2);
                onTransitionToPage3();
            }, 3000);
            return () => clearTimeout(transitionTimer);
        }
    }, [dialogStage, onTransitionToPage3]);

    return (
        <>
            <Head>
                <title>Isekai Store</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet" />
            </Head>

            <div className="overflow-hidden w-screen h-screen flex relative font-pixel">
                <Image src={ShopBg} alt="Isekai Store" className="object-cover" />
                <div className="absolute flex flex-col p-10 md:p-32 mt-32 md:mt-0">
                    <div className="w-full md:w-1/3">
                        <Image src={ShopKeeper} alt="Isekai Store" className="object-contain" />
                    </div>
                    <div className="w-full bg-black/90 p-5 rounded-2xl outline-4 outline-white outline">
                        <div className="text-3xl md:text-5xl text-white font-bold text-center">
                            {showThankYou ? "THANK YOU!" : "WELCOME ADVENTURER!"}
                        </div>
                        <p className="text-white text-2xl md:text-3xl text-center py-5">
                            {showThankYou ? (
                                "Your magical items are on their way! May they serve you well on your adventures."
                            ) : dialogStage === 0 ? (
                                <TypingEffect
                                    text={[
                                        "May I help you?",
                                        "We have various items here!",
                                    ]}
                                    speed={100}
                                    eraseSpeed={50}
                                    typingDelay={500}
                                    eraseDelay={2000}
                                    cursorRenderer={cursor => <span>{cursor}</span>}
                                    onTypingEnd={() => setDialogStage(1)}
                                />
                            ) : (
                                <span>Please take a look.</span>
                            )}
                        </p>
                    </div>
                </div>
            </div>
            {showThankYou && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                    onClick={onThankYouClose}
                >
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
                        <p>Thank you for your purchase! Tap anywhere to keep shopping and discover more great finds.</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Page2;