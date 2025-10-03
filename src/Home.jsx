// src/Home.jsx
import React from "react";
import BrandsRail from "./components/BrandsRail";
import FlashShelf from "./components/FlashShelf";

export default function Home(){
  return (
    <main style={{padding:16}}>
  {/*     <FlashShelf/> */}
      <BrandsRail />
    </main>
  );
}
