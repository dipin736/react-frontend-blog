import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const ViewBlog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/posts/");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deletePost = async (postId) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/posts/delete/${postId}/`, {
        method: "DELETE",
      });
      getPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div>
      {posts.map((post) => {
        const isoDate = post.published_on;
        const isdate = post.updated_at;
        const date = new Date(isoDate);
        const date2 = new Date(isdate);

        const serverTimezone = "UTC";

        const formattedDate = date.toLocaleString("en-US", {
          timeZone: serverTimezone,
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });

        const formattedDate2 = date2.toLocaleString("en-US", {
          timeZone: serverTimezone,
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        console.log("Published Date:", formattedDate);
        console.log("Updated Date:", formattedDate2);

        return (
          <Card
            key={post.id}
            style={{ width: "95rem", marginBottom: "1px", padding: "1px" }}
          >
            <Card.Img
              variant="top"
              style={{ width: "95rem", height: "25rem", padding: "75px" }}
              src={`http://localhost:8000${post.image}`}
              alt="notfound"
            />
            <Card.Body>
              <Card.Title className="text-warning">
                Title: {post.title}
              </Card.Title>
              <Card.Text>{post.short_description} </Card.Text>
              <Card.Text>{post.body} </Card.Text>
              <Card.Text>CreatedDate: {formattedDate}</Card.Text>
              <Card.Text>Updated Date: {formattedDate2}</Card.Text>

              <div className="d-flex justify-content-center">
                <Link to={`/BlogDetail/${post.id}`}>
                  <Button variant="primary m-4 align-item-center">
                    Details
                  </Button>
                </Link>
                <Link to={`/EditDetail/${post.id}`}>
                  <Button variant="warning m-4">Edit</Button>
                </Link>
                <Button
                  variant="danger m-4"
                  onClick={() => deletePost(post.id)}
                >
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default ViewBlog;
