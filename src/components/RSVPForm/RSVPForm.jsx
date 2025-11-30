// import React, { useState, useEffect } from "react";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   query,
//   where,
//   Timestamp,
// } from "firebase/firestore";
// import { db } from "../../components/FirebaseConfig/firebaseConfig";
// import Confetti from "react-confetti";
// import { motion } from "framer-motion";
// import "./RSVPForm.css";

// const MAX_GUESTS = 21;

// const RSVPForm = () => {
//   const [form, setForm] = useState({
//     name: "",
//     guests: 1,
//     message: "",
//     attending: "yes", // "yes" or "no"
//   });
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [totalGuests, setTotalGuests] = useState(0);
//   const [isFull, setIsFull] = useState(false);
//   const [isDuplicate, setIsDuplicate] = useState(false);

//   // Fetch total attending guests on mount or when someone submits
//   useEffect(() => {
//     const fetchGuestCount = async () => {
//       try {
//         const snapshot = await getDocs(collection(db, "rsvps"));
//         let total = 0;
//         snapshot.forEach((docSnap) => {
//           const data = docSnap.data();
//           // Only count people who are attending (or older docs without 'attending' field)
//           if (data.attending !== "no") {
//             total += Number(data.guests) || 0;
//           }
//         });
//         setTotalGuests(total);
//         if (total >= MAX_GUESTS) setIsFull(true);
//       } catch (err) {
//         console.error("Error counting guests:", err);
//       }
//     };
//     fetchGuestCount();
//   }, [submitted]);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const isAttending = form.attending === "yes";

//     // If we're full and this person wants to attend, don't proceed
//     if (isFull && isAttending) return;

//     setLoading(true);
//     try {
//       // 🔍 1. Check for duplicate name
//       const nameQuery = query(
//         collection(db, "rsvps"),
//         where("name", "==", form.name.trim())
//       );
//       const nameSnapshot = await getDocs(nameQuery);

//       if (!nameSnapshot.empty) {
//         // Name already exists
//         setIsDuplicate(true);
//         setLoading(false);
//         return;
//       }

//       // Guests to save (0 if not attending)
//       const guestsToSave = isAttending ? Number(form.guests) || 0 : 0;

//       // 🔢 2. Check total guest count before adding (only if attending)
//       if (isAttending) {
//         const allDocs = await getDocs(collection(db, "rsvps"));
//         let total = 0;
//         allDocs.forEach((docSnap) => {
//           const data = docSnap.data();
//           if (data.attending !== "no") {
//             total += Number(data.guests) || 0;
//           }
//         });

//         if (total + guestsToSave > MAX_GUESTS) {
//           setIsFull(true);
//           setLoading(false);
//           return;
//         }
//       }

//       // ✅ 3. Add new RSVP
//       await addDoc(collection(db, "rsvps"), {
//         name: form.name.trim(),
//         guests: guestsToSave,
//         message: form.message,
//         attending: form.attending, // "yes" or "no"
//         createdAt: Timestamp.now(),
//       });

//       setSubmitted(true);
//     } catch (error) {
//       console.error("Error submitting RSVP:", error);
//       alert("Error submitting RSVP");
//     }
//     setLoading(false);
//   };

//   const isAttending = form.attending === "yes";
//   const spotsLeft = Math.max(0, MAX_GUESTS - totalGuests);

//   return (
//     <motion.section
//       id="rsvp"
//       className="rsvp-section"
//       initial={{ opacity: 0, y: 60 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8 }}
//       viewport={{ once: true }}
//     >
//       {submitted && isAttending && <Confetti />}

//       {/* Inner wrapper for nice width on all screen sizes */}
//       <div className="rsvp-inner">
//         <h2 className="rsvp-title">Reserve Your Spot 🎁</h2>

//         {isFull && !submitted && (
//           <p className="thank-you">
//             The guest list is currently full ({MAX_GUESTS} spots taken). 🎈 If
//             you can’t make it, you can still let us know below so we can keep an
//             accurate headcount.
//           </p>
//         )}

//         {isDuplicate ? (
//           <p className="thank-you">
//             You already responded for Abdoul’s party 🎈 Can’t wait to see you
//             there (or thank you for letting us know)!
//           </p>
//         ) : submitted ? (
//           form.attending === "yes" ? (
//             <p className="thank-you">
//               Thank you, {form.name}! We can’t wait to celebrate with you 🎉
//             </p>
//           ) : (
//             <p className="thank-you">
//               Thank you, {form.name}, for letting us know you can’t make it. We
//               will miss you, and this helps us give the restaurant an accurate
//               headcount.
//             </p>
//           )
//         ) : (
//           <>
//             <p className="remaining">{spotsLeft} spots left 🎟️</p>

//             <form className="rsvp-form" onSubmit={handleSubmit}>
//               {/* Name */}
//               <div className="input-group">
//                 <input
//                   type="text"
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   required
//                   placeholder=" "
//                 />
//                 <label>Your Name</label>
//               </div>

//               {/* NEW: Card-style attending choice */}
//               <div className="input-group attending-group">
//                 <p className="choice-title">Can you make it?</p>

//                 <div className="choice-row">
//                   <button
//                     type="button"
//                     className={
//                       form.attending === "yes"
//                         ? "choice-card selected"
//                         : "choice-card"
//                     }
//                     onClick={() => setForm({ ...form, attending: "yes" })}
//                   >
//                     Yes
//                   </button>

//                   <button
//                     type="button"
//                     className={
//                       form.attending === "no"
//                         ? "choice-card selected"
//                         : "choice-card"
//                     }
//                     onClick={() => setForm({ ...form, attending: "no" })}
//                   >
//                     No
//                   </button>
//                 </div>
//               </div>

//               {/* Only show guest count if attending */}
//               {isAttending && (
//                 <div className="input-group">
//                   <input
//                     type="number"
//                     name="guests"
//                     min="1"
//                     value={form.guests}
//                     onChange={handleChange}
//                     required
//                     placeholder=" "
//                   />
//                   <label>Number of Guests (including you)</label>
//                 </div>
//               )}

//               {/* Message */}
//               <div className="input-group">
//                 <textarea
//                   name="message"
//                   value={form.message}
//                   onChange={handleChange}
//                   rows="3"
//                   placeholder=" "
//                 />
//                 <label>Message (optional)</label>
//               </div>

//               {/* Submit */}
//               <motion.button
//                 type="submit"
//                 className="submit-btn"
//                 disabled={loading}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.97 }}
//               >
//                 {loading ? "Sending..." : "Submit RSVP"}
//               </motion.button>
//             </form>
//           </>
//         )}
//       </div>
//     </motion.section>
//   );
// };

// export default RSVPForm;





import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../components/FirebaseConfig/firebaseConfig";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import "./RSVPForm.css";

const RSVPForm = () => {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);

    try {
      await addDoc(collection(db, "birthdayMessages"), {
        message: message.trim(),
        createdAt: Timestamp.now(),
      });

      setSent(true);
      setMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <motion.section
      id="rsvp"
      className="rsvp-section"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Confetti />

      <div className="rsvp-inner">
        <h2 className="rsvp-title">🎉 Happy Birthday to Abdoul! 🎉</h2>

        <p className="thank-you">
          Wishing you an unforgettable birthday full of joy, love, and blessings.  
          Enjoy your special day, Abdoul! 🎈🥳🎂
        </p>

        {/* Comment Box */}
        {!sent ? (
          <form className="rsvp-form" onSubmit={handleSendMessage}>
            <div className="input-group">
              <textarea
                name="message"
                rows="4"
                placeholder=" "
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <label>Leave a Birthday Message (optional)</label>
            </div>

            <motion.button
              type="submit"
              className="submit-btn"
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              {loading ? "Sending..." : "Send Message 🎁"}
            </motion.button>
          </form>
        ) : (
          <p className="thank-you">
            🎉 Thank you for your message! Abdoul will be so happy! 💙
          </p>
        )}
      </div>
    </motion.section>
  );
};

export default RSVPForm;



