import { DocumentData, deleteDoc, doc } from "firebase/firestore"
import { useNavigate, useParams } from "react-router-dom"
import { auth, db } from "../../firebase"
import { useEffect, useState } from "react"
import Rating from "../../components/star-rating"
import { styled } from "styled-components"
import { store } from "../../hooks/store"

const Wrapper = styled.div`
  margin: 0 auto;
  text-align: center;
`

export default function DiaryView() {
  let [information, setInformation] = useState<DocumentData>()
  const user = auth.currentUser
  const params = useParams()
  const navigate = useNavigate()

  const fetchFilm = async () => {
    if (!user || !params.id) return
    const data = await store.getFilmById(user, params.id)
    setInformation(data)
  }

  const deleteFilm = async () => {
    const ok = confirm("Are you sure you want to delete this tweet?")
    if (!ok || !user || !params.id) return

    try {
      await store.deleteMemory(user, params.id)
      navigate("/")
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchFilm()
  }, [])

  return (
    <Wrapper>
      Diary View
      {information && (
        <div>
          <h1>{information.film.name}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w500/${information.film.imgUri}`}
            width='200'
            alt=''
          />
          <Rating
            change={() => console.log("")}
            value={information.score}
            staticRating={true}
          />
          <p>{information.desc}</p>
          <div>
            <button>EDIT</button>
            <button onClick={deleteFilm}>DELETE</button>
          </div>
        </div>
      )}
    </Wrapper>
  )
}
