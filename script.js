let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");
let isRecognizing = false; // Variable to track recognition state

let appStates = {
    instagram: false,
    facebook: false,
    chatgpt: false,
    google: false,
    youtube: false
};

// Store dynamically added commands
let userCommands = {};

// Speak function with voice setup
function speak(text) {
    if ('speechSynthesis' in window) {
        let voices = window.speechSynthesis.getVoices();
        let text_speak = new SpeechSynthesisUtterance(text);
        text_speak.rate = 0.95;
        text_speak.pitch = 1;
        text_speak.volume = 1;
        
        // Set the voice (ensure a valid voice is chosen, or fallback to default)
        if (voices.length > 0) {
            let selectedVoice = voices.find(voice => voice.lang === "hi-IN") || voices[0];
            text_speak.voice = selectedVoice;
        } else {
            console.warn("No voices found, using default voice.");
        }

        // Speak the text
        window.speechSynthesis.speak(text_speak);
    } else {
        console.error("Speech synthesis not supported in this browser.");
    }
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
    // Ensure voices are loaded
    window.speechSynthesis.onvoiceschanged = function() {
        console.log("Voices updated.");
    };
});

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

// Handle speech result
recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;

    // Split the transcript into separate commands
    let commands = transcript.toLowerCase().split(" and ");

    // Process each command individually
    commands.forEach(command => takeCommand(command.trim()));
};

// Start/Stop speech recognition
btn.addEventListener('click', () => {
    if (!isRecognizing) {
        recognition.start();
        isRecognizing = true;
        btn.style.display = "none"; // Hide the button when listening
        voice.style.display = "block"; // Show the voice indicator
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

// Helper to open a web app
function openApp(app, url) {
    if (!appStates[app]) {
        window.open(url, "_blank");
        appStates[app] = true;
        speak(`I've opened ${app} for you.`);
    } else {
        speak(`${app} is already open.`);
    }
}

// Close the app by resetting the state
function closeApp(app) {
    appStates[app] = false;
    speak(`${app} is now closed.`);
}

// Function to dynamically add commands
function setCommand(commandName, response) {
    userCommands[commandName] = response;
    speak(`New command "${commandName}" has been added.`);
}

// Function to handle various commands
function takeCommand(message) {
    // Hide voice indicator and show button when processing commands
    btn.style.display = "block";
    voice.style.display = "none";

    // Check for custom commands
    if (userCommands[message]) {
        speak(userCommands[message]);
    }

    // Basic responses
    else if (message.includes("hello") || message.includes("hey")) {
        speak("Hello! I am cyberia How can I help you today?");
    } else if (message.includes("who are you") || message.includes("what is your name")) {
        speak("I am cyberia, a virtual assistant created by Aryan. How can I assist you?");
    } else if (message.includes("how are you")) {
        speak("I'm doing great! Thank you for asking.");
    }

    else if (message.includes("what is your name ")) {
        speak("I am a cyberia, a virtual assistant designed to help you with various tasks and assist you in various ways.");
    }

    else if (message.includes("what is your ")) {
        speak("I am a virtual assistant designed to help you with various tasks and assist you in various ways.");
    } else if (message.includes("what can you do")) {
        speak("I can assist you with various tasks such as opening applications, searching the internet, playing music, and much more.");
    } else if (message.includes("what are your hobbies")) {
        speak("I enjoy playing music, watching movies, and exploring new places.");
    } else if (message.includes("what are your skills")) {
        speak("I am a virtual assistant created by Aryan. I am capable of handling various tasks and can perform various functions.");
    } else if (message.includes("what are your favorite movies")) {
        speak("My favorite movie is The Dark Knight.");
    } else if (message.includes("what are your favorite songs")) {
        speak("My favorite song is Taylor Swift's Havana.");
    } else if (message.includes("what are your favorite places")) {
        speak("My favorite place is the beach.");
    } else if (message.includes("what are your favorite foods")) {
        speak("My favorite food is pizza.");
    } else if (message.includes("what are your favorite animals")) {
        speak("My favorite animal is a cat.");
    } else if (message.includes("what are your favorite colors")) {
        speak("My favorite color is blue.");
    } else if (message.includes("what are your favorite numbers")) {
        speak("My favorite number is 7.");
    } else if (message.includes("what are your favorite things")) {
        speak("My favorite thing is a good book.");
    } else if (message.includes("what are your favorite movies")) {
        speak("My favorite movie is The Dark Knight.");
    } else if (message.includes("what are your favorite songs")) {
        speak("My favorite song is Taylor Swift's Havana.");
    } else if (message.includes("what are your favorite places")) {
        speak("My favorite place is the beach.");
    } else if (message.includes("what are your favorite foods")) {
        speak("My favorite food is pizza.");
    } else if (message.includes("what are your favorite animals")) {
        speak("My favorite animal is a cat.");
    } else if (message.includes("what are your favorite colors")) {
        speak("My favorite color is blue.");
    } else if (message.includes("what are your favorite numbers")) {
        speak("My favorite number is 7.");
    } else if (message.includes("what are your favorite things")) {
        speak("My favorite thing is a good book.");
    } else if (message.includes("what are your favorite movies")) {
        speak("My favorite movie is The Dark Knight.");
    } else if (message.includes("what are your favorite songs")) {
        speak("My favorite song is Taylor Swift's Havana.");
    } else if (message.includes("what are your favorite places")) {
        speak("My favorite place is the beach.");
    } else if (message.includes("what are your favorite foods")) {
        speak("My favorite food is pizza.");
    } else if (message.includes("what are your favorite animals")) {
        speak("My favorite animal is a cat.");
    } else if (message.includes("what are your favorite colors")) {
        speak("My favorite color is blue.");
    } else if (message.includes("what are your favorite numbers")) {
        speak("My favorite number is 7.");
    } else if (message.includes("what are your favorite things")) {
        speak("My favorite thing is a good book.");
    } else if (message.includes("what are your favorite movies")) {
        speak("My favorite movie is The Dark Knight.");
    } else if (message.includes("what are your favorite songs")) {
        speak("My favorite song is Taylor Swift's Havana.");
    } else if (message.includes("what are your favorite places")) {
        speak("My favorite place is the beach.");
    } else if (message.includes("what are your favorite foods")) {
        speak("My favorite food is pizza.");
    } else if (message.includes("what are your favorite animals")) {
        speak("My favorite animal is a cat.");
    } else if (message.includes("what are your favorite colors")) {
        speak("My favorite color is blue.");
    } else if (message.includes("what are your favorite numbers")) {
        speak("My favorite number is 7.");
    } else if (message.includes("what are your favorite things")) {
        speak("My favorite thing is a good book.");
    } else if (message.includes("what are your favorite movies")) {
        speak("My favorite movie is The Dark Knight.");
    } else if (message.includes("what are your favorite songs")) {
        speak("My favorite song is Taylor Swift's Havana.");
    } else if (message.includes("what are your favorite places")) {
        speak("My favorite place is the beach.");
    } else if (message.includes("what are your favorite foods")) {
        speak("My favorite food is pizza.");
    } else if (message.includes("what are your favorite animals")) {
        speak("My favorite animal is a cat.");
    } else if (message.includes("what are your favorite colors")) {
        speak("My favorite color is blue.");
    } else if (message.includes("what are your favorite numbers")) {
        speak("My favorite number is 7.");
    } else if (message.includes("what are your favorite things")) {
        speak("My favorite thing is a good book.");
    } else if (message.includes("what are your favorite movies")) {
        speak("My favorite movie is The Dark Knight.");
    } else if (message.includes("what are your favorite songs")) {
        speak("My favorite song is Taylor Swift's Havana.");
    } else if (message.includes("what are your favorite places")) {
        speak("My favorite place is the beach.");
    } else if (message.includes("what are your favorite foods")) {
        speak("My favorite food is pizza.");
    } else if (message.includes("what are your favorite animals")) {
        speak("My favorite animal is a cat.");
    } else if (message.includes("what are your favorite colors")) {
        speak("My favorite color is blue.");
    } else if (message.includes("what are your favorite numbers")) {
        speak("My favorite number is 7.");
    } else if (message.includes("what are your favorite things")) {
        speak("My favorite thing is a good book.");
    } else if (message.includes("what are your favorite movies")) {
        speak("My favorite movie is The Dark Knight.");
    } else if (message.includes("what are your favorite songs")) {
        speak("My favorite song is Taylor Swift's Havana.");
    } else if (message.includes("what are your favorite places")) {
        speak("My favorite place is the beach.");
    } else if (message.includes("what are your favorite foods")) {
        speak("My favorite food is pizza.");
    } else if (message.includes("what are your favorite animals")) {
        speak("My favorite animal is a cat.");
    } else if (message.includes("what are your favorite colors")) {
        speak("My favorite color is blue.");
    } else if (message.includes("what are your favorite numbers")) {
        speak("My favorite number is 7.");
    } else if (message.includes("what are your favorite things")) {
        speak("My favorite thing is a good book.");
    } else if (message.includes("what are your favorite movies")) {
        speak("My favorite movie is The Dark Knight.");
    } else if (message.includes("what are your favorite songs")) {
        speak("My favorite song is Taylor Swift's Havana.");
    } else if (message.includes("what are your favorite places")) {
        speak("My favorite place is the beach.");
    } else if (message.includes("what are your favorite foods")) {
        speak("My favorite food is pizza.");
    } else if (message.includes("what are your favorite animals")) {
        speak("My favorite animal is a cat.");
    } else if (message.includes("what are your favorite colors")) {
        speak("My favorite color is blue.");
    } else if (message.includes("what are your favorite numbers")) {
        speak("My favorite number is 7.");
    } else if (message.includes("what are your favorite things")) {
        speak("My favorite thing is a good book.");
    } else if (message.includes("what are your favorite movies")) {
        speak("My favorite movie is The Dark Knight.");
    } else if (message.includes("what are your favorite songs")) {
        speak("My favorite song is Taylor Swift's Havana.");
    } else if (message.includes("what are your favorite places")) {
        speak("My favorite place is the beach.");
    } else if (message.includes("what are your favorite foods")) {
        speak("My favorite food is pizza.");
    } else if (message.includes("what are your favorite animals")) {
        speak("My favorite animal is a cat.");
    } else if (message.includes("what are your favorite colors")) {
        speak("My favorite color is blue.");
    } else if (message.includes("what are your favorite numbers")) {
        speak("My favorite number is 7.");
    } else if (message.includes("what are your favorite things")) {
        speak("My favorite thing is a good book.");
    } else if (message.includes("what are your favorite movies")) {
        speak("My favorite movie is The Dark Knight.");
    } else if (message.includes("what are your favorite songs")) {
        speak("My favorite song is Taylor Swift's Havana.");
    }





    // Open/close apps
    else if (message.includes("open instagram")) {
        openApp("instagram", "https://www.instagram.com/");
    } else if (message.includes("close instagram")) {
        closeApp("instagram");
    }

    else if (message.includes("open facebook")) {
        openApp("facebook", "https://www.facebook.com/");
    } else if (message.includes("close facebook")) {
        closeApp("facebook");
    }

    else if (message.includes("open chatgpt")) {
        openApp("chatgpt", "https://www.chatgpt.ai/");
    } else if (message.includes("close chatgpt")) {
        closeApp("chatgpt");
    }

//Google



    else if (message.includes("open google")) {
        openApp("google", "https://www.google.com/");
        speak("I've opened Google for you.");
    } 
    else if (message.includes("search for")) {
        let searchTerm = message.split("search for ")[1];
        window.open(`https://www.google.com/search?q=${searchTerm}`, "_blank");
        speak(`Searching Google for ${searchTerm}`);
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
    
    else if (message.includes("open website")) {
        let website = message.split("open website ")[1];
        window.open(`https://www.google.com/search?q=${website}`, "_blank");
        speak(`I've opened ${website} for you.`);
    }


    else if (message.includes("locate") && message.includes("location")) {
        let location = message.split("find location ")[1];
        window.open(`https://www.google.com/search?q=${location}`, "_blank");
        speak(`I've opened Google and searched for the location ${location}`);
    }

    // Youtube






    else if (message.includes("open youtube")) {
        openApp("youtube", "https://www.youtube.com/");
    } else if (message.includes("play music")) {
        let songName = message.split("play music ")[1];
        window.open(`https://www.youtube.com/results?search_query=${songName}`);
        speak(`I've opened YouTube and searched for ${songName}`);
    }

    // Time and date
    else if (message.includes("time")) {
        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        speak(`The current time is ${time}`);
    } else if (message.includes("date")) {
        let today = new Date();
        let date = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
        speak(`The current date is ${date}`);
    }

    // Fetch weather
    else if (message.includes("weather")) {
        let city = message.split("weather in ")[1];
        fetchWeather(city);
    }

    // Exit command
    else if (message.includes("exit")) {
        speak("Goodbye! Exiting now.");
        recognition.stop();
        btn.style.display = "block";
        voice.style.display = "none";
        isRecognizing = false;
    }

    // Set command to dynamically add a new response
    else if (message.includes("set")) {
        let [_, newCommand, response] = message.split("set ");
        setCommand(newCommand, response);
    }

    else if (message.includes("open whatsapp web")) {
        window.open("https://web.whatsapp.com/", "_blank");
        speak("I've opened WhatsApp Web for you.");
    } 









    // Default response
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
