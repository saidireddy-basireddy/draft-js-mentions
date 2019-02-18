// tslint:disable
import * as React from 'react';
import { IUserDetails } from '../../interfaces';
import * as styles from './styles.less';
import Profile from './profile';
import { observer } from 'mobx-react';
// React-Tooltip
let ReactTooltip = require('react-tooltip');

// tslint:disable-next-line:class-name
interface iAtMentionProps {
  user: IUserDetails;
}

@observer
export class AtMention extends React.Component<iAtMentionProps, {}> {

  constructor(props: any) {
    super(props);
  }

  

  render() {
    let { user } = this.props;   

    return (
      <span>
        <a
          data-tip={user.ID.toString()}
          data-for={user.ID}
          className={styles.highlight}
        >
          {this.props.children}
        </a>
        <ReactTooltip id={user.ID.toString()} type="light" effect="solid" border={true} class="mention-tooltip">
          <Profile user={user} />
        </ReactTooltip>
      </span>
    );
  }
}
