import { FC } from 'react';
import { IUser } from '../types/types';

interface UserCardProps {
  user: IUser;
}

const UserCard: FC<UserCardProps> = ({ user }) => {
  return (
    <>
      <div className="column">
        <div className="container has-text-centered">
          <div className="card">
            <div className="card-header has-background-primary">
              <h2 className="card-header-title is-centered title is-2 has-text-white	">
                {user.firstName} {user.lastName}
              </h2>
            </div>
            <div className="card-content">
              <div className="content">
                <p></p>
                <a className="button is-primary" href={`/musicians/${user.id}`}>
                  Voir
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
