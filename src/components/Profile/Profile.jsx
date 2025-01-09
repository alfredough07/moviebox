import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import "./Profile.css";

const Profile = ({ user }) => {
  const [profileData, setProfileData] = useState({
    name: "",
    birthdate: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfileData(docSnap.data());
        } else {
          const defaultProfile = {
            name: "",
            birthdate: "",
            email: user.email || "",
          };
          await setDoc(docRef, defaultProfile);
          setProfileData(defaultProfile);
          console.log("Default profile created!");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const saveChanges = async () => {
    try {
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, profileData, { merge: true });
      console.log("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <div className="profile-info">
        <h1>My Profile</h1>
        <div className="profile-field">
          <label>Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={profileData.name || ""}
              onChange={handleInputChange}
            />
          ) : (
            <span>{profileData.name || "Not set"}</span>
          )}
        </div>
        <div className="profile-field">
          <label>Birthdate:</label>
          {isEditing ? (
            <input
              type="date"
              name="birthdate"
              value={profileData.birthdate || ""}
              onChange={handleInputChange}
            />
          ) : (
            <span>{profileData.birthdate || "Not set"}</span>
          )}
        </div>
        <div className="profile-actions">
          {isEditing ? (
            <>
              <button onClick={saveChanges}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
