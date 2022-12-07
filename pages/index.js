import axios from "axios";
import { useState, useEffect } from "react";
import Pagination from "../components/pagination";
import { paginate } from "../utils/paginate";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const pageSize = 20;

  useEffect(() => {
    const getPosts = async () => {
      const { data: res } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(res);
    };
    getPosts();
  }, []);
  useEffect(() => {
    const getUsers = async () => {
      const { data: res } = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(res);
    };
    getUsers();
  }, []);

  const handlePageChange = (page) => setCurrentPage(page);

  const paginatePosts = paginate(posts, currentPage, pageSize);

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>User</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {paginatePosts?.map((post) => {
            const user = users.find((userObj) => userObj.id === post.userId);
            return (
              <tr key={post.id} style={{ cursor: "pointer" }}>
                <td style={{ width: "20%" }}>{user.name}</td>
                <td style={{ width: "80%" }}>{post.title}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        items={posts.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
