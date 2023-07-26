import './App.css'
import Navbar from "./components/Navbar"
import Cards from './components/Cards'
import React from 'react'

export default function App() {
  const [createCards, setCards] = React.useState({})

  React.useEffect(function () {
    fetch("https://podcast-api.netlify.app/shows")
    .then(res => res.json())
    .then(data => setCards(data))
  }, [createCards])
  
//   // state object
// const [contact, setContact] = React.useState({
//   firstName: "Tshireletso",
//   lastName: "Mpudu",
//   phone: "+27 65 895 1817",
//   email: "tshirempudu@gamail.com",
//   isFavorite: false
// })

// // updating state object
// let starIcon = contact.isFavorite ? "star-filled.png" : "star-empty.png"
//  function toggleFavorite() {
//   setContact(prevContact => {
//     return{
//       ...prevContact,
//       isFavorite: !prevContact.isFavorite
//     }
//   })
// }

  return (
    <>
     <Navbar />
     <Cards />
    {/* <pre>{JSON.stringify(createCards, null, 2)}</pre>
    <main>
    <arcticle className="card">
    <img src="./images/user.png" className="user-image" onClick={toggleFavorite}/>
    <div className="card-info">
    <img src={`../images/star-filled.png`} className="empty-star" onClick={toggleFavorite}/>
    <h2 className="card-name">
      {contact.firstName} {contact.lastName}
    </h2>
    <p className="card-contact">{contact.phone}</p>
    <p className="card-contact">{contact.email}</p>
    </div>

    </arcticle>
    </main> */}
    </>
  )
}

