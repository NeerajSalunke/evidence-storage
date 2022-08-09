import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import "./App.css";
import Body from './Body';
// import List from './List';
import Navbar from './Navbar';
import abi from "./utils/FileStorage.json";

// const ipfsClient = require('ipfs-http-client')
// const ipfs = ipfsClient.create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

// function App() {
const App = () => {

  const [currentAccount, setCurrentAccount] = useState("");
  const [filestorageSM, setfilestorageSM] = useState();   /* SM means smart contract */
  const [filescount, setFilesCount] = useState();

  const [files, setFiles] = useState([]);

  const contractAddress = "0xbe3C0E8e5ACa33EaB9aa9a231F2FE991F40b12D0";

  const contractABI = abi.abi;

  // const [allWaves, setAllWaves] = useState([]);

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
        // getAllWaves();
        displayFiles();
      } else {
        console.log("No authorized account found")
        window.alert("Connect Metamask")
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
  * Implement your connectWallet method here
  */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);


    } catch (error) {
      console.log(error)
    }
  }

  const displayFiles = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const Contract = new ethers.Contract(contractAddress, contractABI, signer);
        setfilestorageSM(Contract);

        const filecount = await Contract.fileCount();
        // const filecount = await filestorageSM.fileCount();
        console.log("File Count:", filecount.toNumber());
        setFilesCount(filecount);

        console.log("Display Files ke andar")
        for (var i = 10; i >= 1; i--) {
          // const file = await filestorageSM.methods.files(i).call();
          console.log("Display Files ke for loop ke andar")
          const file = await Contract.files(i);
          console.log(file)
          console.log(typeof (file))
          let fileInfo = {
            fileId: file[0],
            fileHash: file[1],
            fileDescription: file[5],
            fileName: file[4],
            fileSize: file[2],
            fileType: file[3],
            uploadTime: file[6],
            uploader: file[7]
          }

          console.log("File Hash:" + fileInfo.fileHash)
          // props.setFiles([...props.files,fileInfo]);
          setFiles([...files, fileInfo]);
          // props.setFiles([...props.files,file]);
          console.log("Files:" + files.length);
        }
      }
      else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
    // connectWallet();
    // displayFiles();
  }, [])

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <Navbar account={currentAccount} />
        <Body filestorageSM={filestorageSM} account={currentAccount} filescount={filescount} />
        {/* <List filestorageSM={filestorageSM} account={currentAccount} filescount={filescount} /> */}
        {!currentAccount && (
          <button onClick={connectWallet}>
            Connect Wallet
          </button>
        )}

        <form onSubmit={displayFiles}>
          <button>Show Files</button>
        </form>
        {files.map((fl, index) => {
          return (
            <div key={index} style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
              <div>File Hash: {fl.fileHash}</div>
              <div>File Name: {fl.fileName}</div>
              <div>Hello</div>
            </div>

          )
        })
        }
      </div>
    </div>
  );
}

export default App