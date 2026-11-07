import { useEffect } from 'react'
import { CheckIcon, CloseIcon } from './Icons'

const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return

    const timer = window.setTimeout(onClose, 3400)
    return () => window.clearTimeout(timer)
  }, [toast, onClose])

  if (!toast) return null

  return (
    <div className="toast" role="status" aria-live="polite">
      <CheckIcon />
      <span>{toast.message}</span>
      <button type="button" onClick={onClose} aria-label="Fechar notificação">
        <CloseIcon />
      </button>
    </div>
  )
}

export default Toast
