'use client';

import Image from 'next/image'
import React, { ChangeEvent, useState } from "react"
import { nepToBusd, busdToNep } from "../utils/conversion";


export default function Index() {


  const [nep, setNep] = useState(0);
  const [busd, setBusd] = useState(0);




  const handleNepChange = (e: ChangeEvent) => {
    const element = e.currentTarget as HTMLInputElement;

    const nepValue = parseFloat(element.value) || 0;
    // nepToBusd(nepValue).toFixed(2)
    console.log(nepToBusd(nepValue).toFixed(2));

    const busdValue = parseFloat(nepToBusd(nepValue).toFixed(2));
    setNep(nepValue);
    setBusd(busdValue);

  }

  const handleBusdChange = (e: ChangeEvent) => {
    const element = e.currentTarget as HTMLInputElement;
    const busdValue = parseFloat(element.value) || 0;
    const nepValue = parseFloat(busdToNep(busdValue).toFixed(2));

    setBusd(busdValue);
    setNep(nepValue);
  }

  return (

    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className='semi-bold text-4xl'>Currency Converter</h1>
      <div className="w-29 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">

        <p> Date 2021-09-09</p>
        <div className="flex justify-between items-center">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nep</label>
            <div className="flex">

              <input value={nep} onChange={handleNepChange} min={0} type="number" id="large-input" className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

            </div>
          </div>
          <div className='pl-10 pr-10 mt-5' >
            <Image
              className='text-white'
              src="/new.svg"
              width={50}
              height={50}
              alt='convert sign'
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Busd</label>
            <input value={busd} onChange={handleBusdChange} type="number" min={0} id="large-input" className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
        </div>
      </div>

      <div className="relative ...">
        <p>Relative parent</p>
        <div className="absolute bottom-0 left-0 ...">
          <p>Absolute child</p>
        </div>
      </div>


      <div className="container mx-auto">


      </div>

    </main>
  )
}