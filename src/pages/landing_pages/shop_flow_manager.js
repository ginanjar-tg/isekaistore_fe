import React, { useState } from 'react';
import Page2 from './page2';
import Page3 from './page3';

const ShopFlowManager = () => {
    const [currentPage, setCurrentPage] = useState('page2');
    const [showThankYou, setShowThankYou] = useState(false);

    const handleTransitionToPage3 = () => {
        setCurrentPage('page3');
    };

    const handlePurchase = () => {
        setShowThankYou(true);
        setCurrentPage('page2');
    };

    const handleThankYouClose = () => {
        setShowThankYou(false);
    };

    return (
        <>
            {currentPage === 'page2' && (
                <Page2 
                    onTransitionToPage3={handleTransitionToPage3}
                    showThankYou={showThankYou}
                    onThankYouClose={handleThankYouClose}
                />
            )}
            {currentPage === 'page3' && (
                <Page3 onPurchase={handlePurchase} />
            )}
        </>
    );
};

export default ShopFlowManager;