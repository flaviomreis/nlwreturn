import { useState } from 'react'

interface ButtonProps {
  text?: string;
}

function Button(props: ButtonProps) {
  return <button className='bg-violet-500 px-4 h-10 rounded hover:bg-violet-700 transition-colors'>{props.text ?? 'Undefined'}</button>
}

function App() {
  return (
    <div className="flex gap-2">
    <Button text="Enviar"/>
    <Button text="Cancelar"/>
    <Button />
    </div>
  )
}

export default App
