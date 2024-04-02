import { doc, getDoc } from "firebase/firestore"
import { useParams } from "react-router-dom"
import { auth, db } from "../../firebase"
import { useEffect, useState } from "react"

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
    <div>
      Diary View
      {information && (
        <div>
          <h1>{information.film.name}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w500/${information.film.imgUri}`}
            width='200'
            alt=''
          />
          <p>{information.desc}</p>
        </div>
      )}
    </div>
  )
}
