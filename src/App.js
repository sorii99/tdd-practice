import { useState } from 'react';
import './App.css';
import axios from 'axios';
import { IoPlay } from 'react-icons/io5'

function App() {

  const [search, setSearch] = useState('');
  const [list, setList] = useState([]);

  const handleSearch = () => {
    const url = `https://at1.api.radio-browser.info/json/stations/byname/${search}`;
    axios.get(url)
      .then(r => setList(r.data))
      .catch(e => console.error(e))
  }

  const playRadio = (radio) => {
    const audio = new Audio(radio.url);
    audio.play();
  }

  return (
    <div className="App">
      <h1>Welcome to <span>Radiuus</span></h1>

      <div>
        <input type='text'
          placeholder='Search station name'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {list.length > 0 && <div aria-label='length-not-null'></div>}

      <section aria-label='station-list'>
        {list.map((station, index) => (
          <div key={index}>
            {station.name}
            <IoPlay style={{ cursor: 'pointer' }} onClick={() => playRadio(station)} />
          </div>
        )
        )}
      </section>
    </div>
  );
}

export default App;
