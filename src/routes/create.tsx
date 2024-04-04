import { useState } from "react"
import Card from "../components/card"
import { styled } from "styled-components"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"
import Rating from "../components/star-rating"
import { filmStore } from "../hooks/films"
import { Film, FilmData, store } from "../hooks/store"

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
`

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 15px;
  background-color: gray;
`

export default function Create() {
  const navigate = useNavigate()
  const [watchedDate, setWatchedDate] = useState("")
  const [description, setDescription] = useState("")
  const [filmName, setFilmName] = useState("")
  const [filmData, setFilmData] = useState<FilmData | null>(null)
  const [chosenFilm, setChosenFilm] = useState<Film>()
  const [openModal, setOpenModal] = useState(false)
  const [ratingValue, setRatiginValue] = useState(0)

  const searchFilmData = async (e: React.MouseEvent<HTMLElement>) => {
    setOpenModal(true)
    e.preventDefault()
    const data = await filmStore.searchFilmsByKeywords(filmName)
    setFilmData(data)
  }

  const setCurrentFilm = (e: React.MouseEvent<HTMLElement>, film: Film) => {
    e.preventDefault()
    setChosenFilm(film)
    setOpenModal(false)
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const user = auth.currentUser
    if (!user || !chosenFilm) return alert("not user")

    try {
      await store.createFilmMemory(
        user,
        description,
        watchedDate,
        chosenFilm,
        ratingValue
      )
    } catch (error) {
      console.log(error)
    } finally {
      navigate("/")
    }
  }

  return (
    <FormWrapper onSubmit={submit}>
      <div>
        <label htmlFor='date'></label>
        <input
          type='date'
          id='date'
          onChange={(e) => setWatchedDate(e.target.value)}
        ></input>
      </div>
      <div>
        <label htmlFor='film-name'>name: </label>
        <input
          id='film-name'
          onChange={(e) => setFilmName(e.target.value)}
        ></input>
        <button onClick={searchFilmData}>Search film's name</button>
      </div>
      {/* Card 를 사용할수있을까..? */}
      {/* pagination 필요.. */}
      {chosenFilm && <Card film={chosenFilm} />}
      {/* 누르면 모달창 뜨고,, 오버레이 뒤에 깔리는... */}

      {openModal && filmData && (
        <CardWrapper>
          {filmData.results.map((result: Film) => {
            return (
              <button
                key={result.id}
                onClick={(e) => setCurrentFilm(e, result)}
              >
                <Card film={result} />
              </button>
            )
          })}
        </CardWrapper>
      )}
      {/* 수정 필요 */}
      <Rating
        change={(e: any) => setRatiginValue(e.target.value)}
        value={ratingValue}
        staticRating={false}
      />

      <textarea onChange={(e) => setDescription(e.target.value)}></textarea>
      <button>CREATE</button>
    </FormWrapper>
  )
}
