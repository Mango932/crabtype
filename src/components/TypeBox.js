import React, { useState, useEffect } from "react";
import axios from "axios";

function TypeBox() {
    const [randomWords, setRandomWords] = useState([]);
    const [backgroundText, setBackgroundText] = useState([]);
    const [typedText, setTypedText] = useState("");
    const [wrongChar, setWrongChar] = useState("");

    useEffect(() => {
        axios
            .get("https://random-word-api.herokuapp.com/word?number=20")
            .then((response) => {
                const words = response.data;
                const randomWordsString = words.join(" ");
                setRandomWords(randomWordsString);
                setBackgroundText(randomWordsString);
            })
            .catch((error) => {
                console.error("Error fetching random words:", error);
            });
    }, []);

    const handleTextareaChange = () => {
        let text = document.getElementById("typeBox").value;

        if (text === randomWords.slice(0, text.length)) {
            setWrongChar("");
            setTypedText(text);
            setBackgroundText(
                randomWords.slice(text.length, randomWords.length)
            );
            document.getElementById("wrongChar").style.boxShadow = "none";
            document.getElementById("typedText").style.boxShadow =
                "1.2px 0 0 0 #c1c0b7";
        } else if (wrongChar === "") {
            setWrongChar(randomWords.slice(text.length - 1, text.length));
            if (randomWords.slice(text.length - 1, text.length) === " ") {
                setWrongChar("_");
            }
            setBackgroundText(
                randomWords.slice(text.length, randomWords.length)
            );
            document.getElementById("wrongChar").style.boxShadow =
                "1.2px 0 0 0 rgb(127 29 29)";
            document.getElementById("typedText").style.boxShadow = "none";
        } else {
            let freeze = text.slice(0, text.length - 1);
            document.getElementById("typeBox").value = freeze;
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="w-[800px] h-[200px] m-0 p-0 font-mono font-semibold text-2xl relative">
                <span id="typedText" className=" text-[#c1c0b7] transition-all">
                    {typedText}
                </span>

                <span id="wrongChar" className="text-red-900 transition-all">
                    {wrongChar}
                </span>
                <span className="text-[#646669]">{backgroundText}</span>
            </div>

            <textarea
                className="w-[800px] h-[200px] overflow-hidden bg-transparent resize-none absolute m-0 p-0 font-mono font-semibold text-2xl text-transparent outline-none"
                data-gramm="false"
                data-gramm_editor="false"
                data-enable-grammarly="false"
                id="typeBox"
                onChange={() => handleTextareaChange()}
            ></textarea>
        </div>
    );
}

export default TypeBox;
