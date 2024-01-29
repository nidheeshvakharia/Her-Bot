import OpenAI from '/node_modules/openai/resources/index.mjs';

const openai = new OpenAI({apiKey:"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"});

async function GetOpenAIResponse(inputString) {
  const completion = await openai.chat.completions.create({
    messages: [
        { role: "system", content: "You are a women's medical, mental health and career expert, who specialises in giving advice." },
        { role: "user", content: inputString }],
        model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content;
}

window.onload = async function() {
    var inputText;
    var sendButton = document.getElementById('send');
    if(sendButton) {
        sendButton.addEventListener('click', async function(event) {
            event.preventDefault();

            inputText = document.getElementById('type-box').value;
            var child = document.createElement('div');
            child.classList.add('chat-response');
            child.classList.add('chat-user');
            child.innerHTML = inputText;
            document.getElementById('type-box').value = '';
            console.log(inputText);

            var chatcontainer = document.getElementById('chat-container');
            chatcontainer.appendChild(child);
            var outputMessage = await GetOpenAIResponse(inputText);
            var botChild = document.createElement('div');
            botChild.classList.add('chat-response');
            botChild.classList.add('chat-bot');
            botChild.innerHTML = outputMessage;
            chatcontainer.appendChild(botChild);
        });
    } else {
        console.error('Element with id "send" not found');
    }
};