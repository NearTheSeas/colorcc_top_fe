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
import Admin from '@/views/Admin';
import EditArticle from '@/views/Admin/EditArticle';
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
              <ArticleDetail />
            </Route>
            <Route exact path="/category">
              <CategoryView />
            </Route>
            <Route exact path="/tag">
              <TagView />
            </Route>
            <Route exact path="/admin">
              <Admin />
            </Route>
            <Route exact path="/admin/editarticle">
              <EditArticle />
            </Route>
            <Route path="/admin/editarticle/:id">
              <EditArticle />
            </Route>
          </Switch>
        </DefaultLayout>
      </Router>
    </UserProvider>
  );
}

export default App;
