import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { styled } from "styled-components"
import "./App.css"
import Login from "./routes/login"
import Home from "./routes/home"
import Create from "./routes/create"
import ProtectedRoute from "./components/protected-route"
import Layout from "./components/layout"
import DiaryView from "./routes/diary/[id]"

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "create",
        element: <Create />,
      },
      {
        path: "diary/:id",
        element: <DiaryView />,
      },
    ],
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
