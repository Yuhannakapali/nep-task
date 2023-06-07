"use Client";

import React, { useState, useEffect } from "react";
import { Modal, Button, Table } from 'flowbite-react'
import detectEthereumProvider from '@metamask/detect-provider'
import { formatBalance } from "../utils/wallet";

export default function WalletModal({ isOpen, onClose, }: {
  isOpen: boolean,
  onClose: () => void,
}) {

  const [hasProvider, setHasProvider] = useState<boolean | null>(null)
  const initialWalletState = { accounts: [], balance: "", chainId: "" }
  const [wallet, setWallet] = useState(initialWalletState);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");




  useEffect(() => {
    const refreshAccounts = (accounts: any) => {

      if (accounts.length > 0) {
        setIsConnected(true)
        updateWallet(accounts)
      } else {
        setIsConnected(false)
        setWallet(initialWalletState)
      }
    }

    const refreshChain = (chainId: any) => {
      setWallet((wallet) => ({ ...wallet, chainId }))
    }

    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      setHasProvider(Boolean(provider))

      if (provider) {
        const accounts = await window.ethereum.request(
          { method: 'eth_accounts' }
        )

        refreshAccounts(accounts)
        window.ethereum.on('accountsChanged', refreshAccounts)
      }
    }


    getProvider()
    return () => {
      window.ethereum?.removeListener('accountsChanged', refreshAccounts)
      window.ethereum?.removeListener("chainChanged", refreshChain)
    }
  }, [])


  const updateWallet = async (accounts: any) => {
    const balance = formatBalance(await window.ethereum!.request({
      method: "eth_getBalance",
      params: [accounts[0], "latest"],
    }))
    const chainId = await window.ethereum!.request({
      method: "eth_chainId",
    })
    setWallet({ accounts, balance, chainId })
  }

  // const handleConnect = async () => {
  //   // let accounts = await window.ethereum.request({
  //   //   method: "eth_requestAccounts",
  //   // })

  //   // updateWallet(accounts)
  //   // setIsConnected(true)



  // }

  const handleConnect = () => {
    setIsConnecting(true)
    window.ethereum.request({
      method: "eth_accounts",
    })
      .then((accounts: []) => {
        console.log(accounts);

        setError(false)
        updateWallet(accounts)
        setIsConnected(true)
      })
      .catch((err: any) => {
        setError(true)
        setErrorMessage(err.message)
        setIsConnected(false)
      })
    setIsConnecting(false)
  }
  const handleDisconnect = () => {
    setIsConnected(false)
    setWallet(initialWalletState)
  }


  return (
    <Modal show={isOpen} onClose={onClose} size="2xl" >
      <Modal.Header>
        Wallet Details
      </Modal.Header>

      <Modal.Body>
        {
          (hasProvider && isConnected) && (
            <Table striped>
              <Table.Head>
                <Table.HeadCell>Key</Table.HeadCell>
                <Table.HeadCell>value</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Address</Table.Cell>
                  <Table.Cell>{wallet.accounts[0]}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Balance</Table.Cell>
                  <Table.Cell>{wallet.balance}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>chainId</Table.Cell>
                  <Table.Cell>{wallet.chainId}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          )
        }

        {
          (hasProvider && !isConnected) && (
            <Button onClick={handleConnect}>Connect</Button>
          )
        }

        {/* {
          error && (
            <div onClick={() => setError(false)}>
              <strong>Error:</strong> {errorMessage}
            </div>
          )
        } */}

        {isConnected && <Button className="mt-3 text-center" onClick={handleDisconnect} color={"failure"}> Disconnect</Button>}
      </Modal.Body>

    </Modal >
  )

}