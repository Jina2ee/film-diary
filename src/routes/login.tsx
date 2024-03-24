import { useState } from "react"
import { styled } from "styled-components"
import GoogleButton from "../components/google-btn"

const Wrapper = styled.div``

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("submit!: ", email, password)
  }
  return (
    <Wrapper>
      <form onSubmit={login}>
        <label htmlFor='email'>EMAIL:</label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label htmlFor='password'>PW:</label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button>LOGIN</button>
      </form>
      <GoogleButton />
    </Wrapper>
  )
}
