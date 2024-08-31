import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Card from "../../Shared/components/UIElement/Card/Card";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          return response.json();
        })
        .then((data) => {
          setPosts(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <Card>
        <h1>Welcome to our site!</h1>
        <p>Please log in to access more features.</p>
      </Card>
    );
  }

  if (loading) {
    return <Card>Loading...</Card>;
  }

  if (error) {
    return <Card>Error: {error}</Card>;
  }

  return (
    <div>
      <h1>Posts</h1>

      {posts.map((post) => (
        <Card key={post.id} style={{ marginBottom: "20px" }}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </Card>
      ))}
    </div>
  );
};

export default Home;
