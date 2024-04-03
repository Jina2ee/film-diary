// 날짜, 영화 정보 (이름, 이미지... ), 평점, 후기

import { useEffect, useState } from "react"
import Card from "../components/card"
import { styled } from "styled-components"
import { collection, doc, setDoc } from "firebase/firestore"
import { auth, db } from "../firebase"
import { useNavigate } from "react-router-dom"
import Rating from "../components/star-rating"

type FilmData = {
  page: number
  results: Film[]
  total_pages: number
  totla_results: number
}

type Film = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

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
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
      },
    }

    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${filmName}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        setFilmData(response)
      })
      .catch((err) => console.error(err))
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
    // films 안에 각각의 아이디를 가진 film이 생성되는게 아니라
    // 하나의 userId 를 가진 필름들이 생겨야한다.

    try {
      const filmsRef = doc(collection(db, "users", user?.uid, "films"))
      await setDoc(filmsRef, {
        createdAt: Date.now(),
        desc: description, // enter 처리 하기
        userId: user.uid,
        watchedDate: watchedDate, // date.now() 로 하면 시간이 넘어가서 날짜 선택되게끔 해야함
        film: {
          name: chosenFilm.title,
          imgUri: chosenFilm.poster_path,
          releasedDate: chosenFilm.release_date,
        },
        userRef: doc(db, "users", user.uid),
        score: ratingValue, //
      })
    } catch (error) {
      console.log(error)
    } finally {
      navigate("/")
    }
  }

  useEffect(() => {
    console.log("chosenFilm", chosenFilm)
  }, [chosenFilm])
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
