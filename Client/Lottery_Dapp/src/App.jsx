import { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import abi from './Contractabi.json';
import './App.css'

function App() {

  
const [account,setAccount]=useState(null)
const [state,setState]=useState()
const [ETH,setETH]=useState(0)

window.ethereum.on('chainChanged',()=>window.location.reload())
window.ethereum.on('accountsChanged', ()=>PopWallet())

  const PopWallet=async()=>{
    const contractAddress="0x4b688886dee33703249Dd20DBB21cC4a274b6B23"
    const contractabi=abi.abi
try{
    const {ethereum}=window
    if(ethereum){
      const account = await ethereum.request({
        method: "eth_requestAccounts",
      })
      setAccount(account[0])
      
        
        const provider=new ethers.BrowserProvider(window.ethereum)
        console.log({provider})
        const signer=await provider.getSigner()
        console.log({signer})
        const contract=new ethers.Contract(
          contractAddress,
          contractabi,
          signer,
        )

        setState(contract)
    }
    else alert("Metamask is not Installed")
  }
  catch(error){console.log("Error in login"+error)}

    }
    const getBalance=async()=>{

      const Balance=await state.GetBalance()
      console.log(Balance)
      }    
    
    

    const Participate=async()=>{
      const value=ethers.parseUnits(ETH,'gwei')
      console.log({value})
      try{
      const Participation=await state.participate({
        value
      })
      Participation.wait()
      console.log(Participation)
    }
    catch(error){console.log({error})}

    }

    const Winner=async()=>{
      try{

      
      const winner=await state.Winner()
      alert(winner)
    }
    catch(error){console.log({error})}
    }
    const ParticipateETH=(e)=>{
      setETH(e.target.value)
    }
    

  return (
    <>
    <h1>Lottery Dapp</h1>
    <button
    color='purple'
    onClick={PopWallet}
    >Connect Wallet</button>
    {account?<h6>{account}</h6>:null}
    <br/>
    <button
    onClick={getBalance}
    >Balance</button>
    <br/>
    <input onChange={(e)=>ParticipateETH(e)}
    type='number'
    ></input>
    <button
    onClick={Participate}
    >Participate</button>
    <br/>
    <button onClick={Winner}>Winner</button>

    </>
  )
}

export default App
