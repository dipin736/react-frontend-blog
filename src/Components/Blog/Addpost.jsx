import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    short_description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();

    formDataToSubmit.append("title", formData.title);
    formDataToSubmit.append("body", formData.body);
    formDataToSubmit.append("short_description", formData.short_description);
    formDataToSubmit.append("image", formData.image);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/posts/create/",
        formDataToSubmit
      );
      if (response.status === 201) {
        console.log("Post added successfully");
        navigate("/Home");
      } else {
        console.error("Failed to add post:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding post:", error);
      console.log(error.response);
    }
  };

  return (
    <div>
      <h1>Add Blog Post</h1>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Form.Group className="m-5">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="m-5">
          <Form.Label>Body</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="body"
            value={formData.body}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="m-5">
          <Form.Label>Short Description</Form.Label>
          <Form.Control
            type="text"
            name="short_description"
            value={formData.short_description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="m-5">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            name="image"
            onChange={handleFileInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="m-3">
          Add Post
        </Button>
      </Form>
    </div>
  );
};

export default AddPost;
