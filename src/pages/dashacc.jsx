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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const existingIds = new Set(); // To track existing contact IDs

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

      // Check for duplicates before updating state
      const newContacts = contactsData.filter(
        (contact) => !existingIds.has(contact.id)
      );

      // Update the Set with new IDs
      newContacts.forEach((contact) => existingIds.add(contact.id));

      setContacts((prevContacts) => [...prevContacts, ...newContacts]);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      setTotalPages(Math.ceil(existingIds.size / pageSize)); // Calculate total pages
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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Reset contacts and existing IDs for the new page
    existingIds.clear();
    setContacts([]);
    fetchContacts();
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Contact Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Phone / Email</th>
              <th>Password</th>
              <th>Image</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>{contact.phoneOrEmail}</td>
                <td>{contact.password}</td>
                <td>
                  <div className="flex items-center">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={contact.imageUrl} // Assuming you have the image URL in your contact data
                          alt="Contact Avatar"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <th>
                  <a href={contact.imageUrl} download>
                    <button className="btn btn-ghost btn-xs">
                      Download Image
                    </button>
                  </a>
                </th>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Phone / Email</th>
              <th>Password</th>
              <th>Image</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
      {loading && <p>Loading...</p>}

      {/* Pagination Controls */}
      <div className="join mt-4">
        <button
          className="join-item btn"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          «
        </button>
        <button className="join-item btn">Page {currentPage}</button>
        <button
          className="join-item btn"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>

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
