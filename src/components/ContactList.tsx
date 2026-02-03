import React, { useMemo, useState } from 'react'
import { Contact } from '../types'
import ContactItem from './ContactItem'

type Props = {
  contacts: Contact[]
  onEdit: (c: Contact) => void
  onDelete: (id: number) => void
}

export default function ContactList({ contacts, onEdit, onDelete }: Props) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<'All' | Contact['category']>('All')

  const filtredContacts = useMemo(() => {
    return contacts.filter((c) => {
      if (category !== 'All' && c.category !== category) return false
      if (!query) return true
      return c.name.toLowerCase().includes(query.toLowerCase())
    })
  }, [contacts, query, category])

  return (
    <div className="component-box">
      <h2>Contacts</h2>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 17 }}>
        <input
          placeholder="Search by name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: 1, minWidth: 150 }}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value as any)}>
          <option value="All">All</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Family">Family</option>
        </select>
      </div>

      <div>
        {filtredContacts.length === 0 && <div>No contacts found.</div>}
        {filtredContacts.map((c) => (
          <ContactItem key={c.id} contact={c} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </div>
  )
}
