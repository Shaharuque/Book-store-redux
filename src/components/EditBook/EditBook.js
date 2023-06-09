import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditBookMutation,
  useGetindividualbookMutation,
} from "../../features/BookApi/bookApiSlice";

const EditBook = () => {
  const navigate = useNavigate();

  const { editId } = useParams();
  const [getindividualbook, { data: individualBook, isLoading: bookLoading }] =
    useGetindividualbookMutation();

  const [editBook, { isSuccess: editSuccess }] = useEditBookMutation();

  useEffect(() => {
    if (editId) {
      getindividualbook(editId);
    }
  }, [editId]);

  const handleCheckboxChange = () => {
    setFeatured(!featured);
  };

  const [name, setName] = useState();
  const [author, setAuthor] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [price, setPrice] = useState();
  const [rating, setRating] = useState();
  const [featured, setFeatured] = useState();

  useEffect(() => {
    setName(individualBook?.length > 0 ? individualBook[0]?.name : null);
    setAuthor(individualBook?.length > 0 ? individualBook[0].author : null);
    setPrice(individualBook?.length > 0 ? individualBook[0].price : null);
    setRating(individualBook?.length > 0 ? individualBook[0].rating : null);
    setThumbnail(
      individualBook?.length > 0 ? individualBook[0].thumbnail : null
    );
    setFeatured(individualBook?.length > 0 ? individualBook[0].featured : null);
  }, [individualBook]);
  const handleSubmit = (e) => {
    e.preventDefault();
    editBook({
      id: editId,
      data: {
        name,
        price,
        rating,
        author,
        thumbnail,
        featured,
      },
    });
  };

  if (editSuccess) {
    navigate("/");
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
                defaultValue={
                  individualBook?.length > 0 ? individualBook[0].name : null
                }
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
                defaultValue={
                  individualBook?.length > 0 ? individualBook[0].author : null
                }
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
                defaultValue={
                  individualBook?.length > 0
                    ? individualBook[0].thumbnail
                    : null
                }
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
                  defaultValue={
                    individualBook?.length > 0 ? individualBook[0].price : null
                  }
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
                  defaultValue={
                    individualBook?.length > 0 ? individualBook[0].rating : null
                  }
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
                checked={
                  individualBook?.length > 0
                    ? individualBook[0].featured
                    : false
                }
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

export default EditBook;
