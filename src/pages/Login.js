import React from 'react';
import { useState } from 'react';
import Title from '../components/Atom/Title';

function Login() {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // Lógica para fazer o login com o email e senha fornecidos
    console.log('Login:', email, password);
  };

  const handleSignup = () => {
    // Lógica para redirecionar para a página de cadastro
    console.log('Redirecionar para página de cadastro');
  };


    return (
        <div class="row">
            <div class="col">     
                <div class="row">
                    <div class="col">
                        <Title title="Login"></Title>
                    </div>
                </div>
                <div class="row">
                    <div className="form-group">
                        <label htmlFor="email">E-mail:</label>
                        <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={handleEmailChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Senha:</label>
                        <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={handlePasswordChange}
                        />
                    </div>
                    <div>
                        <button className="btn btn-primary" onClick={handleLogin}>
                        Logar
                        </button>
                        <button className="btn btn-secondary" onClick={handleSignup}>
                        Cadastrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;