import React, {useEffect, useState} from "react";


function App() {
  const [dogs, setDogs] = useState([])
  const [activeDog, setActiveDog] = useState("")
  const [goodDogs, setGoodDogs] = useState(false)


  useEffect(() => {
    fetch("http://localhost:3001/pups")
   .then(resp => resp.json())
   .then(data => setDogs(data))

  }, [])

  const handleDogInfo = (dog) => {
    setActiveDog(dog)  
  }

  const handleDogChange = (id) => {
    fetch(`http://localhost:3001/pups/${activeDog.id}`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        isGoodDog: !activeDog.isGoodDog
      })
    })
    .then(resp => resp.json())
    .then(data => setActiveDog(data))

  }



const filteredDogs = dogs.filter(dog => dog.isGoodDog)

const handleGoodDogs = () => {
  setGoodDogs(!goodDogs)
}

  return (
    <div className="App">
      <div id="filter-div">
        <button onClick={handleGoodDogs} id="good-dog-filter">Filter good dogs:{goodDogs ? "ON" : "OFF"}</button>
      </div>
      <div id="dog-bar">
        {(goodDogs ? filteredDogs : dogs).map(dog => <span onClick={() => handleDogInfo(dog)}>{dog.name}</span>)}    
        
      </div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
          <img src={activeDog.image} alt={activeDog.name} />
          <h2>{activeDog.name}</h2>
          <button onClick={handleDogChange}>{activeDog.isGoodDog ? "Good Dog" : "Bad Dog"}</button>
        </div>

      </div>
    </div>
  );
}

export default App;
