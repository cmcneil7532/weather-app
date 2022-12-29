
import './App.css';
import moment from 'moment/moment';


function App() {
  return (
    <div className="app">
      <main>
        <div className='search-box'>
          <input className='search-bar'
          type='text'
          placeholder='Search...'>
          </input>
        </div>
        <div className='location-box'>
          <div className='location'>Ashburn, VA</div>
          <div className='date'>{moment().format('dddd, MMMM Do YYYY')}</div>
        </div>
        <div className='weather-box'>
          <div className='highlow'>
              High 19°F Low 9°F
          </div>
          <div className='temperature'>17°F</div>
          <div className='description'>Cloudy</div>
          
        </div>
      </main>
      


    </div>
  );
}

export default App;
