import { styled } from "styled-components"
import Calendar from "../components/calendar"
import { auth, db } from "../firebase"
import { Link } from "react-router-dom"
import { collection, getDocs, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"

//

const Button = styled.button``

export default function Home() {
  const user = auth.currentUser
  const [films, setFilms] = useState<any>([])

  const fetchFilms = async () => {
    const filmQuery = query(collection(db, "users/" + user?.uid + "/films"))

    const snapshot = await getDocs(filmQuery)
    const films = await Promise.all(
      snapshot.docs.map(
        async (doc) => {
          const { film, watchedDate } = doc.data()
          return {
            title: film.name,
            date: watchedDate,
            id: doc.id,
          }
        },
        {
          onlyOnce: true,
        }
      )
    )
    console.log("after films", films)
    setFilms(films)
  }

  useEffect(() => {
    fetchFilms()
  }, [])

  return (
    <div>
      {user && <strong>{user?.displayName}</strong>}
      <Link to='/create'>
        <Button>Create</Button>
      </Link>
      <Calendar films={films} />
    </div>
  )
}
