import React from 'react';
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

const Home = () => (
  <DefaultLayout>
    <HomePage />
  </DefaultLayout>
);
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/article">
          <Home />
        </Route>
        <Route exact path="/article/:id">
          <DefaultLayout>
            <ArticleDetail />
          </DefaultLayout>
        </Route>
        <Route exact path="/category">
          <DefaultLayout>
            <CategoryView />
          </DefaultLayout>
        </Route>
        <Route exact path="/tag">
          <DefaultLayout>
            <TagView />
          </DefaultLayout>
        </Route>
        <Route path="/about">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
