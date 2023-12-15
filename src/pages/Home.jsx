import { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { TodoContext } from "../contexts/TodoContext";
import TodoCard from '../components/TodoCard';

export default function Home() {
  const todos = useContext(TodoContext).todos;
  const userId = useContext(TodoContext).token;

  return (
    <Container>
      <h1 className="my-3">Your todos</h1>
      <Row>
        <CardGroup todos={todos} userId={userId} />
      </Row>
    </Container>
  );
}

function CardGroup({ todos, userId }) {
  return todos.map((todo) => {
    if (todo.userId === userId) {
      return (
        <Col md={4} key={todo.id}>
          <TodoCard todo={todo} />
        </Col>
      );
    }
  });
}