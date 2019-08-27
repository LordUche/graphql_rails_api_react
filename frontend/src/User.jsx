import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import UserAvatar from './UserAvatar';
import Books from './Books';

const USER_QUERY = gql`
  query User($id: ID!) {
    user(id: $id) {
      books {
        id
        title
        coverUrl
        averageRating
      }
    }
  }
`;

const User = ({ user, selectUser }) => (
  <Query query={USER_QUERY} variables={{id: user.id}}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error! {error.message}</p>;

      return (
        <>
          <div className="flex my-4">
            <button
              className="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded"
              onClick={() => selectUser(null)}
            >
              Back
            </button>
          </div>
          <div className="flex mb-4">
            <div className="my-4 w-1/4 rounded overflow-hidden">
              <UserAvatar user={user} />
            </div>
            <div className="my-4 px-4 w-3/4">
              <Books books={data.user.books} />
            </div>
          </div>
        </>
      );
    }}
  </Query>
);

export default User;
