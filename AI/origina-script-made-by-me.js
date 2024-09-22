let btn = document.querySelector("#btn");            
let content = document.querySelector("#content");    
let voice = document.querySelector("#voice");    
let isRecognizing = false; // Variable to track recognition state

// Speak function
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 0.95;   
    text_speak.pitch = 1;  
    text_speak.volume = 1; 
    text_speak.lang = "hi-GB"; // Changed to a general English dialect
    window.speechSynthesis.speak(text_speak);
}

// Greet the user based on the time of day
function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning!");
    } else if (hours >= 12 && hours < 18) {
        speak("Good Afternoon!");
    } else {
        speak("Good Evening!"); 
    }
}

window.addEventListener('load', () => {
    wishMe(); // Greet the user when the page loads
});

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

// Handle speech result
recognition.onresult = (event) => { 
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase()); // Process the transcript
};

// Start/Stop speech recognition
btn.addEventListener('click', () => {
    if (!isRecognizing) {
        recognition.start();
        isRecognizing = true;
        btn.style.display = "none"; // Hide the button when listening
        voice.style.display = "block"; // Show the voice indicator (e.g., mic or animation)
    } else {
        recognition.stop();
        isRecognizing = false;
        btn.style.display = "block"; // Show the button again
        voice.style.display = "none"; // Hide the voice indicator
    }
});

// Handle recognition end
recognition.onend = () => {
    isRecognizing = false;
    btn.style.display = "block"; // Show the button again
    voice.style.display = "none"; // Hide the voice indicator
};

// Handle errors in speech recognition
recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    speak("Sorry, I couldn't understand that. Please try again.");
    btn.style.display = "block";
    voice.style.display = "none";
    isRecognizing = false;
};

// Function to handle various commands
function takeCommand(message) {
    // Hide voice indicator and show button when processing commands
    btn.style.display = "block";
    voice.style.display = "none";

    // Handle basic commands
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello! How can I help you today?");
    }
    else if (message.includes("who are you") || message.includes("What is your name ") || message.includes("what's your name ") ||message.includes("who made you")) {
        speak("I am a virtual assistant created by Musharraf Khan. I can help you with various tasks, such as searching for information, making plans, and providing weather forecasts.");
    }
    
    else if (message.includes("how are you")) {
        speak("I'm doing great! Thank you for asking.");
    }


    //instagrarm
    else if (message.includes("open instagram")) {
        window.open("https://www.instagram.com/");
        speak("I've opened Instagram for you.");
    }
    else if (message.includes("like a post")) {
        let postLink = message.split(" ").slice(2).join(" ");
        if (postLink) {
            window.open(postLink, "_blank");
            speak(`I've opened the link you provided and liked it.`);
        } else {
            speak("Please specify the link of the Instagram post you want to like.");
        }
    }
    else if (message.includes("comment on a post")) {
        let postLink = message.split(" ").slice(2).join(" ");
        let comment = message.split(" ").slice(3).join(" ");
        if (postLink && comment) {
            window.open(`${postLink}?comment=${comment}`, "_blank");
            speak(`I've opened the link you provided and commented on it.`);
        } else {
            speak("Please specify the link of the Instagram post you want to comment on and the comment you want to add.");
        }
    }
    else if (message.includes("follow a user")) {
        let username = message.split(" ").slice(2).join(" ");
        if (username) {
            window.open(`https://www.instagram.com/${username}/`, "_blank");
            speak(`I've opened the Instagram profile of ${username} for you and followed them.`);
        } else {
            speak("Please specify the username of the Instagram user you want to follow.");
        }
    }
    else if (message.includes("unfollow a user")) {
        let username = message.split(" ").slice(2).join(" ");
        if (username) {
            window.open(`https://www.instagram.com/${username}/`, "_blank");
            speak(`I've opened the Instagram profile of ${username} for you and unfollowed them.`);
        } else {
            speak("Please specify the username of the Instagram user you want to unfollow.");
        }
    }
    else if (message.includes("view profile")) {
        let username = message.split(" ").slice(2).join(" ");
        if (username) {
            window.open(`https://www.instagram.com/${username}/`, "_blank");
            speak(`I've opened the Instagram profile of ${username} for you.`);
        } else {
            speak("Please specify the username of the Instagram user you want to view.");
        }
    }
    else if (message.includes("search for a tag")) {
        let tag = message.split(" ").slice(2).join(" ");
        if (tag) {
            window.open(`https://www.instagram.com/explore/tags/${tag}/`, "_blank");
            speak(`I've opened the Instagram tag page for ${tag} for you.`);
        } else {
            speak("Please specify the tag you want to search for.");
        }
    }
    else if (message.includes("search for a location")) {
        let location = message.split(" ").slice(2).join(" ");
        if (location) {
            window.open(`https://www.instagram.com/explore/locations/${location}/`, "_blank");
            speak(`I've opened the Instagram location page for ${location} for you.`);
        } else {
            speak("Please specify the location you want to search for.");
        }
    }
    else if (message.includes("search for a user")) {
        let username = message.split(" ").slice(2).join(" ");
        if (username) {
            window.open(`https://www.instagram.com/${username}/`, "_blank");
            speak(`I've opened the Instagram profile of ${username} for you.`);
        } else {
            speak("Please specify the username of the Instagram user you want to search for.");
        }
    }

    
    
    
    //facebook profile

    else if (message.includes("open facebook")){
        window.open("https://www.facebook.com/");
        speak("I've opened Facebook for you.");
    }
    



    // chatgpt

    else if (message.includes("open chatgpt")){
        window.open("https://www.chatgpt.ai/?");
        speak("I've opened ChatGPT for you.");
    }
    else if (message.includes("chat with chatgpt")){
        window.open("https://www.chatgpt.ai/?");
        speak("I've opened ChatGPT for you.");
    }
    else if (message.includes("chat with me")){
        window.open("https://www.chatgpt.ai/?");
        speak("I've opened ChatGPT for you.");
    }
    else if (message.includes("chat with you")){
        window.open("https://www.chatgpt.ai/?");
        speak("I've opened ChatGPT for you.");
    }
    else if (message.includes("chat with the bot")){
        window.open("https://www.chatgpt.ai/?");
        speak("I've opened ChatGPT for you.");
    }
    else if (message.includes("chat with the virtual assistant")){
        window.open("https://www.chatgpt.ai/?");
        speak("I've opened ChatGPT for you.");
    }
    else if (message.includes("create") ||message.includes("develop ") || message.includes("make a ") ||message.includes("solve  ")){
        let task = message.split(" ").slice(2).join(" ");
        window.open(`https://chatgpt.openai.com/?`, "_blank");
        speak(`I've opened the ChatGPT interface and asked it to ${task}`);
    }






    else if (message.includes("quit") || message.includes("exit")) {
        speak("Goodbye! Have a great day!");
        recognition.stop();
        isRecognizing = false;
    }
    else if (message.includes("open google")) {
        let searchTerm = message.split(" ").slice(2).join(" ");
        window.open(`https://www.google.com/search?q=${searchTerm}`);
        speak(`I've opened Google for you and searched for ${searchTerm}`);
    }
    else if (message.includes("search for") || message.includes("find")) {
        let searchTerm = message.split(" ").slice(2).join(" ");
        if (searchTerm) {
            window.open(`https://www.google.com/search?q=${searchTerm}`, "_blank");
            speak(`Searching the internet for ${searchTerm}`);
        } else {
            speak("Please specify what you want to search for.");
        }
    }
    else if (message.includes("open youtube")) {
        let searchTerm = message.split(" ").slice(2).join(" ");
        window.open(`https://www.youtube.com/results?search_query=${searchTerm}`);
        speak(`I've opened YouTube for you and searched for ${searchTerm}`);
    }
    else if (message.includes("play music")) {
        let songName = message.split(" ").slice(2).join(" ");
        window.open(`https://www.youtube.com/results?search_query=${songName}`);
        speak(`I've opened YouTube for you and searched for ${songName}`);
    }
    else if (message.includes("time")) {
        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        speak(`The current time is ${time}`);
    }
    else if (message.includes("date")) {
        let today = new Date();
        let date = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
        speak(`The current date is ${date}`);
    }
    else if (message.includes("news")) {
        window.open("https://news.google.com/");
        speak("I've opened Google News for you.");
    }
    else if (message.includes("weather")) {
        let city = message.split(" ").slice(2).join(" ");
        fetchWeather(city); // Call the fetchWeather function
    }

    else if(message.includes("time")) {
        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        speak(`The current time is ${time}`);
    }

    else if(message.includes("date")) {
        let today = new Date();
        let date = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
        speak(`The current date is ${date}`);
        
    }






    // Desktop app


    else if (message.innclude("open calculator")){
        shell.openItem("calculated://");
        speak("I've opened the calculator for you.");
    }

    else if (message.includes("open notepad")){
        shell.openItem("notepad://");
        speak("I've opened the notepad for you.");
    }
































    else {
        speak("I'm sorry, I didn't understand that. Please try again.");
    }
}

// Fetch weather data using OpenWeatherMap API
function fetchWeather(city) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            let temp = Math.floor(data.main.temp - 273.15); // Convert Kelvin to Celsius
            let weatherDescription = data.weather[0].description;
            speak(`The weather in ${city} is currently ${temp}°C with ${weatherDescription}.`);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            speak("I'm sorry, but I couldn't fetch the weather data for that city.");
        });
}
