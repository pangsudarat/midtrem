import Modal from "./Modal"
import { useState, useEffect } from 'react'
import { db } from '../assets/js/firebase'
import { collection, addDoc } from 'firebase/firestore'
import "../assets/css/addForm.css"

function AddOwner({onClose, open}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  /* function to add new Owner to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        addDoc(collection(db, 'owners'), {
          name: name,
          description: description,
        })
        onClose()
    } catch (err) {
      alert(err)
    }
  }

  useEffect(() => {
  }, [])

  return (
    <Modal modalLable='เพิ่มข้อมูลเจ้าของ' onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className='addForm' name='addOwner'>
        <input 
          type='text' 
          name='name' 
          onChange={(e) => setName(e.target.value)} 
          value={name}
          placeholder='กรอกชื่อเจ้าของ'/>
        <textarea
        onChange={(e) => setDescription(e.target.value)}
         placeholder='รายละเอียด'
         value={description}></textarea>
        <button className="btn btn-success" type='submit'>บันทึก</button>
      </form> 
    </Modal>
  )
}

export default AddOwner