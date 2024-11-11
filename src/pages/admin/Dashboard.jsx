import React from "react";
import { Link } from "react-router-dom";

const Dashboard = ({ data, removeProduct }) => {
  console.log(data);

  return (
    <div>
      <h1>Hello, Admin</h1>
      <Link to="/admin/product-add" className="btn btn-primary">
        Add new product
      </Link>
      <table className="table table-bordered table-striped text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Thumbnail</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>{item.description || "Updating"}</td>
              <td>
                <img
                  src={item.thumbnail}
                  alt="Updating"
                  style={{ width: "100px", height: "100px" }}
                />
              </td>
              <td>
                <button
                  onClick={() => removeProduct(item.id)}
                  className="btn btn-danger"
                >
                  Remove Product
                </button>
                <Link
                  to={`/admin/product-edit/${item.id}`}
                  className="btn btn-success"
                >
                  Edit Product
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
