import React, { useState, useEffect } from 'react';
import api from '../services/api';

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
      await api.put(`client/up/${selectedClient}`, {
        fullName,
        address,
        tel,
        cpf,
        creditCardName,
        creditCardNumber,
        creditCardCvc,
        email,
        password,
        profileImage,
      });
      alert('Cliente '+ fullName +' atualizado com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao atualizar o cliente.');
    }
  };

  const handleImageChange = (event) => {
  };

  return (
    <div className="container text-center">
      <div className="row">
        <div className="form-custom">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                Selecione um Cliente:
                <select
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
              </label>
            </div>
            <br />
            <div className="form-group">
              <label>
                Nome Completo:
                <input
                  type="text"
                  className="form-control"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </label>
            </div>
            <br />
            <div className="form-group">
              <label>
                Endereço:
                <input
                  type="text"
                  className="form-control"
                  value={address}
                 
                  onChange={(e) => setAddress(e.target.value)}
                  />
                </label>
              </div>
              <br />
              <div className="form-group">
                <label>
                  Telefone:
                  <input
                    type="text"
                    className="form-control"
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                  />
                </label>
              </div>
              <br />
              <div className="form-group">
                <label>
                  CPF:
                  <input
                    type="text"
                    className="form-control"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                  />
                </label>
              </div>
              <br />
              
              <div className="form-group">
                <label>
                    Credit Card's Name:
                  <input
                    type="text"
                    className="form-control"
                    value={creditCardName}
                    onChange={(e) => setCreditCardName(e.target.value)}
                  />
                </label>
              </div>
              <br />
              <div className="form-group">
                <label>
                    Credit Card's Number:
                  <input
                    type="text"
                    className="form-control"
                    value={creditCardNumber}
                    onChange={(e) => setCreditCardNumber(e.target.value)}
                  />
                </label>
              </div>
              <br />
              <div className="form-group">
                <label>
                  Credit Card's Cvc
                  <input
                    type="text"
                    className="form-control"
                    value={creditCardCvc}
                    onChange={(e) => setCreditCardCvc(e.target.value)}
                  />
                </label>
              </div>
              <br />
              <div className="form-group">
                <label>
                  E-mail:
                  <input
                    type="email"
                    className="form-control"
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
                    className="form-control-file"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <br />
              <button type="submit" className="btn btn-primary">
                Salvar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  