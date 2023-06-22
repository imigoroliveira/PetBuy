import React, { useState } from 'react';
import api from '../services/api';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [tel, setTel] = useState('');
  const [cpf, setCpf] = useState('');
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verify if all inputs was filled
    if (
      fullName === '' ||
      address === '' ||
      tel === '' ||
      cpf === '' ||
      creditCardNumber === '' ||
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
    formData.append('creditCardNumber', creditCardNumber);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('profileImage', profileImage);

    try {
        console.log(formData);
      const response = await api.post('client/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);
      alert("O usuário " + response.data.fullName + " foi criado com sucesso!");

      // Reset form values
      setFullName('');
      setAddress('');
      setTel('');
      setCpf('');
      setCreditCardNumber('');
      setEmail('');
      setPassword('');
      setProfileImage(null);
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro! Veja no console ..");
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
        alert("Ocorreu um erro ao ler o arquivo.");
      };

      reader.readAsArrayBuffer(file);
    } else {
      setProfileImage(null);
    }
  };


  return (
    <div className="container text-center">
      <div className="row">
        <div className="form-custom">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                Nome Completo:
                <input type="text" className="form-control" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </label>
            </div>
            <br />
            <div className="form-group">
              <label>
                Endereço:
                <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
              </label>
            </div>
            <br />
            <div className="form-group">
              <label>
                Telefone:
                <input type="text" className="form-control" value={tel} onChange={(e) => setTel(e.target.value)} />
              </label>
            </div>
            <br/>
            <div className="form-group">
              <label>
                CPF:
                <input type="text" className="form-control" value={cpf} onChange={(e) => setCpf(e.target.value)} />
              </label>
            </div>
            <br />
            <div className="form-group">
              <label>
                Número do Cartão de Crédito:
                <input type="text" className="form-control" value={creditCardNumber} onChange={(e) => setCreditCardNumber(e.target.value)} />
              </label>
            </div>
            <br />
            <div className="form-group">
              <label>
                Email:
                <input type="email" className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <br />
          <div className="form-group">
            <label>
              Senha:
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <br />
          <div className="form-group">
            <label>
              Imagem de Perfil:
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>
          <br />
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </div>
  </div>
);
}
