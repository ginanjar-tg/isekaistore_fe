"use client";

import { useCallback, useReducer, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { A11y, Mousewheel, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import EmberField from "@/components/EmberField";
import Preloader from "@/components/Preloader";
import GateSlide from "@/components/GateSlide";
import WelcomeSlide from "@/components/WelcomeSlide";
import ShopSlide from "@/components/ShopSlide";
import { cartReducer } from "@/lib/cart";
import { ITEMS } from "@/lib/items";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [thankYou, setThankYou] = useState(false);
  const [cart, dispatch] = useReducer(cartReducer, {});

  const handlePreloaderDone = useCallback(() => setLoaded(true), []);

  const handleEnterShop = useCallback(() => {
    swiper?.slideTo(2, 900);
  }, [swiper]);

  const handlePurchase = useCallback(() => {
    dispatch({ type: "clear" });
    setThankYou(true);
    swiper?.slideTo(1, 900);
  }, [swiper]);

  return (
    <main className="relative">
      <EmberField />

      {!loaded ? (
        <Preloader onDone={handlePreloaderDone} />
      ) : (
        <Swiper
          className="h-screen"
          direction="vertical"
          speed={800}
          modules={[Mousewheel, Pagination, A11y]}
          mousewheel={{ forceToAxis: true }}
          pagination={{ clickable: true }}
          onSwiper={setSwiper}
          style={{ zIndex: 20 }}
        >
          <SwiperSlide>
            <GateSlide />
          </SwiperSlide>
          <SwiperSlide>
            <WelcomeSlide
              key={thankYou ? "thanks" : "welcome"}
              thankYou={thankYou}
              onEnterShop={handleEnterShop}
            />
          </SwiperSlide>
          <SwiperSlide>
            <ShopSlide
              items={ITEMS}
              cart={cart}
              dispatch={dispatch}
              onPurchase={handlePurchase}
            />
          </SwiperSlide>
        </Swiper>
      )}
    </main>
  );
}
