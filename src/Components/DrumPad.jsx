import React from 'react';
import $ from "jquery";

const bankOne = [
    {
        keyCode: 81,
        keyTrigger: 'Q',
        id: 'Heater-1',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
        keyCode: 87,
        keyTrigger: 'W',
        id: 'Heater-2',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
        keyCode: 69,
        keyTrigger: 'E',
        id: 'Heater-3',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
        keyCode: 65,
        keyTrigger: 'A',
        id: 'Heater-4',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
        keyCode: 83,
        keyTrigger: 'S',
        id: 'Clap',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
        keyCode: 68,
        keyTrigger: 'D',
        id: 'Open-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
        keyCode: 90,
        keyTrigger: 'Z',
        id: "Kick-n'-Hat",
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
        keyCode: 88,
        keyTrigger: 'X',
        id: 'Kick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
        keyCode: 67,
        keyTrigger: 'C',
        id: 'Closed-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
];

const bankTwo = [
    {
        keyCode: 81,
        keyTrigger: 'Q',
        id: 'Chord-1',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
    },
    {
        keyCode: 87,
        keyTrigger: 'W',
        id: 'Chord-2',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
    },
    {
        keyCode: 69,
        keyTrigger: 'E',
        id: 'Chord-3',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
    },
    {
        keyCode: 65,
        keyTrigger: 'A',
        id: 'Shaker',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
    },
    {
        keyCode: 83,
        keyTrigger: 'S',
        id: 'Open-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
    },
    {
        keyCode: 68,
        keyTrigger: 'D',
        id: 'Closed-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
    },
    {
        keyCode: 90,
        keyTrigger: 'Z',
        id: 'Punchy-Kick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
    },
    {
        keyCode: 88,
        keyTrigger: 'X',
        id: 'Side-Stick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
    },
    {
        keyCode: 67,
        keyTrigger: 'C',
        id: 'Snare',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
    }
];

const DrumPad = (props) => {
    return (
        <div id="pad-col">{props.firstProp.map(drumItem => {
            return (
                <button className="drum-pad" id={drumItem.id}>
                    {drumItem.keyTrigger}
                    <audio src={drumItem.url} className="clip" id={drumItem.keyTrigger} />
                </button>
            )
        })}
        </div>
    )
}

class DrumMachine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: ""
        }
        this.handleClick = this.handleClick.bind(this);
        this.bankToggle = this.bankToggle.bind(this);
        this.powerToggle = this.powerToggle.bind(this);
    }
    componentDidMount() {
        $("button").on("click", this.handleClick);
        $("button").on("keypress", this.handleClick);
        $("#powerSwitch").on("change", this.powerToggle);
        $("#bankSwitch").on("change", this.bankToggle);
        //document.addEventListener("click", this.volumeControl);
    }
    componentWillUnmount() {
        $("button").off("click", this.handleClick);
        $("#powerSwitch").off("change", this.powerToggle);
        $("#bankSwitch").off("change", this.bankToggle);
        //document.removeEventListener("change", this.volumeControl);
    }

    handleClick(event) {
        if (document.getElementById("powerSwitch").checked) {
            if (document.getElementById("bankSwitch").checked) {
                this.setState({ display: "Smooth Piano Kit" });
                let bankType = bankOne.filter(drum => drum.keyTrigger === event.target.innerText);
                event.target.setAttribute("id", bankType[0].id);
                event.target.firstElementChild.setAttribute("src", bankType[0].url);

                event.target.firstElementChild.play();
                this.setState({ display: event.target.id });
                event.target.style.backgroundColor = '#FF8000';
                setTimeout(() => event.target.style.backgroundColor = '#808080', 500);
            } else {
                this.setState({ display: "Heater Kit" });
                let bankType = bankTwo.filter(drum => drum.keyTrigger === event.target.innerText);
                console.log(bankType)
                event.target.setAttribute("id", bankType[0].id);
                event.target.firstElementChild.setAttribute("src", bankType[0].url);
                event.target.firstElementChild.play();
                this.setState({ display: event.target.id });
                event.target.style.backgroundColor = '#FF8000';
                setTimeout(() => event.target.style.backgroundColor = '#808080', 500);
            }
        } else {
            this.setState({ display: "" });
        }
    }

    bankToggle(e) {
        if (document.getElementById("powerSwitch").checked) {
            e.target.checked ? this.setState({ display: "Smooth Piano Kit" }) : this.setState({ display: "Heater Kit" });
        }
    }

    powerToggle(e) {
        e.target.checked ? this.setState({ display: "ON" }) : this.setState({ display: "OFF" });
    }

    render() {
        return (
            <div className="container">
                <span id="title">DRUM MACHINE</span>
                <div id="drum-machine">
                    <span id="logo">@Vic</span>
                    <div className="row" id="container">
                        <div className="col-sm-6" id="pad-col">
                            <DrumPad firstProp={bankOne} />
                        </div>
                        <div className="col-sm-5" id="option-col">
                            <div id="controls">
                                <div className="slider-div">
                                    <span>Power</span>
                                    <label className="switch">
                                        <input type="checkbox" id="powerSwitch" />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                                <div id="display">{this.state.display}</div>
                                <input type="range" id="volume-control" />
                                <div className="slider-div">
                                    <span>Bank</span>
                                    <label className="switch">
                                        <input type="checkbox" id="bankSwitch" />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="author">
                    <span id="authorText">Designed and Coded by</span>
                    <span id="authorName">Victor Anokwuru</span>
                </div>
            </div>
        );
    }
}
export default DrumMachine;