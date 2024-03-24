import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid" // a plugin!

export default function Calendar() {
  return (
    <FullCalendar
      height={"auto"}
      plugins={[dayGridPlugin]}
      initialView='dayGridMonth'
    />
  )
}
