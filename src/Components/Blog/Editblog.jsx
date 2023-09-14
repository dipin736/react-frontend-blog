import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

const Editblog = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [updatedData, setUpdatedData] = useState({
    title: "",
    body: "",
    short_description: "",
    image: null,
  });

  useEffect(() => {
    getPost();
  }, [id]);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setUpdatedData({
      ...updatedData,
      image: file,
    });
  };

  const getPost = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/posts/${id}/`
      );
      if (response.status === 200) {
        const data = response.data;
        setUpdatedData({
          title: data.title || "",
          body: data.body || "",
          short_description: data.short_description || "",
          image: data.image || null,
        });
      }
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({
      ...updatedData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", updatedData.title);
      formData.append("body", updatedData.body);
      formData.append("short_description", updatedData.short_description);
      formData.append("image", updatedData.image);

      const response = await axios.put(
        `http://127.0.0.1:8000/api/posts/update/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.status);
      console.log(response.data);

      if (response.status === 200) {
        navigate("/Home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Edit Blog Post</h1>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Form.Group className="m-5">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={updatedData.title}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="m-5">
          <Form.Label>Body</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="body"
            value={updatedData.body}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="m-5">
          <Form.Label>Short Description</Form.Label>
          <Form.Control
            type="text"
            name="short_description"
            value={updatedData.short_description}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="m-5">
          <Form.Label>Image Upload</Form.Label>
          <Form.Control
            type="file"
            name="image"
            onChange={handleFileInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="m-3">
          Update Post
        </Button>
      </Form>
    </div>
  );
};

export default Editblog;
