import React from 'react';

const UserCard = ({ user, style }) => (
  <div style={style.userCard}>
    <div style={style.cardContent}>
      <img
        src={user.picture.large}
        alt={`${user.name.first} ${user.name.last}`}
        style={style.userImage}
      />
      <h2 style={style.userName}>
        {user.name.first} {user.name.last}
      </h2>
      <div>
        <p style={style.userInfo}>
          <strong>Email:</strong> {user.email}
        </p>
        <p style={style.userInfo}>
          <strong>Gender:</strong> {user.gender}
        </p>
        <p style={style.userInfo}>
          <strong>Location:</strong> {user.location.city},{' '}
          {user.location.country}
        </p>
        <p style={style.userInfo}>
          <strong>Phone:</strong> {user.phone}
        </p>
      </div>
    </div>
  </div>
);

export default UserCard; 