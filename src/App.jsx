import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { TodoContext } from "./contexts/TodoContext";
import Home from "./pages/Home";
import AddTodo from "./pages/AddTodo";
import ErrorPage from "./pages/ErrorPage";
import EditTodo from "./pages/EditTodo";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import Register from "./pages/Register";

function Layout({ token, setToken }) {
  function logout() {
    setToken(null);
  }

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand as={Link} to="/">Todos</Navbar.Brand>
          <Nav className="me-auto">
            {token ?
              <>
                <Nav.Link as={Link} to="/add">Add Todo</Nav.Link>
                <Button className="text-danger" onClick={logout} variant="light">Logout</Button>
              </>
              :
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            }
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [users, setUsers] = useLocalStorage("users", []);
  const [token, setToken] = useLocalStorage("token", null);

  return (
    <TodoContext.Provider value={{ todos, setTodos, token, setToken, users, setUsers }}>
      <BrowserRouter basename="/42-React-Vite-CRUD-Todo-App">
        <Routes>
          <Route path="/" element={<Layout token={token} setToken={setToken} />}>
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route
              path="add"
              element={
                <RequireAuth>
                  <AddTodo />
                </RequireAuth>
              }
            />
            <Route path="*" element={<ErrorPage />} />
            <Route
              path="todo/:id"
              element={
                <RequireAuth>
                  <EditTodo />
                </RequireAuth>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TodoContext.Provider>
  );
}

export default App;
