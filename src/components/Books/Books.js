import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetAllBooksQuery,
  useGetFeaturedBooksMutation,
  useGetSearchedBookMutation,
} from "../../features/BookApi/bookApiSlice";
import Book from "./Book";

const Books = () => {
  const [toggle, setToggle] = useState("All");
  console.log("toggled", toggle);
  const {
    data: allBooks,
    isLoading: booksLoading,
    isError: booksError,
  } = useGetAllBooksQuery();
  const [
    getFeaturedBooks,
    { data: featuredBooks, isLoading: featuredbooksLoading },
  ] = useGetFeaturedBooksMutation();

  useEffect(() => {
    if (toggle === "Featured") {
      getFeaturedBooks(true);
    }
  }, [toggle]);

  //Getting Searched Data using normal redux toolkit
  const { searchWord } = useSelector((state) => state?.searchedData);
  console.log("searched word", searchWord);

  useEffect(() => {
    if (searchWord) {
      setToggle(null);
    } else {
      setToggle("All");
    }
  }, [searchWord]);

  const [
    getSearchedBook,
    { data: searchedbook, isLoading: searchedBookLoading },
  ] = useGetSearchedBookMutation();

  useEffect(() => {
    if (searchWord !== null) {
      getSearchedBook(searchWord);
    }
  }, [searchWord]);

  return (
    <main className="py-12 px-6 2xl:px-6 container">
      <div className="order-2 xl:-order-1">
        <div className="flex items-center justify-between mb-12">
          <h4 className="mt-2 text-xl font-bold">Book List</h4>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setToggle("All")}
              className={`${
                toggle === "All"
                  ? "lws-filter-btn active-filter"
                  : "lws-filter-btn"
              }`}
            >
              All
            </button>
            <button
              className={`${
                toggle === "Featured"
                  ? "lws-filter-btn active-filter"
                  : "lws-filter-btn"
              }`}
              onClick={() => setToggle("Featured")}
            >
              Featured
            </button>
          </div>
        </div>
        <div className="space-y-6 md:space-y-0 md:grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/*  All Book Card   */}
          {toggle === "All" ? (
            <>
              {allBooks?.map((each) => {
                return <Book key={each?.id} book={each}></Book>;
              })}
            </>
          ) : searchWord ? (
            <>
              {searchedbook?.map((each) => {
                return <Book key={each?.id} book={each}></Book>;
              })}
            </>
          ) : (
            <>
              {featuredBooks?.map((each) => {
                return <Book key={each?.id} book={each}></Book>;
              })}
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Books;
