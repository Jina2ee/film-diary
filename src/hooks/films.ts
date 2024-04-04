import { makeAutoObservable } from "mobx"

class Films {
  constructor() {
    makeAutoObservable(this)
  }

  searchFilmsByKeywords(keywords: string) {
    return this.fetcher(keywords)
  }
  private async fetcher(keywords: string) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
      },
    }

    return await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${keywords}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        return res
      })
      .catch((err) => console.error(err))
  }
}

export const filmStore = new Films()
