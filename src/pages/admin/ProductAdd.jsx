import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const productSchema = z.object({
  title: z.string().min(5).max(100),
  price: z.number().min(0),
  description: z.string().optional(),
});
const ProductAdd = ({ onAdd }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // URL ảnh tạm thời
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  // Hàm xử lý khi người dùng chọn ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Tạo URL tạm thời để hiển thị ảnh preview
      setImagePreview(URL.createObjectURL(file));
      // Giả sử chúng ta không thực sự upload ảnh, chỉ lưu URL tạm thời
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data) => {
    const formData = {
      title: data.title,
      price: data.price,
      description: data.description,
      thumbnail: imageUrl, // Lưu URL ảnh vào thay vì file
    };

    // Gửi dữ liệu đến json-server hoặc xử lý tại đây
    console.log("Form data:", formData);
    onAdd(formData); // Giả sử bạn sử dụng onAdd để gửi lên json-server
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Product Add</h1>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            {...register("title", { required: true })}
          />
          {errors.title?.message && (
            <p className="text-danger">{errors.title?.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            {...register("price", { required: true, valueAsNumber: true })}
          />
          {errors.price?.message && (
            <p className="text-danger">{errors.price?.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            {...register("description")}
          />
          {errors.description?.message && (
            <p className="text-danger">{errors.description?.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="thumbnail" className="form-label">
            Image
          </label>
          <input
            type="file"
            className="form-control"
            id="thumbnail"
            {...register("thumbnail", { required: true })}
            onChange={handleImageChange} // Xử lý khi người dùng chọn ảnh
          />
          {errors.thumbnail && <p className="text-danger">Image is required</p>}
        </div>

        {/* Hiển thị preview ảnh */}
        {imagePreview && (
          <div className="mb-3">
            <label>Image Preview:</label>
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: "200px", height: "auto" }}
            />
          </div>
        )}

        <div className="mb-3">
          <button className="btn btn-success w-180" type="submit">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductAdd;
