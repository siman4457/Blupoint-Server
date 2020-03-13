// import React, { useState } from "react";

// const AddSensorModal = ({ show, hide }) => {
//   const showHideClassName = show ? "modal is-active" : "modal";
//   const [sensorName, setSensorName] = useState("");
//   const [macAddress, setMacAddress] = useState(0);

//   const handleSubmit = () => {

//     fetch("/api/create_sensor", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//       },
//       body: JSON.stringify({
//         name: "test sensor",
//         macAddress: 123
//       })
//     })
//       .then(res => res.json())
//       .then(messages => {
//         console.log("messages: ", messages);
//       });
//   };

//   const handleSubmit = (async () => {
//     const rawResponse = await fetch('/api/create_sensor', {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         name: "test sensor",
//         macAddress: 123
//       })
//     });
//     const content = await rawResponse.json();

//     console.log(content);
//   })();



//   return (
//     <div>
//       <div className={showHideClassName}>
//         <div className="modal-background"></div>
//         <div className="modal-card">
//           <header className="modal-card-head">
//             <p className="modal-card-title">Modal title</p>
//             <button
//               className="delete"
//               aria-label="close"
//               onClick={hide}
//             ></button>
//           </header>
//           <section className="modal-card-body">
//             <h1 className="title">Add a new sensor</h1>
//             <div className="field">
//               <p className="control has-icons-left has-icons-right">
//                 <input
//                   className="input"
//                   type="text"
//                   placeholder="Name"
//                   onChange={event => setSensorName(event.target.value)}
//                 />
//                 <span className="icon is-small is-left">
//                   <i className="fas fa-envelope"></i>
//                 </span>
//                 <span className="icon is-small is-right">
//                   <i className="fas fa-check" />
//                 </span>
//               </p>
//             </div>
//             <div className="field">
//               <p className="control has-icons-left">
//                 <input
//                   className="input"
//                   type="text"
//                   placeholder="Mac Address"
//                   onChange={event => setMacAddress(event.target.value)}
//                 />
//                 <span className="icon is-small is-left">
//                   <i className="fa fa-address-card" aria-hidden="true" />
//                 </span>
//               </p>
//             </div>
//           </section>
//           <footer className="modal-card-foot">
//             <button className="button is-success" onClick={handleSubmit}>
//               Save
//             </button>
//             <button className="button" onClick={hide}>
//               Cancel
//             </button>
//           </footer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddSensorModal;



import React, { Component } from 'react'

export default class AddSensorModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sensorName: '',
      macAddress: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    console.log(JSON.stringify({
      name: 'test'
    }))

    fetch('/api/create_sensor', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sensorName: this.state.sensorName,
        macAddress: this.state.macAddress
      }),
    }).then(res => res.json())
      .catch(err => {
        console.log(err);
        console.log(JSON.stringify({
          sensorName: this.state.sensorName,
          macAddress: this.state.macAddress
        }));
      }
      );
    // .then(response => {
    //   console.log(response)
    // });

  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });

  };

  render() {
    const showHideClassName = this.props.show ? "modal is-active" : "modal";
    return (
      <div>
        <div className={showHideClassName}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Modal title</p>
              <button
                className="delete"
                aria-label="close"
                onClick={this.props.hide}
              ></button>
            </header>
            <section className="modal-card-body">
              <h1 className="title">Add a new sensor</h1>
              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input
                    name="sensorName" className="input" type="text" placeholder="Enter Sensor Name"
                    value={this.state.sensorName}
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-check" />
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    name="macAddress" className="input" type="text" placeholder="Enter mac address"
                    value={this.state.macAddress}
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fa fa-address-card" aria-hidden="true" />
                  </span>
                </p>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success" onClick={this.handleSubmit}>
                Save
              </button>
              <button className="button" onClick={this.props.hide}>
                Cancel
              </button>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}