import logo from './logo.svg';
import './App.css';
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import {useEffect , useState} from 'react';
import Details from './components/Details';
function App() {
  
  const [countries , setCountries] = useState([]);
  const [from , setfromConverter] = useState();
  const [to , setToconverter] = useState();
  const takeFromValue = (event)=>{
    setfromConverter(event.target.value)
}
const takeToValue = (event)=>{
  setToconverter(event.target.value)
}

useEffect(()=>{
        
       
  var myHeaders = new Headers();
  myHeaders.append("apikey", "wgzCbOBpGh3Ax8sZtTbSgme4DIPoHgrq");

  var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
  };

  fetch("https://api.apilayer.com/fixer/symbols", requestOptions)
  .then(response => response.json())
  .then(result => {

    console.log(result);


      const allData = Object.entries(result.symbols).map((e) => ( { 
          symbol : e[0] ,
          country: e[1] 
      } ));
      

      setCountries(allData);


  })
  .catch(error => console.log('error', error));


}, []);




  return (
    <BrowserRouter>
    <div className="page-wrapper">
      <Header />
      <Routes>
          <Route path='/' element={<Home from={from}
          takeFromValue={takeFromValue}
          to={to}
          takeToValue={takeToValue}
          countries={countries}
setCountries={setCountries} setfromConverter={setfromConverter}
setToconverter={setToconverter}/>}/>
          <Route path='/details/:from/:to' element={<Details from={from}
          takeFromValue={takeFromValue}
          to={to}
          takeToValue={takeToValue}
          countries={countries}
          setCountries={setCountries}/>}/>
      </Routes>
      <Footer />
    </div>
      </BrowserRouter>

   
  );
}

export default App;
