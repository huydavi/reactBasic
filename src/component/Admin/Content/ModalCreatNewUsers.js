import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaFolderPlus } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const ModalCreatNewUsers = (props) => {
  const { show, setShow } = props;

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("User");
    setImage("");
    setPreviewImage("");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("User");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } else {
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmitCreateUsers = async () => {
    const isvalidateEmail = validateEmail(email);

    if (!isvalidateEmail) {
      toast.error("Invalid Email");
      return;
    }

    if (!password) {
      toast.error("Please type password");
      return;
    }

    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    data.append("username", username);
    data.append("role", role);
    data.append("userImage", image);

    let res = await axios.post(
      "http://localhost:8081/api/v1/participant",
      data
    );
    console.log(res.data);
    if (res.data && res.data.EC === 0) {
      toast.success(res.data.EM);
      handleClose();
    }
    if (res.data && res.data.EC !== 0) {
      toast.error(res.data.EM);
    }
  };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">User Name</label>
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="form-control"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select
                value={role}
                onChange={(event) => setRole(event.target.value)}
                className="form-select"
              >
                <option selected value="USER">
                  User
                </option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="labelUpload">
                <FaFolderPlus />
                Upload File Image
              </label>
              <input
                type="file"
                id="labelUpload"
                hidden
                onChange={(event) => handleUploadImage(event)}
              />
            </div>
            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} />
              ) : (
                <span>Preview Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitCreateUsers()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreatNewUsers;
