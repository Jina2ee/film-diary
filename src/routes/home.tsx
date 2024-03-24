import Calendar from "../components/calendar"
import { auth } from "../firebase"

export default function Home() {
  const user = auth.currentUser
  return (
    <div>
      {user && <strong>{user?.displayName}</strong>}
      <Calendar />
    </div>
  )
}
