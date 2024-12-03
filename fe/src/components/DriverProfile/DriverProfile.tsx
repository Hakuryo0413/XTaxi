import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components for Responsive Design
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  max-width: 600px;
  margin: 0 auto;

  @media (min-width: 768px) {
    padding: 40px;
  }
`;

const ProfileTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: transparent;

  th, td {
    text-align: left;
    padding: 20px;
    border-bottom: 1px solid #ccc;
    color: #ffcc00; /* Dark yellow */
    font-weight: bold;
  }

  th {
    background-color: transparent;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;

  button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
      background-color: #45a049;
    }
  }

  button:disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
  }
`;

const DriverProfile: React.FC = () => {
  const initialProfileData = {
    username: 'driver123',
    password: '********',
    role: 'Driver',
    name: 'John Doe',
    phone: '123-456-7890',
    income: '21982389283',
    vehicle_type: 'Sedan',
  };

  const [profileData, setProfileData] = useState(initialProfileData);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateClick = () => {
    // Simulate updating the data on the backend
    console.log('Updating profile data:', profileData);
    // You can use an API call here to update the backend
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof typeof profileData) => {
    setProfileData({
      ...profileData,
      [field]: e.target.value,
    });
  };

  return (
    <ProfileContainer>
      <ProfileTable>
        <tbody>
          <tr>
            <th>Username</th>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.username}
                  onChange={(e) => handleInputChange(e, 'username')}
                />
              ) : (
                profileData.username
              )}
            </td>
          </tr>
          <tr>
            <th>Password</th>
            <td>
              {isEditing ? (
                <input
                  type="password"
                  value={profileData.password}
                  onChange={(e) => handleInputChange(e, 'password')}
                />
              ) : (
                profileData.password
              )}
            </td>
          </tr>
          <tr>
            <th>Role</th>
            <td>{profileData.role}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => handleInputChange(e, 'name')}
                />
              ) : (
                profileData.name
              )}
            </td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange(e, 'phone')}
                />
              ) : (
                profileData.phone
              )}
            </td>
          </tr>
          <tr>
            <th>Income</th>
            <td>{profileData.income}</td>
          </tr>
          <tr>
            <th>Vehicle Type</th>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.vehicle_type}
                  onChange={(e) => handleInputChange(e, 'vehicle_type')}
                />
              ) : (
                profileData.vehicle_type
              )}
            </td>
          </tr>
        </tbody>
      </ProfileTable>

      <ButtonContainer>
        <button onClick={handleEditClick} disabled={isEditing}>Edit Profile</button>
        <button onClick={handleUpdateClick} disabled={!isEditing}>Update Data</button>
      </ButtonContainer>
    </ProfileContainer>
  );
};

export default DriverProfile;
