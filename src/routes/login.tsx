import { useState } from "react"
import { styled } from "styled-components"
import GoogleButton from "../components/google-btn"

const Wrapper = styled.div`
  text-align: center;
  padding: 0 25px;
`

const Logo = styled.h1`
  font-size: 40px;
  margin: 0;
`

const FormWrapper = styled.div`
  border: 2px solid black;
  height: 220px;
  padding: 24px;
  background-color: #fafaf5;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  & div {
    margin-bottom: 16px;
  }
`

const Title = styled.span`
  text-align: left;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
`

const InputWrapper = styled.div`
  display: flex;
`

const Label = styled.label`
  font-size: 15px;
  font-weight: 600;
`

const Input = styled.input`
  width: 100%;
`

const Button = styled.button`
  margin-top: 4px;
  background-color: #5551ff;
  font-size: 16px;
  font-weight: 600;
  color: white;
  border: none;
  height: 48px;
  border-radius: 4px;
`

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("submit!: ", email, password)
  }
  return (
    <Wrapper>
      <Logo className='kranky-regular'>FILMS DIARY</Logo>
      <FormWrapper>
        <Form onSubmit={login}>
          <Title className='inter'>Hello, Dear...</Title>
          <InputWrapper>
            <Label htmlFor='email' className='inter'>
              EMAIL
            </Label>
            <Input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor='password'>PW</Label>
            <Input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
          </InputWrapper>
          <Button className='inter'>LOGIN</Button>
        </Form>
        <GoogleButton />
      </FormWrapper>
    </Wrapper>
  )
}
