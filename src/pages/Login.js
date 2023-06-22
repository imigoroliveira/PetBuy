import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import api from './../services/api';
import Title from './../components/Atom/Title';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  function handleSubmit(event) {
      event.preventDefault();

      const bodyParam = {
          email: email,
          password: password
      }


      api.post('/auth', bodyParam)
          .then((response) => {
              alert(" Token gerado para o usuario " + bodyParam.email)
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("_id", response.data._id);
              localStorage.setItem("fullName", response.data.fullName);
           
              navigate("/");
              window.location.reload();
          })
          .catch((err) => {
              console.error(err.response.data)
              alert(" Ocorreu um erro! " + err.response.data.error)
          })
          .finally(() => {
              setEmail("")
              setPassword("")
          })
  }
    return (
      <div>
      <Title
          title={"Login"}
          text={"Faça seu login para concluir a compra"} />
       <div className="container text-center">
            <div className="row">
                <div className="form-custom">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>
                                Email:
                                <input type="text" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            </label>
                        </div>
                        <br />
                        <div className="form-group">
                            <label>
                                Password:
                                <input type="password" className="form-control" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            </label>
                        </div>
                        <br />
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
  </div>
    )
}
export default Login;