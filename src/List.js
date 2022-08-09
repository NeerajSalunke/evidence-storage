import React, { useEffect, useState } from "react";
import './App.css';
// import { ethers } from "ethers";
// import abi from "./utils/FileStorage.json";

function List(props) {

    var [files, setFiles] = useState([]);
    // const [filestorageSM, setfilestorageSM] = useState();   /* SM means smart contract */
    // const [filescount, setFilesCount] = useState();
    // const [currentAccount, setCurrentAccount] = useState("");

    // useEffect(() => {
    //     displayFiles();
    //     // getfilescount();
    // },[])

    // const[files,setFiles] = useState([]);

    // const getfilescount = async () => {
        
    //     const contractABI = abi.abi;
    //     const contractAddress = "0xbe3C0E8e5ACa33EaB9aa9a231F2FE991F40b12D0";
    //     try {
    //         const { ethereum } = window;

    //         if (!ethereum) {
    //             alert("Get MetaMask!");
    //             return;
    //         }

    //         const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    //         console.log("Connected", accounts[0]);
    //         // setCurrentAccount(accounts[0]);

    //         const provider = new ethers.providers.Web3Provider(ethereum);
    //         const signer = provider.getSigner();
    //         const Contract = new ethers.Contract(contractAddress, contractABI, signer);
    //         setfilestorageSM(Contract);

    //         const filecount = await Contract.fileCount();
    //         // const filecount = await filestorageSM.fileCount();
    //         console.log("File Count:", filecount.toNumber());
    //         setFilesCount(filecount);
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    const displayFiles = async () => {
        for (var i = props.filescount; i >= 1; i--) {
            const file = await props.filestorageSM.methods.files(i).call();
            // const file = await props.filestorageSM.files(i);
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


    return (
        <div>
            <form onSubmit={displayFiles}>
                <button>Show Files</button>
            </form>
            <table>
                <thead style={{ 'fontSize': '15px' }}>
                    <tr>
                        <th>Path</th>
                        <th>Description</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Type</th>
                        <th>Upload Time</th>
                        <th>Uploader</th>
                    </tr>
                </thead>
                {/* {files.map((fl, index) => {
                    return (


                        <tr key={index}>
                            <td>{fl.fileHash}</td>
                            <td>{fl.fileDescription}</td>
                            <td>{fl.fileId}</td>
                            <td>{fl.fileName}</td>
                            <td>{fl.fileSize}</td>
                            <td>{fl.fileType}</td>
                            <td>{fl.uploadTime}</td>
                            <td>{fl.uploader}</td>
                        </tr>
                        



                    )
                })
                } */}
            </table>
            {files.map((fl, index) => {
                return (
                    <div key={index} style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
                        <div>File Hash: {fl.fileHash}</div>
                        <div>File Name: {fl.fileName}</div>
                    </div>

                )
            })
            }
        </div>

    )
}

export default List;