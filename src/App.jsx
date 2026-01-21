import { useCallback, useEffect, useState, useRef } from 'react'

function App() {
  const [length,setLength]=useState(8)
  const [numberAllowed,setNumberAllowed]=useState(false)
  const [charAllowed,setCharAllowed]=useState(false)
  const [password,setPassword]=useState("")

  const passwordRef = useRef(null)

  const copyPasswordToClipboard=useCallback(()=>{
    window.navigator.clipboard.writeText(password)
    document.querySelector('#copy-btn').innerHTML="copied!"

  },[password])

  const passwordGenerator=useCallback(()=>{
    let str="QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"
    let pass=""

    if(numberAllowed) str+="1234567890"
    if(charAllowed) str+="~!@#$%^&*()_+<>?:{}"

    for(let i=0;i<length;i++){
      let char=Math.floor(Math.random()*str.length)
      pass+=str[char]
    }

    setPassword(pass)

  },[length,numberAllowed,charAllowed])

  useEffect(()=>{
    passwordGenerator()
  },[passwordGenerator])

  return (
    <>
      <div className="w-full h-screen max-w-md mx-auto shadom-md rounded-lg px-4 my-8 text-orange-500 bg-gray-500 text-center">
        <div className='className:flex shadow rounded-lg overflwo-hidden mb-4'>
          <h1 className='text-white text-xl text-center'>password Generator</h1>

          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3 mt-4 rounded-md'
            readOnly
            ref={passwordRef}
          />

          <button
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
            onClick={copyPasswordToClipboard}
            id='copy-btn'
          >
            copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex item-center gap-x-l">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e)=>{setLength(Number(e.target.value))}}
            />
            <label>Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-l px-0.9">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={()=>setNumberAllowed(prev=>!prev)}
            />
            <label htmlFor="numberInput">numbers allowed</label>

            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id='charInput'
              onChange={()=>setCharAllowed(prev=>!prev)}
            />
            <label htmlFor="charInput">charAllowed</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
