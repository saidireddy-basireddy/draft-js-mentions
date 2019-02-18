// tslint:disable
import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { IUserDetails } from '../../interfaces';
import { AtMentionsDropdown } from './dropdown';
import config from '../../../config';
import {mentions} from '../../common/mockData';

// tslint:disable-next-line:interface-name
export interface IAtMentions {
  searchString: string;
  onUserSelected: (user: IUserDetails) => void;
}

@observer
export class AtMentionSugestion extends React.Component<IAtMentions, {}> {
  @observable mentionSuggestions: IUserDetails[] = [];
  @observable dropDownActive = false;
  @observable currentSelectedUserIndex = 0;
  @observable mouseDownInComponent = false;

  constructor(props: IAtMentions) {
    super(props);
    this.getMentions = this.getMentions.bind(this);
  }

  componentWillReceiveProps(nextProps: IAtMentions)  {
    if (nextProps.searchString !== this.props.searchString) {
      if (nextProps.searchString.length >= config.mentionPluginDefaults.mentionTriggerCount) {
        this.getMentions(nextProps.searchString);
      } else {
        this.clearMentionSuggestions();
      }
    }
  }

  componentDidMount() {
    this.getMentions(this.props.searchString);
    window.addEventListener('mousedown', this.pageClick, false);
  }

  componentWillUnmount () {
    window.removeEventListener('mousedown', this.pageClick, false);
  }

  pageClick = () => {
    if (this.mouseDownInComponent) { return; }
    this.dropDownActive = false;
  }

  clearMentionSuggestions = () => this.mentionSuggestions = [];


  async getMentions(searchString: string) {
    if (searchString.length < 3) { return; }
    try {
       this.mentionSuggestions = mentions;
      if (this.mentionSuggestions.length === 0) {
        this.dropDownActive = false;
      } else { this.dropDownActive = true; }
    } catch (e) {
      console.log('error in fetching mentions', e);
    }
  }

  keyCommand = (command: string) => {
    switch (command) {
      case 'select_user':
        if (this.mentionSuggestions.length > 0) {
          this.onUserSelected(this.mentionSuggestions[this.currentSelectedUserIndex]);
        }
        break;
      default: return 'not-handled';
    }
    return 'handled';
  }

  keyPressed = (e) => {
    if (this.dropDownActive) {
      switch (e.keyCode) {
        case 13: return 'select_user';
        default:
      }
    }
    return null;
  }

  keyUp = (e) => {
    if (this.dropDownActive) {
      e.preventDefault();
      if (this.currentSelectedUserIndex > 0) { this.currentSelectedUserIndex--; }
    }
  }

  keyDown = (e) => {
    if (this.dropDownActive) {
      e.preventDefault();
      if (this.currentSelectedUserIndex < this.mentionSuggestions.length - 1) {
        this.currentSelectedUserIndex++;
      }
    }
  }

  onEscape = (e) => {
    if (this.dropDownActive) {
      e.preventDefault();
      this.dropDownActive = false;
    }
  }

  onUserSelected = (user: IUserDetails) => {
    this.dropDownActive = false;
    this.props.onUserSelected(user);
  }

  render() {
    return (
      <span onMouseDown={() => this.mouseDownInComponent = true} onMouseUp={() => this.mouseDownInComponent = false} >
        {this.props.children}
        {
          this.dropDownActive && (
          <AtMentionsDropdown
            mentions={this.mentionSuggestions}
            onUserSelected={this.onUserSelected}
            selectIndex={this.currentSelectedUserIndex}
          />)
        }
      </span>
    );
  }
}
