import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';


function App() {

  const privacy = ['Privato', 'Pubblico'];

  const initialFormData = {

    autore: '',
    titolo: '',
    descrizione: '',
    pubblicazione: 'Privato',
    termini: false

  }


  const [formData, setFormData] = useState(initialFormData)
  const [showSuccess, setshowSuccess] = useState(false)
  const [showAlert, setshowAlert] = useState(false)


  // funzione cghe gestisce il Submit

  const handleChange = (e) => {

    const { name, value, checked, type } = e.target;

    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value }

    )

    // const { name: x, value } = e.target;
    // setFormData({ ...formData, [x]: value }) 
    // // avendo a che fare con una destrutturazione siamo legati al fatto che il name dovrà sempre essere name e value uguale (perchè è il nome che hanno in e.taget) con i : cambiamo i nomi delle variabili destrutturate
    // console.log(formData)

  }



  const sendData = (e) => {
    e.preventDefault()
    console.log(formData)

    axios
      .post('https://67c5b4f3351c081993fb1ab6.mockapi.io/api/posts', formData)
      .then((resp) => {
        if (resp.data.id) {
          setshowSuccess(true)
          setFormData(initialFormData)
        } else {
          setshowAlert(true)
        }

      })

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
              placeholder='...autore'
              // questi tre campi devono essere scritti così altrimenti non funziona 
              name='autore'
              value={formData.autore}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="autore" className="form-label">Titolo</label>
            <input
              type="text"
              className="form-control"
              name='titolo'
              placeholder='.. titolo'
              value={formData.titolo}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="autore" className="form-label">Descrizione</label>
            <textarea
              type="text"
              placeholder='... inserisci la descrizione'
              className="form-control"
              name='descrizione'
              value={formData.descrizione}
              onChange={handleChange}
            />
          </div>

          <div className='row mx-1 my-4'>
            {privacy.map((currElement, index) => (
              <div key={index} className="mb-3 col-3 form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="pubblicazione"
                  id={currElement}
                  value={currElement}
                  checked={formData.pubblicazione === currElement}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">{currElement}</label>
              </div>
            ))}
          </div>
          <div className="mb-5 form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="termini"
              value={formData.termini}
              checked={formData.termini}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">accetta i termini ...</label>
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>

        </form>

        {showSuccess && 
        <div className="alert alert-success my-5">
          I dati sono stai inviati con SUCCESSO
        </div>}

        {showAlert && 
        <div className="alert alert-danger my-5">
          Riprova più tardi ...
        </div>}

      </div>
    </>
  )
}

export default App