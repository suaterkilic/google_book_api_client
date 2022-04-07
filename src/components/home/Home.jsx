import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const Home = () => {
  const [searchValue, setSearchValue] = useState(null);
  const [books, setBooks] = useState([]);

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (e) => {

    e.preventDefault();


    const formData = {
      endpoint: searchValue,
    };

    api.googleBookFetch(formData).then((res) => {
      const { data } = res;

      setBooks(data.items);
    });
  };

  const handleSaveBookMark = (bookId) => {
    const isLogin = sessionStorage.getItem("is_login") || false;

    if (isLogin !== false) {
      const formData = {
        endpoint: "bookmark/save",
        data: {
          user_id: parseInt(sessionStorage.getItem("user")),
          book_id: bookId,
        },
      };

      api.post(formData).then((res) => {

        const { data } = res;

        if(!data.success) {
          alert(data.message)
        } else {
          alert(data.message)
        }

      });
    }
  };

  return (
    <div className="app">
      
      <div className="container">
        <div className="row d-flex justify-content-center mt-5">
        <Link to="/bookmarks" style={{
          textAlign: 'center'
        }}>
          <button className="btn btn-dark">Yer İmleri</button>
        </Link>

        </div>
        <div className="row search-container d-flex justify-content-center align-items-center">
          <div className="col-md-8">
            <div className="search">
              <form onSubmit={(e) => handleSubmit(e)}>
              <input
                type="text"
                onChange={handleChange}
                className="form-control"
                placeholder="Aramaya başla..."
              />
              <button
                type="submit" 
                className="btn btn-primary">Ara</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-4">
        <div className="row">
          {books.length > 0 &&
            books.map((item, key) => {
              return (
                <div key={key} className="col-md-3">
                  <div className="card app-card" style={{ width: "18rem"}}>
                    <img
                      src={
                        item.volumeInfo.imageLinks !== undefined
                          ? item.volumeInfo.imageLinks.thumbnail
                          : "/images/no-image.png"
                      }
                      className="card-img-top book-img"
                    />
                    <div className="card-body">
                      <h6 className="card-title">{item.volumeInfo.title}</h6>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {item.volumeInfo.categories !== undefined
                          ? item.volumeInfo.categories.join(", ").substring(0, 20) + '...'
                          : "Kategori Yok"}
                      </h6>
                      <div className="d-flex">
                        <div className="col">
                          {item.volumeInfo.authors !== undefined
                            ? item.volumeInfo.authors.join(", ")
                            : "Yazar bilgisi yok."}
                        </div>
                        <div className="col">
                          <button
                            type="button"
                            onClick={() => handleSaveBookMark(item.id)}
                            className="btn btn-primary"
                          >
                            Kaydet
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
