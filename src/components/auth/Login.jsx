import React, { Fragment, useState } from "react";
import api from "../../services/api";

const Login = () => {
  const [userData, setUserData] = useState({ username: "", password: "" });

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handeFormSubmit = (event) => {
    event.preventDefault();

    const formData = {
      type: "auth",
      data: userData,
      endpoint: "auth/login",
    };

    api.post(formData).then((res) => {
      const { data } = res;

      if (data.success) {
        sessionStorage.setItem("is_login", true);
        sessionStorage.setItem("user", data.data.user);
        
        window.location.href = '/'
      }
    });
  };

  return (
    <Fragment>
      <div>
        <div className="sidenav">
          <div className="login-main-text">
            <h2>
              Lorem ipsum
              <br /> Google Book Task
            </h2>
            <p>
              Kullanıcı adı ve şifre girip giriş yapabilirisiniz. Kayıt olurmuş
              gibi bilgileri girebilirsiniz. Sistemde kayıt yoksa
              oluşturacaktır.
            </p>
          </div>
        </div>
        <div className="main">
          <div className="col-md-6 col-sm-12">
            <div className="login-form">
              <form onSubmit={(event) => handeFormSubmit(event)}>
                <div className="form-group">
                  <label>Kullanıcı Adı</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Şifre</label>
                  <input
                    type="password"
                    name="password"
                    required
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-black">
                  Giriş
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
