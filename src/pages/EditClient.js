import React, { useState, useEffect } from 'react';
import api from '../services/api';
import bcryptjs from 'bcryptjs';

export default function EditClient() {
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
  const [clientList, setClientList] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');

  useEffect(() => {
    fetchClientList();
  }, []);

  const fetchClientList = async () => {
    try {
      const response = await api.get('client/list');
      setClientList(response.data);
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao buscar a lista de clientes.');
    }
  };

  const handleClientSelect = (event) => {
    const selectedFullName = event.target.value;
    const selectedClientData = clientList.find((client) => client.fullName === selectedFullName);
    if (selectedClientData) {
      setFullName(selectedClientData.fullName);
      setAddress(selectedClientData.address);
      setTel(selectedClientData.tel);
      setCpf(selectedClientData.cpf);
      setCreditCardName(selectedClientData.creditCardName);
      setCreditCardNumber(selectedClientData.creditCardNumber);
      setCreditCardCvc(selectedClientData.creditCardCvc);
      setEmail(selectedClientData.email);
      setPassword(selectedClientData.password);
      setProfileImage(selectedClientData.profileImage);
      setSelectedClient(selectedClientData._id);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Criptografar a senha antes de enviar a requisição
      const hash = await bcryptjs.hash(password, 10);
      await api.put(`client/up/${selectedClient}`, {
        fullName,
        address,
        tel,
        cpf,
        creditCardName,
        creditCardNumber,
        creditCardCvc,
        email,
        password: hash, // Usar a senha criptografada
        profileImage,
      });
      alert('Cliente ' + fullName + ' atualizado com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao atualizar o cliente.');
    }
  };

  const handleImageChange = (event) => {
    // Implemente a lógica necessária para lidar com a alteração da imagem de perfil, se necessário
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="clientSelect">Selecione um Cliente:</label>
              <select
                id="clientSelect"
                className="form-control"
                value={selectedClient}
                onChange={handleClientSelect}
              >
                <option value="">Selecione...</option>
                {clientList.map((client) => (
                  <option key={client._id} value={client.fullName}>
                    {client.fullName}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="fullName">Nome completo:</label>
              <input
                type="text"
                id="fullName"
                className="form-control"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Endereço:</label>
              <input
                type="text"
                id="address"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="tel">Telefone:</label>
              <input
                type="text"
                id="tel"
                className="form-control"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="cpf">CPF:</label>
              <input
                type="text"
                id="cpf"
                className="form-control"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="creditCardName">Nome do cartão de crédito:</label>
              <input
                type="text"
                id="creditCardName"
                className="form-control"
                value={creditCardName}
                onChange={(e) => setCreditCardName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="creditCardNumber">Número do cartão de crédito:</label>
              <input
                type="text"
                id="creditCardNumber"
                className="form-control"
                value={creditCardNumber}
                onChange={(e) => setCreditCardNumber(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="creditCardCvc">CVC do cartão de crédito:</label>
              <input
                type="text"
                id="creditCardCvc"
                className="form-control"
                value={creditCardCvc}
                onChange={(e) => setCreditCardCvc(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha:</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="profileImage">Imagem de perfil:</label>
              <input
                type="file"
                id="profileImage"
                className="form-control-file"
                onChange={handleImageChange}
              />
            </div>

            <button type="submit" className="btn btn-primary">Atualizar Cliente</button>
          </form>
        </div>
      </div>
    </div>
  );
}
