'use client';

// import Image from 'next/image'
import React, { ChangeEvent, useState } from "react"
import { nepToBusd, busdToNep } from "../utils/conversion";
import WalletModal from "../components/walletModal";


export default function Index() {


  const [nep, setNep] = useState(0);
  const [busd, setBusd] = useState(0);

  const [openModal, setOpenModal] = useState(false);


  let injectedProvider = false


  if (typeof window !== 'undefined') {
    if (typeof window.ethereum !== 'undefined') {
      injectedProvider = true
      console.log(window.ethereum)
    }
  }

  const isMetaMask = injectedProvider ? window.ethereum.isMetaMask : false



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

  const getDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}/${month}/${day}`;
  }


  const openModalHandler = () => {
    console.log(isMetaMask);

    if (
      isMetaMask
    ) {
      setOpenModal(true);

    } else {
      alert('Please install metamask');
    }
  }

  const toggleModal = () => {
    setOpenModal(!openModal);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className='semi-bold text-4xl'>Crypto Converter</h1>
      <div className="w-29 p-6 rounded-lg shadow  bg-gray-800 border-gray-700 ">
        <div className="sm:flex justify-between items-center ">
          <div>
            <label className="block mb-2 text-sm font-medium text-white ml-2">Nep</label>
            <div className="flex">
              <input value={nep} onChange={handleNepChange} min={0} type="number" id="large-input" className="block  w-full p-5 mb-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <p className='text-white text-xs'>1 Nep = 3 Busd</p>
          </div>
          <div className='pl-10 pr-10 mt-5' >
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-white">Busd</label>
            <input value={busd} onChange={handleBusdChange} type="number" min={0} id="large-input" className="block w-full p-5 mb-3  text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            <p className='text-white text-xs'>1 Busd = .33 Nep</p>
          </div>
        </div>
        <div className='mt-10 '>
          <p onClick={openModalHandler} className='text-blue-50 text-center mb-1 underline cursor-pointer'>Wallet Details</p>
          <p className='text-white text-xs text-center'>Last updated on {getDate()} </p>
        </div>
      </div>
      <div>
        <p className='text-2xl'>Made with love  by <a href="https://yuhannakapali.com.np" target="_blank">Yuhanna Kapali</a></p>
      </div>
      <WalletModal isOpen={openModal} onClose={toggleModal} />
    </main>

  )
}