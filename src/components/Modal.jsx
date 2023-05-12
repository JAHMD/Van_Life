import { createPortal } from "react-dom";
import { BsExclamationCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function Modal({ closeModal }) {
	return createPortal(
		<section className="overlay">
			<div className="modal">
				<BsExclamationCircleFill />
				<p>You already have this van in your collection.</p>
				<div className="btns-container">
					<button className="link-button" onClick={closeModal}>
						Close
					</button>
					<Link className="link-button" to="/vans">
						Go to vans
					</Link>
				</div>
			</div>
		</section>,
		document.body
	);
}

export default Modal;
