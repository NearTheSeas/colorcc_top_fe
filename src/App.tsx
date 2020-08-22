import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //  Link
} from 'react-router-dom';
import './App.less';
import DefaultLayout from '@/layouts/DefaultLayout';
import HomePage from '@/views/HomePage';
import CategoryView from '@/views/CategoryView';
import TagView from '@/views/TagView';
import ArticleDetail from '@/views/ArticleView';
import About from '@/views/About';
import { UserProvider } from '@/modules/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <DefaultLayout>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/article">
              <HomePage />
            </Route>
            <Route exact path="/article/:id">
              {/* <DefaultLayout> */}
              <ArticleDetail />
              {/* </DefaultLayout> */}
            </Route>
            <Route exact path="/category">
              {/* <DefaultLayout> */}
              <CategoryView />
              {/* </DefaultLayout> */}
            </Route>
            <Route exact path="/tag">
              {/* <DefaultLayout> */}
              <TagView />
              {/* </DefaultLayout> */}
            </Route>
            <Route path="/about">
              {/* <DefaultLayout> */}
              <About />
              {/* </DefaultLayout> */}
            </Route>
          </Switch>
        </DefaultLayout>
      </Router>
    </UserProvider>
  );
}

export default App;
