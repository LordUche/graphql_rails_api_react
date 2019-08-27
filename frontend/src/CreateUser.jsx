import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(input: { name: $name, email: $email }) {
      user {
        id
        name
        email
        booksCount
      }
      errors
    }
  }
`;

const CreateUser = ({ onCreateUser }) => {
  const [user, setUser] = useState({ name: '', email: '' });
  const onSubmit = (e, createUser) => {
    e.preventDefault();
    createUser({ variables: user });
    setUser({ name: '', email: '' });
  };
  return (
    <Mutation mutation={CREATE_USER} update={onCreateUser}>
      {createUserMutation => (
        <form
          className="px-8 pt-6 pb-8 mb-4"
          onSubmit={e => onSubmit(e, createUserMutation)}
        >
          <h4 className="mb-3">Create new user</h4>
          <div className="mb-4">
            <input
              className="border rounded w-full py-2 px-3"
              type="text"
              value={user.name}
              placeholder="Name"
              onChange={e => setUser({ ...user, name: e.target.value })}
            />
          </div>
          <div className="mb-6">
            <input
              className="border rounded w-full py-2 px-3"
              type="email"
              value={user.email}
              placeholder="Email"
              onChange={e => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            type="submit"
          >
            Create
          </button>
        </form>
      )}
    </Mutation>
  );
};

export default CreateUser;
