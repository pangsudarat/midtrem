import Modal from "./Modal"
import { useState, useEffect } from 'react'
import { db } from '../assets/js/firebase'
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore'
import "../assets/css/addForm.css"


function Editmedicine({onClose, open,nname,nameid}) {
  const [name, setName] = useState(nname);

  /* function to add new Owner to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        updateDoc(doc(db, 'midicine',nameid), {
          name: name,
        })
        onClose()
    } catch (err) {
      alert(err)
    }
  }

  useEffect(() => {
  }, [])

  return (
    <Modal modalLable='เพิ่มข้อมูลยารักษา' onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className='addForm' name='addOwner'>
        <input 
          type='text' 
          name='name' 
          onChange={(e) => setName(e.target.value)} 
          value={name}
          placeholder='แก้ไข'/>
     
        <button className="btn btn-success" type='submit'>บันทึก</button>
        
      </form> 

    </Modal>
  )
}

export default Editmedicine