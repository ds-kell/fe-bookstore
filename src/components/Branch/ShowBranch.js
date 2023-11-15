import React from 'react';

const ShowBranch = ({ data }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Adress</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowBranch;
