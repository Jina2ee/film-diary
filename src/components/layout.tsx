import { Link, Outlet } from "react-router-dom"
import { styled } from "styled-components"

const Logo = styled.h1`
  text-align: center;
`

export default function Layout() {
  return (
    <div>
      <Link to='/'>
        <Logo>Films diary</Logo>
      </Link>
      <Outlet />
    </div>
  )
}
