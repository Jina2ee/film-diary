import { doc, getDoc } from "firebase/firestore"
import { useParams } from "react-router-dom"
import { auth, db } from "../../firebase"
import { useEffect, useState } from "react"
import Rating from "../../components/star-rating"
import { styled } from "styled-components"

const Wrapper = styled.div`
  margin: 0 auto;
  text-align: center;
`

export default function DiaryView() {
  let [information, setInformation] = useState<any>()
  const user = auth.currentUser
  const params = useParams()
  console.log(params)

  const fetchFilm = async () => {
    if (!user) return
    const filmQuery = doc(db, "users/" + user?.uid + "/films/" + params.id)

    const snapshot = await getDoc(filmQuery)
    if (snapshot.exists()) {
      setInformation(snapshot.data())
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
        </div>
      )}
    </Wrapper>
  )
}
