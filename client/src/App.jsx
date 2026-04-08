import { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);

  console.log(file);

  const handleSubmit = async () => {
    if (!file) return;
    try {
      const { data } = await axios.get('http://localhost:8000/api/upload');

      console.log(data);

      const resp = await axios.put(data.url, file, {
        headers: {
          "Content-Type": file.type
        }
      });


      console.log(resp);

    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <div>
        <h2>File</h2>

        <input
          type='file'
          // value={file}
          onChange={(e) => setFile(e.target.files[0])}
          accept='image/*'
        />

        <div>
          {file && (
            <div style={{ marginTop: '20px' }}>
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                width={200}
              />
            </div>
          )}
        </div>
      </div>

      <hr />
      <button onClick={() => setFile(null)}>Clear</button>
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}

export default App;
