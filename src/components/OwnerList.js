import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, where, deleteDoc, getDocs } from "firebase/firestore"
import { db } from "../assets/js/firebase";
import { TbCirclePlus,TbSearch } from "react-icons/tb";
import AddOwner from './AddOwner';

function OwnerList() {
    const [openAddModal, setOpenAddModal] = useState(false)
    const [owners, setOwners] = useState([]);
    const [keyword, setKeyword] = useState("")

    const handleSearch = (keyword) => {
        if(keyword) {
            const q = query(collection(db, 'owners'), 
            where('name', '>=', keyword),
            where  ('name', '<=', keyword +  '\uf8ff'))
            onSnapshot(q, (querySnapshot) => {
                setOwners(querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
        } else {
            const q = query(collection(db, 'owners'), orderBy('name', 'asc'))
            onSnapshot(q, (querySnapshot) => {
                setOwners(querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })

        }
    }

    useEffect(() => {
        const q = query(collection(db, 'owners'), orderBy('name', 'asc'))
        onSnapshot(q, (querySnapshot) => {
            setOwners(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
                petlen:false

            })))
        })
    },[])


    useEffect (() => {
        if(owners.length){
            owners.map( async(o,i) => {
                let q = query(collection(db,"pets"),where("owner","==", o.id))
                let c = await getDocs (q)
                owners[i].petlen = c.docs.length
                setOwners([...owners])
            } )
        }
    },[owners])


    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'row'}}>
            <div className="row" style={{ marginRight: 5 }}>
                    <div className="btn-group mb-3">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="ค้นหารายชื่อ" 
                            aria-describedby="button-addon2"
                            onChange={(e) => setKeyword(e.target.value)} 
                            value={keyword} />
                        <button 
                            className="btn btn-outline-secondary" 
                            type="button" 
                            id="button-addon2"
                            onClick={() => handleSearch(keyword)}><TbSearch style={{ fontSize: 20 }} /></button>
                    </div>
                </div>
                <div className="row" style={{ paddingLeft:10, paddingRight: 10, marginBottom: 10 }}>
                    <a href="#" className="btn btn-success" style={{  }} onClick={() => setOpenAddModal(true)}>
                        <TbCirclePlus style={{ fontSize: 20 }} /> <b>เพิ่มข้อมูลเจ้าของ</b>
                    </a>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row'}}>
                <ul class="list-group" style={{ width: 200 }}>
                {
                    owners?.map((owner, i) => (
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                        {owner.data.name}
                        <span class="badge bg-primary rounded-pill">{owner.petlen}</span>
                        <button onClick={() => {
                        }}> ลบ </button>
                    </li>
                    ))
                }
                </ul>
            </div>
            {openAddModal &&
                <AddOwner onClose={() => setOpenAddModal(false)} open={openAddModal}/>
            }
        </div>
    )
}

export default OwnerList;