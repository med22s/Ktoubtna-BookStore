import React from 'react'
import {Container} from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import BookDetails from './pages/BookDetails.js'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'


function App() {
  return (
    <Router>
      <Header/>
      <main className='py-3'>
        
          <Container>
            <Switch>
              <Route path='/' exact component={Home}></Route>
              <Route path='/book/:id' exact component={BookDetails}></Route>
            </Switch>
          </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;