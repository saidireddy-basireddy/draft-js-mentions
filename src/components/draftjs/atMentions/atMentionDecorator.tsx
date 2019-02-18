import * as React from 'react';
import * as Draft from 'draft-js';
import { MyDraftDecorator } from '../draftcore/MyDraft';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { AtMentionSugestion } from './AtMentionSugestion';
import { AtMention } from './AtMention';
import { IUserDetails } from '../../interfaces';
import {
  getTextBetweenTriggerAndCurser,
  isCursorAtEndOFBlock, ReplaceCurrentWithEntity, getEntityData
} from '../draftcore/draftUtils';

export class AtMentionsDecorator implements MyDraftDecorator {
  entityType = 'mention';
  mentionTrigger = '@';
  editorState: Draft.EditorState;
  AtMentionsRef: AtMentionSugestion;

  constructor(public UpdateEditorStareCallBack: (editorState: Draft.EditorState) => void) { }

  onEditorStateUpdated = (editorState: Draft.EditorState) => {
    this.editorState = editorState;
  }

  strategy = (block: Draft.ContentBlock, callback: (start: number, end: number) => void) => {
    block.findEntityRanges(val => {
      const entityKey = val.getEntity();
      if (!entityKey) { return false; }
      const contentState = this.editorState.getCurrentContent() as any;
      return contentState.getEntity(entityKey).getType() === this.entityType;
    }, (start, end) => callback(start, end));

    const mentionAtCursor = this.textBeteenAtAndCursor();
    if (mentionAtCursor && mentionAtCursor.end - mentionAtCursor.start > 1) {
      callback(mentionAtCursor.start, mentionAtCursor.end + 1);
    }
  }

  component = observer<any>((props: { decoratedText: string, entityKey: string, children: any }) => {
    if (props.entityKey) {
      const user = this.getUserfromEntity(props.entityKey);
      return <AtMention user={user} >{props.children}</AtMention>;
    }

    let currentMentionText = '';
    if (isCursorAtEndOFBlock(this.editorState, this.mentionTrigger)) {
      currentMentionText = props.decoratedText as string;
    } else {
      const mentionAtCursor = this.textBeteenAtAndCursor();
      if (mentionAtCursor) { currentMentionText = mentionAtCursor.suggestionText; }
    }
    let cleanCurrentMention = currentMentionText.replace(this.mentionTrigger, '').trim();

    return (
      <AtMentionSugestion
        ref={(AtMentionsRef) => this.AtMentionsRef = AtMentionsRef}
        searchString={cleanCurrentMention}
        onUserSelected={this.onUserSelected}
      >
        {props.children}
      </AtMentionSugestion>);
  });

  textBeteenAtAndCursor = () => {
    /*
    const ourContent = this.editorState.getCurrentContent();
    const text = ourContent.getPlainText();
    console.log(text);  */
    return getTextBetweenTriggerAndCurser(this.mentionTrigger, this.editorState);
  }

  onUserSelected = (user: IUserDetails) => {
    const newEditorState = ReplaceCurrentWithEntity(
      toJS(user), `@${user.DisplayName}`, this.mentionTrigger, this.entityType, this.editorState
    );
    this.UpdateEditorStareCallBack(newEditorState);
  }

  getUserfromEntity(entityKey: string) {
    return getEntityData<IUserDetails>(entityKey, this.editorState);
  }

  onKeyPressed = (e) => {
    if (this.AtMentionsRef) { return this.AtMentionsRef.keyPressed(e); }
    return null;
  }

  onKeyCommand = (command: string) => {
    if (this.AtMentionsRef) { return this.AtMentionsRef.keyCommand(command); }
    return 'not-handled';
  }

  onKeyUp = (e) => {
    if (this.AtMentionsRef) { this.AtMentionsRef.keyUp(e); }
  }

  onKeyDown = (e) => {
    if (this.AtMentionsRef) { this.AtMentionsRef.keyDown(e); }
  }

  onEscape = (e) => {
    if (this.AtMentionsRef) { this.AtMentionsRef.onEscape(e); }
  }

}
