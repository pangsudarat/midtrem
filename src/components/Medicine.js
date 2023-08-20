import React, { useEffect } from "react";
import { useState } from "react";
import { TbCirclePlus, TbSearch } from "react-icons/tb";
import Addmidicine from "./Addmidicine";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../assets/js/firebase";
import Editmedicine from "./Editmedicine";

export default function Medicine() {
  const [keyword, setKeyword] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false)
  const [getmedicine, setGetmidicine] = useState([]);
  const [editid,setEditid] = useState("")
  const [isEdit,setIsEdit] = useState(false)
  const [nname, setNName] = useState("");

  useEffect (() => {
    onSnapshot(collection(db,"midicine"),(s)=>{
      setGetmidicine(
        s.docs.map((m) => {
          return ({
            id:m.id,data:m.data()
          })
        })
      )
    })
  },[]) 
  return (
    
        <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
      <div className="row" style={{ marginRight: 5 }}>
                    <div className="btn-group mb-3">

        <input
          type="text"
          className="form-control"
          placeholder="แก้ไข"
          aria-describedby="button-addon2"
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          onClick={() => {}}
        >
          <TbSearch style={{ fontSize: 20 }} />
        </button>
      </div>
      </div>
      <div
        className="row"
        style={{ paddingLeft: 10, paddingRight: 10, marginBottom: 10 }}
      >
        <a
          href="#"
          className="btn btn-success"
          style={{}}
          onClick={() => setOpenAddModal(true)}
        >
          <TbCirclePlus style={{ fontSize: 20 }} /> <b>เพิ่มข้อมูลยารักษา</b>
        </a>
      </div>
      </div>
      <div>
        {getmedicine.map((mdi) => {
          return (<div>
            {mdi.data.name}
            <button onClick={() => {
              setEditid(mdi.id)
              setNName(mdi.data.name)
              setIsEdit(true)
              console.log("fff")
            }}>แก้ไข</button>
            <button onClick={() => {
              deleteDoc(doc(db,"midicine",mdi.id))
            }}>ลบ</button>
          </div>)
        })}
      </div>
      {isEdit && <Editmedicine onClose={() => {setIsEdit(false)}} nameid={editid} open={isEdit} nname={nname}/>}
      {openAddModal &&
                <Addmidicine onClose={() => setOpenAddModal(false)} open={openAddModal}/>
            }
    </div>
  );
}
