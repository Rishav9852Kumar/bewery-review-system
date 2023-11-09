// import React, { useContext, useState, useEffect } from "react";
// import { UserContext } from "../context/userContext";
// import { PlayerContext } from "../context/playerContext";
// import { Navigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import {
//   Container,
//   Card,
//   CardBody,
//   CardTitle,
//   Table,
//   Button,
//   Dropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   Input,
// } from "reactstrap";
// import "./user.css";

// const User = () => {
//   const context = useContext(UserContext);
//   const playerContext = useContext(PlayerContext);

//   const [userSubjects, setUserSubjects] = useState([]);
//   const [subjectList, setSubjectList] = useState([]);
//   const [selectedSubject, setSelectedSubject] = useState("");
//   const [openDropdowns, setOpenDropdowns] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       // Fetching user's subjects data
//       if (playerContext.player && playerContext.player.gameUid) {
//         try {
//           const userSubjectsResponse = await fetch(
//             `https://language-learning-game-backend.rishavkumaraug20005212.workers.dev/user/languages?userId=${playerContext.player.gameUid}`
//           );
//           const userData = await userSubjectsResponse.json();
//           setUserSubjects(userData);

//           // Fetching the list of all subjects
//           const subjectListResponse = await fetch(
//             "https://language-learning-game-backend.rishavkumaraug20005212.workers.dev/languages"
//           );
//           const allSubjects = await subjectListResponse.json();

//           // Filtering subjects that are not in the user's subject list
//           const filteredSubjects = allSubjects.filter(
//             (subject) =>
//               !userData.find(
//                 (userSubject) => userSubject.SubjectName === subject.SubjectName
//               )
//           );
//           setSubjectList(filteredSubjects);
//         } catch (error) {
//           console.error("Error fetching user subjects or subject list:", error);
//         }
//       }
//     };

//     fetchData();
//   }, [playerContext.player]);

//   if (!context.user?.uid) {
//     return <Navigate to="/signin" />;
//   }
//   if (!playerContext.player?.gameUid) {
//     return <Navigate to="/signin" />;
//   }

//   const name = playerContext.player.name || "guest";
//   const email = context.user.email;
//   const gameUid = playerContext.player.gameUid || "user not logged in";

//   const handleResetProgress = async (subjectId) => {
//     console.log("Resetting progress for subject with ID:", subjectId);
//     try {
//       const response = await fetch(
//         `https://language-learning-game-backend.rishavkumaraug20005212.workers.dev/game/userScore?userId=${playerContext.player.gameUid}&language=${subjectId}`,
//         {
//           method: "POST",
//         }
//       );
//       if (response.ok) {
//         console.log("User score updated successfully");
//         // Refetching user's subjects
//         const userSubjectsResponse = await fetch(
//           `https://language-learning-game-backend.rishavkumaraug20005212.workers.dev/user/languages?userId=${playerContext.player.gameUid}`
//         );
//         const userData = await userSubjectsResponse.json();
//         setUserSubjects(userData);
//         toast.success("User Progress Reset Done.");
//       } else {
//         console.error("Error resetting progress:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error resetting progress:", error);
//     }
//   };

//   const handleDeleteSubject = (subjectId) => {
//     console.log("Deleting subject with ID:", subjectId);
//     toast.warning("Delete is disabled for now try (Reset).");
//     deleteSubject(subjectId);
//   };

//   async function deleteSubject(subjectId) {
//     try {
//       await fetch(
//         `https://language-learning-game-backend.rishavkumaraug20005212.workers.dev/user/languages?userId=${playerContext.player.gameUid}&subjectId=${subjectId}`,
//         {
//           method: "DELETE",
//         }
//       );
//       const userSubjectsResponse = await fetch(
//         `https://language-learning-game-backend.rishavkumaraug20005212.workers.dev/user/languages?userId=${playerContext.player.gameUid}`
//       );
//       const userData = await userSubjectsResponse.json();
//       setUserSubjects(userData);
//       console.log("Subject deleted with ID:", subjectId);
//     } catch (error) {
//       console.error("Error deleting subject:", error);
//     }
//   }

//   const handleAddSubject = () => {
//     if (selectedSubject) {
//       addUserSubject(selectedSubject);
//       console.log("Adding subject:", selectedSubject);
//     }
//   };

//   async function addUserSubject(subjectName) {
//     try {
//       // Making a POST request to add the subject
//       await fetch(
//         `https://language-learning-game-backend.rishavkumaraug20005212.workers.dev/user/languages?userId=${playerContext.player.gameUid}&subjectName=${subjectName}`,
//         {
//           method: "POST",
//         }
//       );
//       // After a successful request, refetching the user subjects
//       const userSubjectsResponse = await fetch(
//         `https://language-learning-game-backend.rishavkumaraug20005212.workers.dev/user/languages?userId=${playerContext.player.gameUid}`
//       );
//       const userData = await userSubjectsResponse.json();
//       setUserSubjects(userData);
//       toast.success("New Subject Added.");
//       setSelectedSubject("");
//       console.log("Subject added:", subjectName);
//     } catch (error) {
//       console.error("Error adding subject:", error);
//     }
//   }

//   return (
//     <Container fluid className="user-container">
//       <div className="user-details">
//         <h1 className="user-heading">Hello, {name}</h1>
//         <p className="user-info">Email: {email}</p>
//         <p className="user-info">User GameID: {gameUid}</p>
//       </div>

//       <Card className="user-card">
//         <CardBody>
//           <CardTitle className="user-card-title">Subject List</CardTitle>
//           <Table bordered responsive>
//             <thead>
//               <tr>
//                 <th>Subject</th>
//                 <th>Score</th>
//                 <th>Assignments Completed</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {userSubjects.map((subject, index) => (
//                 <tr key={index}>
//                   <td>{subject.SubjectName}</td>
//                   <td>{subject.SubjectScore}</td>
//                   <td>{subject.ExercisesCompleted}</td>
//                   <td>
//                     <Dropdown
//                       isOpen={openDropdowns[subject.SubjectId] || false}
//                       toggle={() =>
//                         toggleDropdown(
//                           subject.SubjectId,
//                           !openDropdowns[subject.SubjectId]
//                         )
//                       }
//                     >
//                       <DropdownToggle caret>Actions</DropdownToggle>
//                       <DropdownMenu>
//                         <DropdownItem
//                           onClick={() =>
//                             handleResetProgress(subject.SubjectName)
//                           }
//                         >
//                           Reset Progress
//                         </DropdownItem>
//                         <DropdownItem
//                           onClick={() => handleDeleteSubject(subject.SubjectId)}
//                         >
//                           Delete
//                         </DropdownItem>
//                       </DropdownMenu>
//                     </Dropdown>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//           <Input
//             type="select"
//             value={selectedSubject}
//             onChange={(e) => setSelectedSubject(e.target.value)}
//             className="subject-dropdown"
//           >
//             <option value="">Select a Subject</option>
//             {subjectList.map((subject, index) => (
//               <option key={index} value={subject.SubjectName}>
//                 {subject.SubjectName}
//               </option>
//             ))}
//           </Input>
//           <Button
//             color="primary"
//             className="add-subject-button"
//             onClick={handleAddSubject}
//           >
//             Add Subject
//           </Button>
//         </CardBody>
//       </Card>
//     </Container>
//   );

//   function toggleDropdown(subjectId, isOpen) {
//     setOpenDropdowns({
//       ...openDropdowns,
//       [subjectId]: isOpen,
//     });
//   }
// };

// export default User;
