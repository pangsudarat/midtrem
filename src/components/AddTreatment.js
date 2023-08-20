import Modal from "./Modal"
import { useState, useEffect } from 'react'
import { db } from '../assets/js/firebase'
import { collection, addDoc, Timestamp, onSnapshot } from 'firebase/firestore'
import "../assets/css/addPet.css"

function AddTreatment({onClose, open, id}) {
  const [treatment, setTreatment] = useState('');
  const [medicine, setMedicine] = useState([]);
  const [smedicine, setSmedicine] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        addDoc(collection(db, "pets", id, "treatment"), {
            treatment: treatment,
            medicine:smedicine,
            created: Timestamp.now()
        })
        onClose()
    } catch (err) {
      alert(err)
    }
  }

  useEffect(() => {
    onSnapshot(collection(db,"midicine"),(s) => {
      setMedicine(
        s.docs.map(( mid) => {
          return {id:mid.id,data:mid.data()}
        })
      )
    })
  }, [])

  return (
    <Modal modalLable='เพิ่มประวัติการรักษา' onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className='addPet' name='addPet'>
        <select value={smedicine} onChange={(e) => setSmedicine(e.target.value)}>
          <option>เลือกยา</option>
          {medicine.map((med) => {
            return <option value={med.data.name}>{med.data.name} </option>
          })}
        </select>
        <textarea 
          onChange={(e) => setTreatment(e.target.value)}
          placeholder='รายละเอียด'
          value={treatment}></textarea>
        <button className="btn btn-success" type='submit'>บันทึก</button>
      </form> 
    </Modal>
  )
}

export default AddTreatment