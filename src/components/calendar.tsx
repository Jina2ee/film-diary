import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid" // a plugin!
import { useNavigate } from "react-router-dom"

export default function Calendar({ films }: any) {
  const navigate = useNavigate()
  const eventClick = (id: string) => {
    navigate("/diary/" + id)
  }
  return (
    <FullCalendar
      height={"auto"}
      plugins={[dayGridPlugin]}
      initialView='dayGridMonth'
      events={films}
      eventClick={(e) => eventClick(e.event.id)}
    />
  )
}
