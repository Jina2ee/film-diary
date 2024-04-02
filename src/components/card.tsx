export default function Card(props: any) {
  const { film } = props
  // 이미지 없을때 처리 필요
  return (
    <div key={film.id}>
      <strong>{film.title}</strong>
      <img
        src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
        width='200'
        alt=''
      />
      {/* <img src={result.poster_path} alt='' /> */}
    </div>
  )
}
