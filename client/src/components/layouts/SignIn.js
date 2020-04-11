// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const SignIn = () => {
//   const [user, setUser] = useState("");
//   const [password, setPassword] = useState("");

//   //CURRENTLY NOT PROPERLY AUTHENTICATING. THE LOGIN BUTTON AUTO DIRECTS TO THE DASHBOARD PAGE.
//   //REF: https://youtu.be/ZwFA3YMfkoc?t=2023
//   return (
//     <div>
//       <section className="hero is-primary is-fullheight">
//         <div className="hero-body">
//           <div className="container">

//             <div className="columns is-centered">
//               <div className="column is-5-tablet is-4-desktop is-3-widescreen">
//                 <img src="./logo.png" alt='error loading image' />
//                 <br />
//                 <form action="" className="box">
//                   <div className="field">
//                     <label htmlFor="" className="label">
//                       Email
//                     </label>
//                     <div className="control has-icons-left">
//                       <input
//                         type="email"
//                         placeholder="e.g. bobsmith@gmail.com"
//                         className="input"
//                         required
//                         onChange={event => setUser(event.target.value)}
//                       />
//                       <span className="icon is-small is-left">
//                         <i className="fa fa-envelope" />
//                       </span>
//                     </div>
//                   </div>
//                   <div className="field">
//                     <label htmlFor="" className="label">
//                       Password
//                     </label>
//                     <div className="control has-icons-left">
//                       <input
//                         type="password"
//                         placeholder="*******"
//                         className="input"
//                         required
//                         onChange={event => setPassword(event.target.value)}
//                       />
//                       <span className="icon is-small is-left">
//                         <i className="fa fa-lock"></i>
//                       </span>
//                     </div>
//                   </div>
//                   <div className="field">
//                     <label htmlFor="" className="checkbox">
//                       <input type="checkbox" />
//                       Remember me
//                     </label>
//                   </div>
//                   <Link
//                     // onClick={event =>
//                     //   !user || !password ? event.preventDefault() : null
//                     // }
//                     className="field"
//                     to={`/?user=${user}`}
//                   >
//                     <button className="button is-success">Login</button>
//                   </Link>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default SignIn;
