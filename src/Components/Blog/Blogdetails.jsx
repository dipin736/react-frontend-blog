  import React, { useEffect, useState } from "react";
  import { useParams } from "react-router-dom";
  import Card from "react-bootstrap/Card";
  import Button from "react-bootstrap/Button";
  import Form from "react-bootstrap/Form";

  const Blogdetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
      getPost();
      getComments();
    }, [id]);

    const getPost = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/posts/${id}/`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const getComments = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/posts/${id}/comments/`
        );
        if (response.ok) {
          const data = await response.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const handleCommentChange = (event) => {
      setNewComment(event.target.value);
    };

    const handleNameChange = (event) => {
      setName(event.target.value);
    };

    const handleCommentSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/posts/${id}/comments/`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name, body: newComment, post: id }),
          }
        );

        if (response.ok) {
          const newCommentData = await response.json();
          setComments([...comments, newCommentData]);
          setNewComment("");
          setName("");
        }
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <div>
        <Card
          key={post.id}
          style={{ width: "95rem", marginBottom: "10px", padding: "1px" }}
        >
          <Card.Img
            variant="top"
            style={{ width: "95rem", height: "25rem", padding: "75px" }}
            src={`http://localhost:8000${post.image}`}
            alt="notfound"
          />
          <Card.Body>
            <h1 className="text-center">{post.title}</h1>
            <Card.Text>{post.body} </Card.Text>
          </Card.Body>
        </Card>
        <div>
          <h5 className="text-danger">Comments</h5>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>
                <strong>{comment.name}: </strong>
                {comment.body}
              </li>
            ))}
          </ul>
        </div>
        <hr />
        <h3 className="text-danger">Add a Comment</h3>
        <Form onSubmit={handleCommentSubmit}>
          <Form.Group className="m-5">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={handleNameChange}
            />
          </Form.Group>
          <Form.Group className="m-5">
            <Form.Label>Your Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter Your Comment"
              value={newComment}
              onChange={handleCommentChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="m-3">
            Submit
          </Button>
        </Form>
      </div>
    );
  };

  export default Blogdetails;
