import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddbookMutation } from "../../features/BookApi/bookApiSlice";

const AddBook = () => {
  const [name, setName] = useState();
  const [author, setAuthor] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [price, setPrice] = useState();
  const [rating, setRating] = useState();
  const [featured, setFeatured] = useState(false);
  const navigate = useNavigate();

  //For adding new book
  const [addbook, { isSuccess: addedSuccess, isError: addedError }] =
    useAddbookMutation();

  const handleCheckboxChange = () => {
    setFeatured(!featured);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addbook({
      name,
      price,
      rating,
      author,
      thumbnail,
      featured,
    });
  };

  if (addedSuccess) {
    return navigate("/");
  }
  return (
    <main className="py-6 2xl:px-6">
      <div className="container">
        <div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
          <h4 className="mb-8 text-xl font-bold text-center">Add New Book</h4>
          <form onSubmit={handleSubmit} className="book-form">
            <div className="space-y-2">
              <label for="lws-bookName">Book Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                required
                className="text-input"
                type="text"
                id="lws-bookName"
                name="name"
              />
            </div>

            <div className="space-y-2">
              <label for="lws-author">Author</label>
              <input
                required
                onChange={(e) => setAuthor(e.target.value)}
                className="text-input"
                type="text"
                id="lws-author"
                name="author"
              />
            </div>

            <div className="space-y-2">
              <label for="lws-thumbnail">Image Url</label>
              <input
                required
                onChange={(e) => setThumbnail(e.target.value)}
                className="text-input"
                type="text"
                id="lws-thumbnail"
                name="thumbnail"
              />
            </div>

            <div className="grid grid-cols-2 gap-8 pb-4">
              <div className="space-y-2">
                <label for="lws-price">Price</label>
                <input
                  required
                  onChange={(e) => setPrice(e.target.value)}
                  className="text-input"
                  type="number"
                  id="lws-price"
                  name="price"
                />
              </div>

              <div className="space-y-2">
                <label for="lws-rating">Rating</label>
                <input
                  required
                  onChange={(e) => setRating(e.target.value)}
                  className="text-input"
                  type="number"
                  id="lws-rating"
                  name="rating"
                  min="1"
                  max="5"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="lws-featured"
                type="checkbox"
                name="featured"
                className="w-4 h-4"
                onChange={handleCheckboxChange}
              />
              <label for="lws-featured" className="ml-2 text-sm">
                {" "}
                This is a featured book{" "}
              </label>
            </div>

            <button type="submit" className="submit" id="lws-submit">
              Add Book
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddBook;
