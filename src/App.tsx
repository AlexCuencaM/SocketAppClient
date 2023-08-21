import React, { useEffect, useState } from 'react'
import './App.css'
import Connector from './SignalRConnection'
interface MessageProps {
    result:string;
    // index: number?;
}
const Message = (props: MessageProps) => {
    const {result} = props
    return (
        <>
            <span >Message: {result}</span><br></br>
        </>
    )
}

function App() {
  const [Msg, setMsg] = useState("")
  const [results, setResults] = useState<string[]>([])
  const { events, getChat } = Connector()
  useEffect(() => {
    events((message: string[]) => setResults([
        ...message
    ]));
  }, [results]);
  const handleMsg = (e: React.FormEvent<HTMLInputElement> ) => {
    setMsg(e.currentTarget.value);
  }
  const handleSubmit = () => {
    getChat([
        ...results, Msg
    ]);
  }
  return (
    <>
      <h1>User Chat App</h1>
      <p>Send a public Message :)</p>
      <input type='text' onChange={handleMsg}/>
      <button onClick={handleSubmit}>Submit</button>
      <p>Signalr Chat</p>
      <br></br>
      {results.map((result, index) => (
          <Message result={result} key={index}/>
      ))}
    </>
  )
}

export default App
