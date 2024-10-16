import { useEffect } from 'react';
import './App.css';
const api = 'https://api.skilla.ru/mango/getList'
function App() {
useEffect(()=>{
  fetch(api, {
    method: 'POST',
    headers: { Authorization: 'Bearer testtoken'}
  }).then(response => response.json()).then(console.log).catch(console.error)
},[])

  return (
    <div className="App">
     
    </div>
  );
}

export default App;
