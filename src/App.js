import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import Landingpage from './containers/Landingpage';


class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Landingpage/>
        </Layout>
      </div>
    );
  }
}

export default App;
