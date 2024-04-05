import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore"
import { makeAutoObservable } from "mobx"
import { db } from "../firebase"
import { User } from "firebase/auth"

export type FilmData = {
  page: number
  results: Film[]
  total_pages: number
  totla_results: number
}

export type Film = {
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

class Store {
  constructor() {
    makeAutoObservable(this)
  }

  async getFilmById(user: User, id: string) {
    const filmQuery = doc(db, "users/" + user.uid + "/films/" + id)

    const snapshot = await getDoc(filmQuery)
    if (snapshot.exists()) {
      return snapshot.data()
    }
  }

  async getAllMemories(user: User) {
    const filmQuery = query(collection(db, "users/" + user.uid + "/films"))

    const snapshot = await getDocs(filmQuery)
    return await Promise.all(
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
  }

  async deleteMemory(user: User, id: string) {
    return await deleteDoc(doc(db, `users/${user.uid}/films`, id))
  }

  createFilmMemory(
    user: User,
    review: string,
    watchedDate: string,
    film: Film,
    score: number
  ) {
    return this.fetcher(user, review, watchedDate, film, score)
  }

  private async fetcher(
    user: User,
    review: string,
    watchedDate: string,
    film: Film,
    score: number
  ) {
    const filmsRef = doc(collection(db, "users", user.uid, "films"))
    return await setDoc(filmsRef, {
      createdAt: Date.now(),
      desc: review, // enter 처리 하기
      userId: user.uid,
      watchedDate: watchedDate, // date.now() 로 하면 시간이 넘어가서 날짜 선택되게끔 해야함
      film: {
        name: film.title,
        imgUri: film.poster_path,
        releasedDate: film.release_date,
      },
      userRef: doc(db, "users", user.uid),
      score: score, //
    })
  }
}

export const store = new Store()

// store / films 어떻게 잘 구분할건지 고민 필요
// 이름도 정체성 들어나게 수정 필요
// fetcher 를 사용할지에 대해서도 고민 필요
// 에러 핸들링 어떻게 할것인지도 고민 필요
