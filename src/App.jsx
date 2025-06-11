import { useState, useEffect } from 'react'

import './App.css'

function App() {


const initialFormData = {

  autore:'',
  titolo:'',
  discrizione:'',
  pubblicazione:''

}


const [formData, setFormData] = useState(initialFormData)


// funzione cghe gestisce il Submit

const handleChange = (e) => {

  const { name, value } = e.target

  setFormData({ ...formData, [name]: value})
  console.log(name)
}

const sendData = (e) => {
  e.preventDefault()
  console.log(formData)
}



  return (
    <>
      <div className="container">
        <h1 className='my-3 text-center'>Primo Form di Prova</h1>
        <form onSubmit={sendData}>
          <div className="mb-3">
            <label htmlFor="autore" className="form-label">Autore</label>
            <input 
            type="text" 
            className="form-control" 
            // questi tre campi devono essere scritti così altrimenti non funziona 
            name = 'autore'
            value={formData.autore}
            onChange={handleChange}

             />
          </div>

          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  )
}

export default App
