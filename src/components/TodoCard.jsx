import { useContext, useEffect, useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { TodoContext } from '../contexts/TodoContext';
import { Link } from 'react-router-dom';

export default function TodoCard({ todo }) {
  const completed = todo.completed;
  const border = completed ? "success" : "danger";
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const setTodos = useContext(TodoContext).setTodos;
  const [show, setShow] = useState(false);

  const showModal = () => setShow(true);
  const closeModal = () => setShow(false);

  // Functions related to the timer
  const startTimer = () => {
    if (timerInterval === null) {
      const intervalID = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      setTimerInterval(intervalID);
    }
  };

  const pauseTimer = () => {
    clearInterval(timerInterval);
    setTimerInterval(null);
  };

  const resetTimer = () => {
    clearInterval(timerInterval);
    setTimerInterval(null);
    setTimer(0);
  };

  const deleteTodo = () => {
    setTodos((prevTodos) =>
      prevTodos.filter((prevTodo) => prevTodo.id !== todo.id)
    );
    closeModal();
  };

  useEffect(() => {
    return () => clearInterval(timerInterval);
  }, [timerInterval]);

  return (
    <>
      <Card border={border} className="my-3">
        <Card.Header>{!completed && "Not"} Completed</Card.Header>
        <Card.Body>
          <Card.Title>{todo.title}</Card.Title>
          <Card.Text>{todo.description}</Card.Text>
          <p>Timer: {timer} seconds</p>
          <Button onClick={startTimer}>
            <i className="bi bi-play"></i>
          </Button>
          <Button className="ms-2" onClick={pauseTimer}>
            <i className="bi bi-pause-fill"></i>
          </Button>
          <Button className="ms-2" onClick={resetTimer}>
            <i className="bi bi-arrow-clockwise"></i>
          </Button>
          <Button as={Link} className="ms-2" to={`todo/${todo.id}`} variant="secondary">
            <i className="bi bi-pencil"></i>
          </Button>
          <Button className="ms-2" onClick={showModal} variant="danger">
            <i className="bi bi-trash3"></i>
          </Button>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this todo?</Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal} variant="secondary">Cancel</Button>
          <Button onClick={deleteTodo} variant="danger">Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
