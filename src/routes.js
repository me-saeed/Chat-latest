import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ContactPage from './pages/contact';
import AboutPage from './pages/about';
import FaqsPage from './pages/faqs';
import SupportPage from './pages/support';
import IndexPage from './pages';
import Chat from './pages/Chat';
import Admin from './pages/Admin';

import Blog from './pages/Blog';
import Newblog from './pages/Newblog';
import Calling from './pages/Calling';
import Dispatcher from './pages/Dispatcher';
import Caller from './pages/Caller';
import Reciever from './pages/Reciever';


import Vechile from './pages/Vechile';


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
          <Route exact path="/chat" component={Chat} />
          <Route exact path="/admin" component={Admin} />

          <Route exact path="/calling" component={Calling} />
          <Route exact path="/dispatcher" component={Dispatcher} />
          <Route exact path="/caller" component={Caller} />

          <Route exact path="/reciever" component={Reciever} />
          <Route exact path="/vechile" component={Vechile} />

        </Switch>
      </Router>
    );
  }
}

export default App;
