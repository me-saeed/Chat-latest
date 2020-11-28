import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ContactPage from './pages/contact';
import AboutPage from './pages/about';
import FaqsPage from './pages/faqs';
import SupportPage from './pages/support';
import IndexPage from './pages';
import Chat from './pages/Chat';

import Blog from './pages/Blog';
import Newblog from './pages/Newblog';



class App extends Component {








  

  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/contact" component={ContactPage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/faqs" component={FaqsPage} />
          <Route exact path="/support" component={SupportPage} />

          <Route exact path="/blogs" component={Blog} />
          <Route exact path="/newblog" component={Newblog} />
          {/* <Route exact path="/chat" component={Chat} /> */}
          <Route exact path="/" component={Chat} />
        </Switch>
      </Router>
    );
  }
}

export default App;
