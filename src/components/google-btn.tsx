import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth, db } from "../firebase"
import { useNavigate } from "react-router-dom"
import { FirebaseError } from "firebase/app"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { styled } from "styled-components"

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
`

export const Button = styled.span`
  background-color: white;
  font-weight: 500;
  width: 100%;
  color: black;
  padding: 10px;
  border-radius: 50px;
  border: 0;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`
export const Logo = styled.img`
  height: 25px;
`

export default function GoogleButton() {
  const navigate = useNavigate()
  const onClick = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const credentials = await signInWithPopup(auth, provider)

      // const documentRef = doc(db, "users", credentials.user.uid)
      // const userDoc = await getDoc(documentRef)
      // if (!userDoc.data()) {
      //   await setDoc(doc(db, "users", credentials.user.uid), {
      //     createdAt: Date.now(),
      //     uid: credentials.user.uid,
      //     name: credentials.user.displayName,
      //   })
      // }
      navigate("/")
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log("error", error)
      }
    }
  }
  return (
    <Button onClick={onClick}>
      <Logo src='/src/assets/google-logo.svg' />
      Continue with Google
    </Button>
  )
}
