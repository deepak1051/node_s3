import { useState } from 'react'


function App() {
  const [file, setFile] = useState(null)

  return (
    <>
      <div>
        File

        <input type="file"
          // value={file} 
          onChange={(e) => setFile(e.target.files[0])}

          accept='image/*'
        />
      </div>
    </>
  )
}

export default App
