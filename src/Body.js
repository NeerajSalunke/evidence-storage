import React, { useState } from "react";
import { ethers } from "ethers";
import abi from "./utils/FileStorage.json";
// import {Component} from "react";
// import ReactTable from "react-table"; 
// import "react-table/react-table.css";   
import './App.css';
// import { create } from 'ipfs-http-client';
import { Web3Storage } from 'web3.storage';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDhFRWZENjFGMmZDOTBFRmM5RWNFODgxN2MwMTUzMGFhMmYzRDIwRTQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjQyMTE5MzA0NzQsIm5hbWUiOiJFdmlkZW5jZS1zdG9yYWdlMSJ9.ZV7Wp9JmwaJO3r-mfEG3l7SMYq0xfKdXk7r3E10uTCo'
// const ipfsClient = require("ipfs-http-client")
// const projectId = '2FJKIcxCGcZARZrHr23KgHTf3tT'
// const projectSecret = '47453966ffcb91c9e829b9c2411f82c5'
// var buffer = window.buffer;
// console.log("buffer", buffer)
// const auth = 'Basic ' + buffer.Buffer.from(projectId + ':' + projectSecret).toString('base64');
// const auth = 'Basic ' + (projectId + ':' + projectSecret).toString('base64');
// const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https',headers: {authorization: auth} })
// const ipfs = create({ host: 'filecoin.infura.io', port: 5001, protocol: 'https',headers: {authorization: auth} })

// const ipfs = create({ host: 'ipfs.infura.io', port: 5001, apiPath: '/api/v0' })

// const {create} = require('ipfs-http-client')
// const ipfs = create({host:'ipfs.infura.io',port:5001,protocol:'https'})



const Body = ({ /* filestorageSM, */ account, filescount }) => {
  /* const [files,setFiles] = useState([{
    path: 1,
    size: 2,
    type: "pdf",
    name: "neeraj",
    description: "Hello"
  }]); */

  // const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
  // const ipfs = create({ host: 'filecoin.infura.io', port: 5001, protocol: 'https',headers: {authorization: auth} })

  const storage = new Web3Storage({ token });
  // let police=true;
  const [buffer, setBuffer] = useState("");
  // const [type, setType] = useState("");
  // const [name, setName] = useState("");
  const [filestorageSM, setfilestorageSM] = useState();   /* SM means smart contract */
  // const [filescount, setFilesCount] = useState();
  const [currentAccount, setCurrentAccount] = useState("");

  const contractABI = abi.abi;
  // const contractAddress = "0xbe3C0E8e5ACa33EaB9aa9a231F2FE991F40b12D0";
  const contractAddress = "0xb87411E6255B292c67523A18B840735A5553cC69";

  const captureFile = async (e) => {
    e.preventDefault()
    const fileInput = document.querySelector('input[type="file"]');
    const rootCid = await storage.put(fileInput.files);
    console.log(rootCid);
    console.log("To open uploaded file, click on: https://dweb.link/ipfs/" + rootCid);
    setBuffer(rootCid);
    // setBuffer(reader.result)
    // setType(fileInput.type)
    // setName(fileInput.name)
    // let description = "a file";
    // let fileSize = 10;
    // let fileType = "photo";
    // let fileName = "Name";
    // let trial = await filestorageSM.fileCount();
    // console.log("trial fileCount",trial.toNumber())
    // await filestorageSM.uploadFile(rootCid, fileSize, fileType, fileName, description);
    
    // await filestorageSM.uploadFile(rootCid, fileSize, type, name, description);


    /* const file = e.target.files[0]
    const reader = new window.FileReader()

    reader.readAsArrayBuffer(file) //The FileReader interface's readAsArrayBuffer() method is used to start reading the contents of a specified Blob or File.
    reader.onloadend = () => {     //When the read operation is finished, the readyState becomes DONE, and the loadend is triggered.
      // setBuffer(Buffer(reader.result))
      setBuffer(reader.result)
      setType(file.type)
      setName(file.name)
    } */

    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      /* if(accounts[0]==="0x42e7df482493b0793ab3e4fa58d85e74f4739910") police=true
      else police=false
      console.log("Police:",police) */
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const Contract = new ethers.Contract(contractAddress, contractABI, signer);
      setfilestorageSM(Contract);

      const filecount = await Contract.fileCount();
      // const filecount = await filestorageSM.fileCount();
      console.log("File Count:",filecount.toNumber());
      // setFilesCount(filecount);
    } catch (error) {
      console.log(error)
    }
    // afterUpload();
  }
  const onsubmit = async (e) => {
    e.preventDefault();
    let description = "a file";
    let fileSize = 10;
    let fileType = "photo";
    let caseid=document.querySelector('input[name="case"]');
    let caseidvalue=caseid.value;
    let fileName = caseidvalue;
    // let fileName = "Name 2";
    console.log(caseidvalue);
    const trial = await filestorageSM.fileCount();
    console.log("Inside afterUpload, trial:",trial.toNumber());
    try{
      await filestorageSM.uploadFile(buffer, fileSize, fileType, fileName, description);
    }
    catch(e)
    {
      console.log("Error:",e)
    }
  }


  // console.log('buffer:', buffer)
  // console.log('type:', type)
  // console.log('name:', name)


  //here i define a function onsubmit
  // const onsubmit = async (e) => { //We have declared "ipfs.add" to await. This means it will stop for till "ipfs.add" doesn't complete execution. i.e. why i declared onSubmit as async function.
  //   e.preventDefault();

  //   console.log("Submitting file to IPFS...");
  //   // console.log(filestorageSM.methods.fileCount());

  //   //below commented block of code is outdated
  //   /* ipfs.add(buffer,(error,result)=>{ //when we send buffer, we can get error or unique hash in return.  
  //     if(error)
  //     {
  //       return console.log(error)
  //     }
  //     else
  //     {
  //       console.log(result)
  //     }
  //   }) */



  //   //add file to the ipfs
  //   if (buffer) //if any file is uploaded
  //   {
  //     try {
  //       const result = await ipfs.add(buffer)
  //       console.log("IPFS result:", result);
  //       console.log("To open uploaded file, click on: https://ipfs.infura.io/ipfs/" + result.path)

  //       let description = "a file";
  //       // await filestorageSM.methods.uploadFile(result.path, result.size, type, name, description).send({ from: account }).on("transactionHash", () => {
  //       //   console.log("Successfully ran");

  //       // }).on('error', console.error)

  //       await filestorageSM.uploadFile(result.path, result.size, type, name, description);

  //       /* const myFile = {
  //         path: result.path,
  //         size: result.size,
  //         type: type,
  //         name: name,
  //         description: description
  //       }
  //       console.log("Object1:"+myFile.path);
  //       console.log("Object1:"+myFile.size);
  //       console.log("Object1:"+myFile.type);
  //       console.log("Object1:"+myFile.name);
  //       console.log("Object1:"+myFile.description);
  //       setFiles([...files,myFile]); */

  //     }
  //     catch (e) {
  //       console.log("Error:", e);
  //     }
  //   }
  //   else {
  //     alert("No files submitted. Please try again.");
  //     console.log('ERROR: No data to submit');
  //   }
  // }

  /* const columns = [{  
    Header: 'Path',  
    accessor: 'path'  
    },
    {  
    Header: 'Size',  
    accessor: 'size'  
    },
    {  
      Header: 'Type',  
      accessor: 'type'  
    },
    {  
      Header: 'Name',  
      accessor: 'name'  
    },
    {  
      Header: 'Description',  
      accessor: 'description'  
    }] */
    
  return (
    <>
      {
        account==="0x42e7df482493b0793ab3e4fa58d85e74f4739910" && (
          
        
      <form className="center" onSubmit={onsubmit}>
        <input id="custom-file-upload" type="file" onChange={captureFile} />
        <div>
          <label for="case">Case ID:</label>
          <input type="text" id="case" name="case"></input>
        </div>
        {
          account==="0x42e7df482493b0793ab3e4fa58d85e74f4739910" && (
          <button type="submit">Upload</button>)
        }
        {/* {
          police &&(
          <button type="submit">Upload</button>)
        } */}
      </form>)
      }
      {/* <input type="file" onChange={captureFile} /> */} 

      {/* <div>  
          <ReactTable  
              data={files}  
              columns={columns}  
              defaultPageSize = {2}  
              pageSizeOptions = {[2,4, 6]}  
          />  
        </div> */}


    </>
  )
};

export default Body;