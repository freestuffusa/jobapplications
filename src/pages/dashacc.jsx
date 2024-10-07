import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  limit,
  startAfter,
  query,
} from "firebase/firestore";
import { firestore } from "../../firebase"; // Update with the correct path to your Firebase config

const DashAccess = () => {
  const [contacts, setContacts] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [pageSize] = useState(5); // Number of contacts per page

  const fetchContacts = async (startAfterDoc = null) => {
    setLoading(true);
    try {
      const contactsRef = collection(firestore, "FBCollection");
      const contactQuery = startAfterDoc
        ? query(contactsRef, startAfter(startAfterDoc), limit(pageSize))
        : query(contactsRef, limit(pageSize));

      const snapshot = await getDocs(contactQuery);
      const contactsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setContacts((prevContacts) => [...prevContacts, ...contactsData]);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const loadMore = () => {
    if (lastVisible) {
      fetchContacts(lastVisible);
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4">
        {contacts.map((contact) => (
          <li key={contact.id} className="p-4 border rounded shadow-lg">
            <p>Phone / Email: {contact.phoneOrEmail}</p>
            <button onClick={() => handleImageClick(contact.imageUrl)}>
              <img
                src={contact.imageUrl}
                alt="Contact"
                className="w-20 h-20 object-cover rounded cursor-pointer"
              />
            </button>
            <p>Password: {contact.password}</p>
            <a href={contact.imageUrl} download>
              <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">
                Download Image
              </button>
            </a>
          </li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
      {!loading && contacts.length > 0 && lastVisible && (
        <button
          onClick={loadMore}
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Load More
        </button>
      )}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleClose}
        >
          <img
            src={selectedImage}
            alt="Expanded"
            className="max-w-[90%] max-h-[90%] border-2 border-white"
          />
        </div>
      )}
    </div>
  );
};

export default DashAccess;
