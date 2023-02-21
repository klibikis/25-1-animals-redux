import { useState, useEffect} from 'react'
import { useAppSelector, useAppDispatch } from './store/hooks'
import './App.scss'
import { addAnimal, deleteAnimal, saveAnimalsInLocalStorage, sortAnimals } from './store/counterSlice'

function App() {

  const dispatch = useAppDispatch()
  const [newAnimal, setNewAnimal] = useState("")
  const [animalImage, setAnimalImage] = useState("")
  
  const animal = useAppSelector((store) => {
    return store.animal.animals
  })
  const handleAddAnimal = () => {
    dispatch(addAnimal({animal: newAnimal, image: animalImage}))
    dispatch(saveAnimalsInLocalStorage());
    setNewAnimal('')
    setAnimalImage('')
  }
  useEffect(() => {
    dispatch(sortAnimals())
  }, [animal]);
  
  console.log(animal)

  return (
    <div className="appWrapper">
      <div className='wrapper'>
        <form 
          className='addForm'
          onSubmit={(e) => {
            e.preventDefault();
            handleAddAnimal()
          }}
        >
          <input 
            required
            type='text' 
            placeholder = "Animal" 
            className='input input--rounded'
            value = {newAnimal}
            onChange={(e) => {
              setNewAnimal(e.target.value)
            }}
            >
          </input>
          <input 
            required
            type='text' 
            placeholder = "Animal image" 
            className='input'
            value = {animalImage}
            onChange={(e) => {
              setAnimalImage(e.target.value)
            }}
            >
          </input>
          <button className='buttonAdd'>
            Add animal
          </button>
        </form>
      </div>
      <div className='animalWrapper'>
      {animal.map((animal) => {
        return (
          <div 
            key = {Math.random()}
            className = "singleAnimal"
            >
            <img src = {animal.image} alt = {animal.animal} className = "animalImage"/>
            <h1>{animal.animal}</h1>
            <button
              className='buttonAnimalDelete'
              onClick={() => {
                dispatch(deleteAnimal(animal.animal))
                dispatch(saveAnimalsInLocalStorage())
              }}
              >
                ✘
            </button>
          </div>
        )
      })}
      </div>
    </div>
    
  )
}

export default App
