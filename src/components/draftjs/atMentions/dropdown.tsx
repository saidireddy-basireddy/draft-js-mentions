import * as React from 'react';
import { IUserDetails } from '../../interfaces';
import Profile from './profile';
import * as styles from './styles.less';
// tslint:disable-next-line:interface-name
export interface IAtMentionsDropdown {
    mentions: Array<IUserDetails>;
    onUserSelected: (user: IUserDetails) => void;
    selectIndex: number;
}

export class AtMentionsDropdown extends React.Component<IAtMentionsDropdown, {}> {
    render() {
        return (
            <div
                className={this.props.mentions.length > 1 ?
                    styles.mentionsWrapper : styles.mentionsWrapper + ' ' + styles.singleMention}
            >
                <ul contentEditable={false}>
                    {this.props.mentions.map((mention: IUserDetails, index) => {
                        return (
                            <li
                                key={index}
                                tabIndex={index}
                                onClick={(e) => { e.stopPropagation(); this.props.onUserSelected(mention); }}
                                className={this.props.selectIndex === index ? styles.mentionsProfileSelected : ''}
                            >
                                <Profile user={mention} />
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
