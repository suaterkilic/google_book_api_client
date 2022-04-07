import React, { useState, useEffect } from "react";
import api from "../../services/api";

const BookMarks = () => {
  let result = [];
  const [bookMarks, setBookMarks] = useState([]);
  const [userId, setUserId] = useState()

  const fetchBookMark = async (bookId) => {
    return await api.fetchSavedBookMark({ endpoint: bookId });
  };

  const handleRemove = (id) => {
    
    const formData = {
      data: {
        book_id: id
      },
      endpoint: `bookmark/destroy/${userId}`
    }

    api
    .post(formData)
    .then((res) => {

      const { data } = res;

      if(data.success) {
        setBookMarks([])
        getData()
        alert(data.message)
      }
    })

  };

  const getData = () => {
    const userId = sessionStorage.getItem("user") || null;

    const endpoint = `bookmark/${userId}`;

    const data = {
      endpoint,
    };

    api.get(data).then((res) => {
      const { data } = res;

      if (data.success) {
        let savedBookMarks = [];

        let result = [];
        savedBookMarks = data.data.bookmarks;

        if (savedBookMarks.length > 0) {
          savedBookMarks.map((item, key) => {
            fetchBookMark(item.book_id).then((re) => {
              result.push(re.data);
              setBookMarks((bookMarks) => [...bookMarks, re.data]);
            });
          });
        }
      }
    });
  };

  useEffect(() => {
    setUserId(sessionStorage.getItem('user') || null)
    getData();
  }, []);

  return (
    <div className="container mx-auto mt-4">
      <div className="row">
        {bookMarks.length > 0 &&
          bookMarks.map((item, key) => {
            return (
              <div key={key} className="col-md-3">
                <div className="card app-card" style={{ width: "18rem" }}>
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
                        ? item.volumeInfo.categories
                            .join(", ")
                            .substring(0, 20) + "..."
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
                          onClick={() => handleRemove(item.id)}
                          type="button"
                          className="btn btn-danger"
                        >
                          Sil
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
  );
};

export default BookMarks;
