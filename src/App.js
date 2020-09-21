import React from 'react'
import './App.css'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

/**
 * Layout
 */

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

/**
 * Pages
 */
import DashBoard from './containers/DashBoard'
// import Widget from './containers/Widget';
import ChartWidget from './components/widgets/ChartWidget'
import ContractWidget from './components/widgets/ContractsWidget'
import SAPPriceWidget from './components/widgets/SAPPriceWidget'
import PriceWidget from './components/widgets/PriceMgmtWidget'
import CreateNew from './components/createNew/createNew'
import LoginForm from './components/createNew/LoginForm'

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={DashBoard} />{' '}
        <Route path="/widget/chart" component={ChartWidget} />{' '}
        <Route path="/login" component={LoginForm} />{' '}
        <Route path="/widget/contract" component={ContractWidget} />{' '}
        <Route path="/widget/sap" component={SAPPriceWidget} />{' '}
        <Route path="/widget/price" component={PriceWidget} />{' '}
        <Route path="/createNew" component={CreateNew} />{' '}
      </Switch>{' '}
      <Footer />
    </Router>
  )
}

export default App
