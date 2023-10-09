import axios from "axios";
import { useState, useEffect } from "react";
import "../../static/razorpay.css";
import authService from "../services/authService";
import UserService from '../services/userServices';
import { useParams } from 'react-router-dom'
// import './Razorpay.css';
import { useNavigate } from "react-router-dom";

function App() {
	const { eventId } = useParams();
	const [userId, setUserId] = useState("");


	const navigate = useNavigate();
	const [book, setBook] = useState({
		name: "The Fault In Our Stars",
		author: "John Green",
		img: "https://images-na.ssl-images-amazon.com/images/I/817tHNcyAgL.jpg",
		price: 350,
	});

	useEffect(()=>{
        const user = authService.getCurrentUser();
        if (user) {
            setUserId(user.user.userId);
            const userId= user.user.userId;
			// const {eventId}= props;
            // setEventId(props.eventId);

        }
        
        // console.log(eventDetails)
        
    },[]);

	const initPayment = (data) => {
		const options = {
			key: "rzp_test_MzMRs3YLedkCKa",
			amount: data.amount,
			currency: data.currency,
			name: book.name,
			description: "Test Transaction",
			image: book.img,
			order_id: data.id,
			handler: async (response) => {
				try {
					const verifyUrl = "http://localhost:3000/api/payment/verify";
					const { data } = await axios.post(verifyUrl, response);
					// console.log(data.message);
					if (data.message == 'Payment verified successfully') {
						console.log(eventId);
						UserService.registerEvent(userId, eventId);
						navigate("/");
					}
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		// console.log("raz")
		rzp1.open();
	};

	const handlePayment = async () => {
		try {
			const orderUrl = "http://localhost:3000/api/payment/orders";
			const { data } = await axios.post(orderUrl, { amount: book.price });
			console.log(data);
			initPayment(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="App">
			<div className="book_container">
				<img src={book.img} alt="book_img" className="book_img" />
				<p className="book_name">{book.name}</p>
				<p className="book_author">By {book.author}</p>
				<p className="book_price">
					Price : <span>&#x20B9; {book.price}</span>
				</p>
				<button onClick={handlePayment} className="buy_btn">
					buy now
				</button>
			</div>
		</div>
	);
}

export default App;