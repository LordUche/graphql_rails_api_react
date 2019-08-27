import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import UserAvatar from './UserAvatar';
import CreateUser from './CreateUser';

const USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      booksCount
    }
  }
`;

const Users = ({ selectUser }) => {
  const updateUsers = (cache, { data: { createUser } }) => {
    const { users } = cache.readQuery({ query: USERS_QUERY });
    cache.writeQuery({
      query: USERS_QUERY,
      data: { users: users.concat([createUser.user]) },
    });
  };
  return (
    <Query query={USERS_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <div>Fetching..</div>;
        if (error) return <div>Error! {error.message}</div>;
        return (
          <div className="flex flex-wrap mb-4">
            {data.users.map(user => {
              return (
                <div
                  key={user.id}
                  className="m-4 w-1/4 rounded overflow-hidden shadow-lg"
                  onClick={() => selectUser(user)}
                >
                  <UserAvatar user={user} />
                </div>
              );
            })}
            <CreateUser onCreateUser={updateUsers} />
          </div>
        );
      }}
    </Query>
  );
};

export default Users;
