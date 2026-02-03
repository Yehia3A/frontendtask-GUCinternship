import React, { useEffect, useState } from 'react'
import { Contact } from '../types'

export type ContactFormFields = {
  name: string
  email: string
  phone: string
  category: Contact['category']
}

export type ContactFormErrors = Partial<Record<keyof ContactFormFields, string>>

export function validateContact(fields: ContactFormFields): ContactFormErrors {
  const { name, email, phone, category } = fields
  const errors: ContactFormErrors = {}

  if (!name || name.trim().length < 2) {
    errors.name = 'Enter a full name (at least 2 characters).'
  }

  const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
  if (!email) {
    errors.email = 'Email is required.'
  } else if (!emailRe.test(email)) {
    errors.email = 'Enter a valid email address (example: user@example.com).'
  }

  const phoneRe = /^[0-9+\-() ]{6,20}$/
  if (!phone) {
    errors.phone = 'Phone is required.'
  } else if (!phoneRe.test(phone)) {
    errors.phone = 'Enter a valid phone number (digits, +, - , parentheses allowed).'
  }

  
  return errors
}

type Props = {
  initial?: Partial<Contact>
  onSave: (c: Contact) => void
  onCancel?: () => void
}

export default function ContactForm({ initial, onSave, onCancel }: Props) {
  const [name, setNamee] = useState(initial?.name ?? '')
  const [email, setEmail] = useState(initial?.email ?? '')
  const [phone, setPhonee] = useState(initial?.phone ?? '')
  const [category, setCategory] = useState<Contact['category']>(
    (initial?.category as Contact['category']) ?? 'Personal'
  )

  const [errors, setErrors] = useState<{ [k: string]: string }>({})

  useEffect(() => {
    if (initial) {
      // small typo in variable name but used correctly
      setNamee(initial.name ?? '')
      setEmail(initial.email ?? '')
      setPhonee(initial.phone ?? '')
      setCategory((initial.category as Contact['category']) ?? 'Personal')
    }
  }, [initial])

  function validate() {
    const e = validateContact({ name, email, phone, category })
    setErrors(e as { [k: string]: string })
    return Object.keys(e).length === 0
  }

  function handleSubmit(ev?: React.FormEvent) {
    ev?.preventDefault()
    if (!validate()) return
    const newContact: Contact = {
      id: (initial && initial.id) || Date.now(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      category,
    }
    onSave(newContact)
  }

  return (
    <div className="component-box" style={{ marginBottom: 50, padding: 30, textAlign: 'center', maxWidth: 350, margin: '50px auto' }}>
      <h2>{initial ? 'Edit Contact' : 'Add Contact'}</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label>Name</label>
          <input value={name} onChange={(e) => setNamee(e.target.value)} />
          {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
        </div>

        <div>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
        </div>

        <div>
          <label>Phone</label>
          <input value={phone} onChange={(e) => setPhonee(e.target.value)} />
          {errors.phone && <div style={{ color: 'red' }}>{errors.phone}</div>}
        </div>

        <div>
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value as Contact['category'])}>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Family">Family</option>
          </select>
          {errors.category && <div style={{ color: 'red' }}>{errors.category}</div>}
        </div>

        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <button type="submit">Save</button>
          {onCancel && (
            <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
