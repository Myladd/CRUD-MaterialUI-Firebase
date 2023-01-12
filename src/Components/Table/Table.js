import React, {useState, useEffect} from 'react'
import styled from "styled-components";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import {collection, getDocs, deleteDoc, doc, addDoc, serverTimestamp} from "firebase/firestore";
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {db, storage} from "../../firebase";
import DeleteLoading from "../Loading/DeleteLoading";
import SkeletonTable from "../Skeleton/Skeleton";
import WelcomeToast from "../Toast/WelcomeToast";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Loading from "../Loading/Loading";


const ProductTable = () => {
    const [data, setData] = useState([])
    const [file, setFile] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [dataId, setDataId] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [skeleton, setSkeleton] = useState(false)
    const [open, setOpen] = React.useState(false);
    const [isLoadingAdd, setIsLoadingAdd] = useState(false)
    const [resData, setResData] = useState("")
    const [addData, setAddData] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            setSkeleton(true)
            let list = []
            try {
                const querySnapshot = await getDocs(collection(db, "phones"));
                querySnapshot.forEach((doc) => {
                    list.push({id: doc.id, ...doc.data()})
                });
                setData(list)
                setSkeleton(false)
            }catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, []);

    // console.log(data)

    useEffect(() => {
        const uploadFile = () => {
            const name = new Date().getTime() + file.name
            const storageRef = ref(storage, name);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                            break
                    }
                },
                (error) => {
                    console.log(error)
                },
                () => {

                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImgUrl(downloadURL)
                    });
                }
            );
        }
        file && uploadFile()
    }, [file])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleInput = (e) => {
        const id = e.target.id
        const value = e.target.value

        setAddData({...addData, [id]: value})
    }

    // console.log(data);

    const handleSubmit = async () => {
        setIsLoadingAdd(true)
        // let i = 0
        try {
            const resData = await addDoc(collection(db, "phones"), {
                ...addData,
                image: imgUrl,
                timeStamp: serverTimestamp()
            })
            console.log(resData)
            setIsLoadingAdd(false)
            setOpen(false)
            setData(oldData => [
                ...oldData,
                addData
            ])
            // await setReRef(i++)
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = () => {
    }

    const handleDelete = async (id) => {
        setDataId(id)
        setIsLoading(true)
        try {
            await deleteDoc(doc(db, "phones", id));
            setIsLoading(false)
            setData(data.filter((item) => item.id !== id))
        }catch (e) {
            console.log(e)
        }
    }

    const Contain = styled.div`
        width: 100%;
      margin-top: 50px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `
    const TableAdmin = styled.div`
        margin-top: 100px;
        max-width: 850px;`
    return (
        <>
            <div style={{display:"flex", justifyContent:"center", marginTop:"50px", alignItems: "center"}}>
                {resData ? <WelcomeToast message={"Added successfully"}/> : null}
                <Button onClick={handleClickOpen} variant="contained" color="success">
                    Add
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add Product</DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{marginBottom: "15px"}}>
                            please add your new product information.
                        </DialogContentText>
                        <Stack spacing={4} style={{marginBottom: "30px"}}>
                            <TextField
                                onChange={(e) => setFile(e.target.files[0])}
                                autoFocus
                                margin="dense"
                                id="file"
                                label="Photo"
                                type="file"
                                fullWidth
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                onChange={handleInput}
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Name"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                onChange={handleInput}
                                autoFocus
                                margin="dense"
                                id="color"
                                label="Color"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                onChange={handleInput}
                                autoFocus
                                margin="dense"
                                id="storage"
                                label="Storage"
                                type="number"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                onChange={handleInput}
                                autoFocus
                                margin="dense"
                                id="price"
                                label="Price"
                                type="nember"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                onChange={handleInput}
                                autoFocus
                                margin="dense"
                                id="count"
                                label="Count"
                                type="number"
                                fullWidth
                                variant="standard"
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant="outlined" color="error">Cancel</Button>
                        {isLoadingAdd ? <Loading/> : <Button
                            onClick={handleSubmit}
                            type="submit"
                            variant="contained"
                            color="success"
                            // disabled={!isValid || !dirty}
                        >
                            Add
                        </Button>}
                    </DialogActions>
                </Dialog>
            </div>
            <Contain>
                <TableAdmin>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 800 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">#</TableCell>
                                    <TableCell align="center">Image</TableCell>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Color</TableCell>
                                    <TableCell align="center">Storage</TableCell>
                                    <TableCell align="center">Price $</TableCell>
                                    <TableCell align="center">Count</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {skeleton ? <SkeletonTable/> : data.map((product, i) => (
                                            <TableRow
                                                hover
                                                key={product.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row" align="center">{i+1}</TableCell>
                                                <TableCell align="center">
                                                    <img src={product.image} alt="img" width="50px"/>
                                                </TableCell>
                                                <TableCell align="center">{product.name}</TableCell>
                                                <TableCell align="center">{product.color}</TableCell>
                                                <TableCell align="center">{product.storage}</TableCell>
                                                <TableCell align="center">{product.price} $</TableCell>
                                                <TableCell align="center">{product.count}</TableCell>
                                                <TableCell align="center">
                                                    <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem/>} justifyContent="center">
                                                        <Button onClick={handleEdit} variant="contained" >Edit</Button>
                                                        {isLoading && product.id === dataId ? <DeleteLoading/> : <Button onClick={() => handleDelete(product.id)} variant="contained" color="error">Delete</Button>}
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TableAdmin>
            </Contain>
        </>
    )
}
export default ProductTable