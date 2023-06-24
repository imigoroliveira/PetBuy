import React, { useState } from 'react';
import api from '../services/api';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [tel, setTel] = useState('');
  const [cpf, setCpf] = useState('');
  const [creditCardName, setCreditCardName] = useState('');
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [creditCardCvc, setCreditCardCvc] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      fullName === '' ||
      address === '' ||
      tel === '' ||
      cpf === '' ||
      creditCardName === '' ||
      creditCardNumber === '' ||
      creditCardCvc === '' ||
      email === '' ||
      password === '' ||
      profileImage === null
    ) {
      alert('Please, fill all inputs!');
      return;
    }



    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('address', address);
    formData.append('tel', tel);
    formData.append('cpf', cpf);
    formData.append('creditCardName', creditCardName);
    formData.append('creditCardNumber', creditCardNumber);
    formData.append('creditCardCvc', creditCardCvc);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('profileImage', profileImage);

    try {
      const response = await api.post('client/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);
      alert('O usuário ' + response.data.fullName + ' foi criado com sucesso!');

      // Resetar os valores do formulário
      setFullName('');
      setAddress('');
      setTel('');
      setCpf('');
      setCreditCardName('');
      setCreditCardNumber('');
      setCreditCardCvc('');
      setEmail('');
      setPassword('');
      setProfileImage(null);
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro! Verifique o console para mais informações.');
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const buffer = reader.result;
        setProfileImage(buffer);
      };

      reader.onerror = (error) => {
        console.error(error);
        alert('Error to read file!');
      };

      reader.readAsArrayBuffer(file);
    } else {
      setProfileImage(null);
    }
  };

  return (
    <div className="container text-center">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control mt-3"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control mt-3"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control mt-3"
                placeholder="Phone Number"
                value={tel}
                onChange={(e) => setTel(e
                  .target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="CPF"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  required
                />
              </div>
  
              <div className="form-group">
                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="CreditCard Name's Titular"
                  value={creditCardName}
                  onChange={(e) => setCreditCardName(e.target.value)}
                  required
                />
              </div>
             
              <div className="form-group">
                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="CreditCard Number"
                  value={creditCardNumber}
                  onChange={(e) => setCreditCardNumber(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="CVC"
                  value={creditCardCvc}
                  onChange={(e) => setCreditCardCvc(e.target.value)}
                  required
                />
              </div>
             
              <div className="form-group">
                <input
                  type="email"
                  className="form-control mt-3"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
  
              <div className="form-group">
                <input
                  type="password"
                  className="form-control mt-3"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
  
              <div className="form-group">
                <input
                  type="file"
                  className="form-control-file"
                  onChange={handleImageChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3">Cadastrar</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  