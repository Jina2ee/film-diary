import { styled } from "styled-components"
import Calendar from "../components/calendar"
import { auth } from "../firebase"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { store } from "../hooks/store"

//

const Button = styled.button``

export default function Home() {
  const user = auth.currentUser
  const [films, setFilms] = useState<any>([])

  const fetchFilms = async () => {
    if (!user) return
    const data = await store.getAllMemories(user)

    setFilms(data)
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
