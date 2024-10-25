import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase"; // Update with the correct path to your Firebase config

const DashAccess = () => {
  const [contacts, setContacts] = useState([]);
  const [displayedContacts, setDisplayedContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [pageSize] = useState(5); // Number of contacts per page
  const [currentPage, setCurrentPage] = useState(1);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const contactsRef = collection(firestore, "FBCollection");
      const snapshot = await getDocs(contactsRef);
      const contactsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setContacts(contactsData);
      setDisplayedContacts(contactsData.slice(0, pageSize)); // Set initial contacts to display
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    setDisplayedContacts(contacts.slice(start, end));
  }, [currentPage, contacts]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(contacts.length / pageSize)) {
      setCurrentPage(newPage);
    }
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
            {displayedContacts.map((contact) => (
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
                        <img src={contact.imageUrl} alt="Contact Avatar" />
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
          disabled={currentPage === Math.ceil(contacts.length / pageSize)}
        >
          »
        </button>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setSelectedImage(null)}
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
