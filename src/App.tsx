import { useEffect, useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import { styled } from "styled-components"
import Calendar from "./components/calendar"

const Wrapper = styled.div`
  background-color: aliceblue;
`

function App() {
  const [count, setCount] = useState(0)
  const [desc, setDesc] = useState("")
  const [slicedDesc, setSlicedDesc] = useState("")

  useEffect(() => {
    console.log("desc: ", desc.split("/n"))
  }, [desc])

  return (
    <>
      <Wrapper>
        <Calendar />
        <h1>{desc}</h1>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </Wrapper>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
