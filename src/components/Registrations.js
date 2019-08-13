import React, { useEffect, useState } from 'react'
import registrationService from '../services/registration'

const Registrations = () => {
  const [regs, setRegs] = useState([])
  useEffect(() => {
    registrationService.current().then(registrations => {
      setRegs(registrations)
    })
  },
  [])

  if (regs.length===0) {
    return <div>
      no registrations
    </div>
  }

  const truncate = (title) => title

  const preferred_of = (reg) => {
    if (reg.preferred_topics.length===0) return null

    return (
      reg.preferred_topics.map(t =>
        <td key={t.content.title}>
          {truncate(t.content.title)}
        </td>
      )
    )
  }

  return (
    <div>
      <h3>
        Registrations {regs.length}
      </h3>

      <table>
        {regs.map(reg =>
          <tr key={reg.student_number}>
            <td>
              {reg.last_name}
            </td>
            <td>
              {reg.first_names}
            </td>
            <td>
              {reg.student_number}
            </td>
            <td>
              {reg.email}
            </td>
            {preferred_of(reg)}
          </tr>
        )}
      </table>
    </div>
  )
}

export default Registrations
