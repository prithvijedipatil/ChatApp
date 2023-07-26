var socket = io('https://ab40-2401-4900-1f28-2a1a-7-44cc-bd18-9f49', { transports: ['websocket', 'polling', 'flashsocket'] });



const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container')



const append = (message,position)=>{
    const msgelement = document.createElement('div');
    msgelement.innerText = message;
    msgelement.classList.add('message');
    msgelement.classList.add(position);
    messageContainer.append(msgelement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
    if(position == 'left'){
        console.log('sound is playing');
        audio.play();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';
});

const nam = prompt('enter your name');
socket.emit('user-joined',nam);

socket.on('join',nam=>{
    append(`${nam} joined the chat`,'right');
    console.log("join working");
});

socket.on('receive',data=>{

    append(`${data.nam}:${data.message}`,'left');
    console.log("receive working");
});

socket.on('left',nam=>{
    append(`${nam} has left the chat`,'left');
    console.log("left working");
});

