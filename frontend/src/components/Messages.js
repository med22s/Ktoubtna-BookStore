import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import MessageChat from './MessageChat';

const Messages = ({ messages, name }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => <div key={i}><MessageChat message={message} name={name}/></div>)}
  </ScrollToBottom>
);

export default Messages;