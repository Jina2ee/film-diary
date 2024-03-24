import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { styled } from "styled-components"
import "./App.css"
import Login from "./routes/login"
import Home from "./routes/home"

const Wrapper = styled.div`
  background-color: aliceblue;
`

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
])

function App() {
  return (
    <Wrapper>
      <RouterProvider router={router} />
    </Wrapper>
  )
}

export default App
