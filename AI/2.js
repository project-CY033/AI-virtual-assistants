let btn = document.querySelector("#btn");            
let content = document.querySelector("#content");    
let voice = document.querySelector("#voice");    
let isRecognizing = false; // Variable to track recognition state

// Store references to opened windows/tabs
let openedWindows = {};

// Speak function
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 0.95;   
    text_speak.pitch = 1;  
    text_speak.volume = 1; 
    text_speak.lang = "hi-GB"; // Change to English or another language if needed
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

// Function to open an app or webpage and store the reference
function openAppWithControl(app, url) {
    if (!openedWindows[app]) {
        openedWindows[app] = window.open(url, "_blank");  // Open the page in a new tab
        speak(`I've opened ${app} for you.`);
    } else {
        speak(`${app} is already open.`);
    }
}

// Function to close the app/window
function closeApp(app) {
    if (openedWindows[app] && !openedWindows[app].closed) {
        openedWindows[app].close();  // Close the window
        speak(`${app} has been closed.`);
        delete openedWindows[app];  // Remove the reference
    } else {
        speak(`${app} is not currently open.`);
    }
}

// Scroll control
function scrollApp(app, direction) {
    if (openedWindows[app] && !openedWindows[app].closed) {
        if (direction === "down") {
            openedWindows[app].scrollBy(0, 500);  // Scroll down
            speak(`Scrolling down in ${app}.`);
        } else if (direction === "up") {
            openedWindows[app].scrollBy(0, -500);  // Scroll up
            speak(`Scrolling up in ${app}.`);
        }
    } else {
        speak(`${app} is not open or cannot be controlled.`);
    }
}

// Refresh control
function refreshApp(app) {
    if (openedWindows[app] && !openedWindows[app].closed) {
        openedWindows[app].location.reload();  // Refresh the page
        speak(`Refreshing ${app}.`);
    } else {
        speak(`${app} is not open.`);
    }
}

// Function to handle various commands
function takeCommand(message) {
    btn.style.display = "block";
    voice.style.display = "none";

    // Handle basic commands
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello! How can I help you today?");
    } else if (message.includes("who are you") || message.includes("what is your name")) {
        speak("I am a virtual assistant created by Musharraf Khan.");
    }

    // Open and control specific web apps
    else if (message.includes("open instagram")) {
        openAppWithControl("instagram", "https://www.instagram.com/");
    } else if (message.includes("close instagram")) {
        closeApp("instagram");
    } else if (message.includes("scroll down instagram")) {
        scrollApp("instagram", "down");
    } else if (message.includes("scroll up instagram")) {
        scrollApp("instagram", "up");
    } else if (message.includes("refresh instagram")) {
        refreshApp("instagram");
    }
    
    // ChatGPT related commands
    else if (message.includes("open chatgpt")) {
        openAppWithControl("chatgpt", "https://www.chatgpt.ai/");
    } else if (message.includes("close chatgpt")) {
        closeApp("chatgpt");
    }

    // Handle "exit" command to stop the assistant
    else if (message.includes("exit") || message.includes("quit")) {
        speak("Goodbye!");
        recognition.stop();
        isRecognizing = false;
    }
    
    // Additional commands like Google, YouTube, etc.
    else if (message.includes("open google")) {
        let searchTerm = message.split(" ").slice(2).join(" ");
        window.open(`https://www.google.com/search?q=${searchTerm}`);
        speak(`I've opened Google and searched for ${searchTerm}`);
    }

    else if (message.includes("open youtube")) {
        let searchTerm = message.split(" ").slice(2).join(" ");
        window.open(`https://www.youtube.com/results?search_query=${searchTerm}`);
        speak(`I've opened YouTube and searched for ${searchTerm}`);
    }
    
    else {
        speak("I'm sorry, I didn't understand that. Please try again.");
    }
}
