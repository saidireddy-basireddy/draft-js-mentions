import * as React from 'react';
import * as styles from './styles.less';
import config from '../../../config';
import { IUserDetails } from '../../interfaces';

const Profile = (props: { user: IUserDetails }) => {
  let { user } = props;
  return (
    <div className={styles.mentionsProfile}>
      <img
        className={styles.profilePic}
        style={{ backgroundImage: `url("${user.UserImageURL}"),url("${config.defaultProfilePic}")` }}
      />
      <h1 className={styles.profileName}>{user.DisplayName}</h1>
      <dl className={styles.profileDetails}>
        {user.JobTitle ? <div><dt>Role:</dt><dd>{user.JobTitle}</dd></div> : null}
        {user.WorkPhone ? <div><dt>Phone:</dt><dd>{user.WorkPhone}</dd></div> : null}
        {user.CellPhone ? <div><dt>Mobile:</dt><dd>{user.CellPhone}</dd></div> : null}
      </dl>
      <div className="clearfix" />
    </div>
  );
};

export default Profile;