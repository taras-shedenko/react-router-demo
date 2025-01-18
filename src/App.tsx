import { Suspense, lazy, createContext, useContext, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  NavLink,
  Outlet,
  NavLinkRenderProps,
} from "react-router";
import "./App.css";

const Users = lazy(() => import("./Users"));

const AuthContext = createContext({
  auth: false,
  login: () => {},
  logout: () => {},
});

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState(false);
  const login = () => setAuth(true);
  const logout = () => setAuth(false);
  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const App = () => {
  const [users, seIUsers] = useState([
    { id: "1", fullName: "Robin Wieruch" },
    { id: "2", fullName: "Sarah Finnley" },
  ]);

  const removeUser = (userId: string) =>
    seIUsers(users.filter(({ id }) => id !== userId));

  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route
            path="users/*"
            element={
              <Protected>
                <Suspense fallback="...">
                  <Users users={users} removeUser={removeUser} />
                </Suspense>
              </Protected>
            }
          ></Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

const navLinkStyle = ({ isActive }: NavLinkRenderProps) => ({
  fontWeight: isActive ? "bold" : "normal",
});
const Layout = () => {
  const { auth, login, logout } = useAuth();
  return (
    <>
      <h1>React Router</h1>

      {auth ? (
        <button onClick={logout}>Log out</button>
      ) : (
        <button onClick={login}>Log in</button>
      )}

      <nav style={{ borderBottom: "solid 1px", paddingBottom: "1rem" }}>
        <NavLink to="/" style={navLinkStyle}>
          Home
        </NavLink>
        <NavLink to="/about" style={navLinkStyle}>
          About
        </NavLink>
        <NavLink to="/users" style={navLinkStyle}>
          Users
        </NavLink>
      </nav>

      <main style={{ padding: "1rem 0" }}>
        <Outlet />
      </main>
    </>
  );
};

type ProtectedProps = { children: React.ReactNode };
const Protected = ({ children }: ProtectedProps) => {
  const { auth } = useAuth();
  return auth ? children : <Navigate to="/" replace />;
};

const About = () => <h2>About</h2>;

const Home = () => <h2>Home</h2>;

const NotFound = () => <h2>There's nothing here: 404!</h2>;

export default App;
