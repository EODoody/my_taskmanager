import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Confirm.module.css'

export default function AccountConfirm() {
  const navigate = useNavigate()
  const [code, setCode] = useState('')

  const codeHandler = (event) => {
    setCode(event.target.value)
  }

  async function confirmRequest() {
    try {
      await fetch('http://localhost:80/my-taskmanager/api/confirm', {
        method: 'POST',
        body: JSON.stringify({
          code: code,
        }),
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
        .then((respose) => {
          if (respose.ok) {
            return respose.json()
          }
          throw new Error('error')
        })
        .then((data) => {
          if (data.status === 1) {
            navigate('/')
          } else {
            //set error
          }
        })
    } catch (error) {
      console.log(error.message)
    }
  }

  const submitHandler = (event) => {
    event.preventDefault()
    confirmRequest()
  }

  return (
    <div className={styles.container}>
      <div style={{display: "flex"}}> <p>A code has been sent to your email address.
    Please enter it below to confirm your account.</p></div>
  

  <form className="register-form" onSubmit={submitHandler}>
    <h2>Confirm Code</h2>
    <label>Code</label>
    <input type="text" value={code} onChange={codeHandler} />
    <button>Confirm</button>
  </form>
</div>
  )
}
