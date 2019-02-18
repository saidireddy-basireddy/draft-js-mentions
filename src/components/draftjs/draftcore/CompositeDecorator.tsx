import * as Draft from 'draft-js';
import { AtMentionsDecorator } from './../atMentions/atMentionDecorator';

export class CompositDecorator {

  constructor(public UpdateEditorStoreCallBack: (editorState: Draft.EditorState) => void) { }

  private atMention = new AtMentionsDecorator(this.UpdateEditorStoreCallBack);

  onUpDateEditorState(editorState: Draft.EditorState) {
    this.atMention.onEditorStateUpdated(editorState);
  }

  onKeyPressed = (e) => {
    let keyHandeled = this.atMention.onKeyPressed(e);
    if (keyHandeled) { return keyHandeled; }
    return null;
  }

  onKeyCommand = (command: string) => {
    let keyHandled = this.atMention.onKeyCommand(command);
    if (keyHandled !== 'not-handled') { return keyHandled; }
    return 'not-handled';
  }    

  onKeyUp = (e) => {
    let keyHandled = this.atMention.onKeyUp(e);
    if (keyHandled) { return keyHandled; }
    return null;
  }

  onKeyDown = (e) => {
    let keyHandled = this.atMention.onKeyDown(e);
    if (keyHandled) { return keyHandled; }
    return null;
  }

  onEscape = (e) => {
    let keyHandled = this.atMention.onEscape(e);
    if (keyHandled) { return keyHandled; }
    return null;
  }

  getCompositDecorators() {
    const compositDecorators = new Draft.CompositeDecorator([
      {
        strategy: this.atMention.strategy,
        component: this.atMention.component
      }
    ]);
    return compositDecorators;
  }
}
