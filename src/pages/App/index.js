import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { routes } from './routes';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Notification from '../../components/Notification';
import { useSelector } from 'react-redux';

const privateRoutes = routes
  .filter((route) => route.auth)
  .map((route) => (
    <Route path={route.path} element={route.component} key={route.id} />
  ));
const publicRoutes = routes
  .filter((route) => !route.auth)
  .map((route) => (
    <Route path={route.path} element={route.component} key={route.id} />
  ));

const App = () => {
  const isAuth = useSelector((state) => state.login.user);

  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute isAuth={isAuth} />}>
          {privateRoutes}
        </Route>
        <Route element={<PublicRoute isAuth={isAuth} />}>{publicRoutes}</Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      <Notification />
    </Router>
  );
};

export default App;
