import React from "react";

type AppProps={
  greet: string
}

const App = ({greet}:AppProps)=>{
  return (<>
  <h1>{greet}</h1>
  <video
   src="http://localhost:8000/video"
   controls={true}
   />
  </>)
}

export default App;