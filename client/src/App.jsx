import { useState } from 'react'


function App() {
  const [file, setFile] = useState(null)

  console.log(file)

  return (
    <>
      <div>
        <h2>File</h2>

        <input type="file"
          // value={file} 
          onChange={(e) => setFile(e.target.files[0])}

          accept='image/*'
        />


        <div>
          {file && (
            <div style={{ marginTop: '20px' }}>
              <img src={URL.createObjectURL(file)} alt={file.name} width={200} />
            </div>
          )}
        </div>

      </div>
    </>
  )
}

export default App
