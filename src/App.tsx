import React, { useState } from 'react'
import ContactList from './components/ContactList'
import ContactForm from './components/ContactForm'
import { Contact } from './types'
import contactsJson from './data/contacts.json'

export default function App() {
  const [contacts, setContats] = useState<Contact[]>(contactsJson as Contact[])
  const [editing, setEditing] = useState<Contact | null>(null)

  function handleSave(c: Contact) {
    if (contacts.some((x) => x.id === c.id)) {
      // update
      setContats((prev) => prev.map((p) => (p.id === c.id ? c : p)))
    } else {
      // add
      setContats((prev) => [c, ...prev])
    }
    setEditing(null)
  }

  function handleEdit(c: Contact) {
    setEditing(c)
  }

  function handleDelete(id: number) {
    setContats((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div className="container">
      <h1>Contact Manager</h1>
      <ContactForm key={editing?.id ?? 'new'} initial={editing ?? undefined} onSave={handleSave} onCancel={() => setEditing(null)} />
      <ContactList contacts={contacts} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  )
}
