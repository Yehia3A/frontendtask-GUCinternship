import React from 'react'
import { Contact } from '../types'

type Props = {
  contact: Contact
  onEdit?: (c: Contact) => void
  onDelete?: (id: number) => void
}

export default function ContactItem({ contact, onEdit, onDelete }: Props) {
  function handeleEdit() {
    onEdit && onEdit(contact)
  }

  function handeleDelete() {
    if (!onDelete) return
    if (!confirm(`Delete ${contact.name}?`)) return
    onDelete(contact.id)
  }

  return (
    <div className="contact-item" style={{ border: '2px solid #ffffff', padding: 8, marginBottom: 8 }}>
      <div style={{ paddingBottom: 4 }}>{contact.name}</div>
      <div>{contact.email}</div>
      <div>{contact.phone}</div>
      <div style={{ paddingBottom: 4 }}>{contact.category}</div>
      <div style={{ marginTop: 19 }}>
        <button onClick={handeleEdit}>Edit</button>
        <button onClick={handeleDelete} style={{ marginLeft: 8 }}>Delete</button>
      </div>
    </div>
  )
}
