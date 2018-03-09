// import React, { Component } from 'react';
// import { EditorState, RichUtils, convertToRaw } from 'draft-js';
// import createEmojiPlugin from 'draft-js-emoji-plugin';
// import Editor from 'draft-js-plugins-editor';
// import 'draft-js-emoji-plugin/lib/plugin.css'

// const emojiPlugin = createEmojiPlugin();

// const { EmojiSuggestions } = emojiPlugin;


// class ArticleEditor extends Component {
//   constructor() {
//     super();
//     this.state = {
//       editorState: EditorState.createEmpty(),
//     };
//   }

//   onChange = (editorState) => {
//     const contentState = editorState.getCurrentContent();
//     console.log('content state', convertToRaw(contentState));
//     this.setState({ editorState });
//   };

//   handleKeyCommand = (command) => {
//     const newState = RichUtils.handleKeyCommand(this.state.editorState, command);

//     if (newState) {
//       this.onChange(newState);
//       return 'handled';
//     }

//     return 'not-handled';
//   }

//   onUnderlineClick = () => {
//     this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
//   }

//   onToggleCode = () => {
//     this.onChange(RichUtils.toggleCode(this.state.editorState));
//   }

//   render() {
//     return (
//       <div>
//         <button onClick={this.onUnderlineClick}>Underline</button>
//         <button onClick={this.onToggleCode}>Code Block</button>
//         <Editor
//           editorState={this.state.editorState}
//           handleKeyCommand={this.handleKeyCommand}
//           onChange={this.onChange}
//           plugins={[emojiPlugin]}
//           value={this.props.value}
//         />
//         <EmojiSuggestions />
//       </div>
//     );
//   }
// }

// export default ArticleEditor;