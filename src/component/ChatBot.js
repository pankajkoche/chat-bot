import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hi there! How can I assist you today?' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const getMessageCountBySender = () => {
    const userMessageCount = messages.filter((message) => message.sender === 'user').length;
    const botMessageCount = messages.filter((message) => message.sender === 'bot').length;
    return [100, 200];
  };
  const chartData = {
    labels: ['User', 'Bot'],
    datasets: [
      {
        label: 'Message Count',
        data: [100,120],
        backgroundColor: ['#007bff', '#6c757d'],
      },
    ],
  };
  const handleSendMessage = (event) => {
    event.preventDefault();
    if (newMessage.trim() === '') {
      return;
    }
    const newId = messages.length + 1;
    const newMessages = [...messages, { id: newId, sender: 'user', text: newMessage }];
    setMessages(newMessages);
    setNewMessage('');
    const botResponse = generateBotResponse(newMessage);
    setTimeout(() => {
      setMessages([...newMessages, { id: newId + 1, sender: 'bot', text: botResponse }]);
    }, 500);
  };

  const generateBotResponse = (message) => {
    if (message.toLowerCase().includes('hello')) {
      return 'Hello there!';
    } else if (message.toLowerCase().includes('how are you')) {
      return 'I am doing well, thank you for asking.';
    } else if (message.toLowerCase().includes('kaisa chal rha he bhai')) {
      return 'Abe sab shi chal rha tu bta q sad he be sale';
    } else {
      return 'I am sorry, I do not understand. Can you please rephrase your question?';
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        
        <div className="col-md-9 ">
          <h1 className="text-center mb-4">Chat with us</h1>
          <div className="card">
            <div className="card-body">
              {messages.map((message) => (
                <div key={message.id} className={`row mb-2 ${message.sender === 'bot' ? 'justify-content-start' : 'justify-content-end'}`}>
                  <div className={`col-8 p-2 rounded ${message.sender === 'bot' ? 'bg-light' : 'bg-primary'} text-${message.sender === 'bot' ? 'dark' : 'white'}`}>
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form className="mt-4" onSubmit={handleSendMessage}>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Type your message" value={newMessage} onChange={handleNewMessageChange} />
            </div>
            <button  type="submit" className="btn btn-primary mt-3">Send</button>
          </form>
        </div>
        <div className="col-md-3 bg-light pt-3">
          <h3 className="mb-3">Chat Statistics</h3>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
