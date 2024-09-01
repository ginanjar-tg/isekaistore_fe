import React, { useState } from 'react';
import Image from 'next/image';
import ShopBg from '../../../public/shop.webp';
import { FaPlus, FaMinus } from 'react-icons/fa';
import Head from 'next/head';

// Import your webp images
import wandImage from '../../../public/wand.webp';
import potionImage from '../../../public/potion.webp';
import swordImage from '../../../public/sword.webp';
import shieldImage from '../../../public/shield.webp';
import elixirImage from '../../../public/elixir.webp';
import scrollImage from '../../../public/scroll.webp';

const Page3 = ({ onPurchase }) => {
    const items = [
        { id: 1, name: 'Magic Wand', price: 500, image: wandImage },
        { id: 2, name: 'Healing Potion', price: 200, image: potionImage },
        { id: 3, name: 'Iron Sword', price: 1500, image: swordImage },
        { id: 4, name: 'Wooden Shield', price: 1200, image: shieldImage },
        { id: 5, name: 'Mana Elixir', price: 300, image: elixirImage },
        { id: 6, name: 'Teleportation Scroll', price: 700, image: scrollImage },
    ];

    const [cart, setCart] = useState({});

    const handleAddToCart = (item) => {
        setCart(prevCart => ({
            ...prevCart,
            [item.id]: (prevCart[item.id] || 0) + 1
        }));
    };

    const handleRemoveFromCart = (item) => {
        setCart(prevCart => {
            const newCart = { ...prevCart };
            if (newCart[item.id] > 1) {
                newCart[item.id]--;
            } else {
                delete newCart[item.id];
            }
            return newCart;
        });
    };

    const totalPrice = items.reduce((sum, item) => sum + (cart[item.id] || 0) * item.price, 0);

    const handleBuyNow = () => {
        if (totalPrice > 0) {
            onPurchase();
        }
    };

    return (
        <>
            <Head>
                <title>Isekai Store</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet" />
            </Head>

            <div className="relative w-full h-screen overflow-hidden font-pixel">
                <Image src={ShopBg} alt="Isekai Store" layout="fill" objectFit="cover" className="z-0" />
                
                <div className="absolute inset-0 z-10 p-4 overflow-auto">                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {items.map((item) => (
                        <div key={item.id} className="bg-white bg-opacity-80 rounded-lg shadow overflow-hidden transform transition duration-300 hover:scale-105">
                            <div className="w-full h-32 relative">
                            <Image
                                src={item.image}
                                alt={item.name}
                                layout="fill"
                                objectFit="contain"
                            />
                            </div>
                            <div className="p-2">
                            <h2 className="text-2xl font-bold text-gray-800 mb-1 text-center">{item.name}</h2>
                            <p className="text-xl font-semibold text-blue-500 mb-2 text-center">{item.price}G</p>
                            <br />
                            <div className="flex justify-between items-center">
                                <button
                                onClick={() => handleAddToCart(item)}
                                className="bg-blue-500 text-white px-4 py-1 rounded-full text-lg flex items-center space-x-1 hover:bg-blue-800 transition duration-300"
                                >
                                <FaPlus size={16} />
                                <span>Add</span>
                                </button>
                                {cart[item.id] > 0 && (
                                <div className="flex items-center space-x-1">
                                    <button
                                    onClick={() => handleRemoveFromCart(item)}
                                    className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition duration-300"
                                    >
                                    <FaMinus size={12} />
                                    </button>
                                    <span className="font-semibold text-gray-700 text-xl">{cart[item.id]}</span>
                                </div>
                                )}
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-3xl font-bold text-white mb-2">Total: {totalPrice}G</p>
                        <button
                        onClick={handleBuyNow}
                        className={`text-xl px-40 py-2 rounded-full font-semibold transition duration-300 ${
                            totalPrice > 0 
                            ? 'bg-blue-500 text-white hover:bg-blue-600' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={totalPrice === 0}
                        >
                        Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page3;