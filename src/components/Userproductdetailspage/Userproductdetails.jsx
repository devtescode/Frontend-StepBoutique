import { useEffect, useState } from "react"
import Navbar from '../Navbar-page/Navbar'
import UserNavbar from '../UserNavbar/UserNavbar'
import { Container, Row, Col, Card, Button, ProgressBar, Form, Badge } from "react-bootstrap"
import { Star, StarFill, Facebook, Twitter, Clock, InfoCircle } from "react-bootstrap-icons"
import axios from "axios"
import { useParams } from "react-router-dom"
import Loader from "../Loader-page/Loader"
import Logo from '../../assets/Logofolder/logo.png'
import { State, City } from "country-state-city";

const Userproductdetails = () => {
    const { id: productId } = useParams(); // Get productId from URL
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedStateIso, setSelectedStateIso] = useState("");

    const states = State.getStatesOfCountry("NG");



    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:4500/admin/getProduct/${id}`);
                setProduct(response.data.product);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
            setLoading(false);
        };

        fetchProduct();
    }, [id]);


    const addToCart = async (productId, quantity, state, city, productName, image, description) => {
        try {
            const storedUser = localStorage.getItem("userDatas");
    
            if (!state || !city) {
                alert("Please select a state and city before adding to cart.");
                return;
            }
    
            if (!storedUser) {
                console.error("User not found in localStorage");
                return;
            }
    
            const { userId } = JSON.parse(storedUser);
    
            if (!productName || !image || !description) {
                console.error("Product details are missing:", { productName, image, description });
                alert("Product details are incomplete. Please try again.");
                return;
            }
    
            const cartItem = { userId, productId, quantity, state, city, productName, image, description };
            const response = await fetch("http://localhost:4500/usercallerfetch/useraddtocart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cartItem),
            });
    
            if (!response.ok) {
                throw new Error("Failed to add item to cart");
            }
    
            // const data = await response.json();
            // console.log("Response from backend:", data);
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("An error occurred while adding the item to the cart. Please try again.");
        }
    };

    const initialTime = 18 * 3600 + 43 * 60 + 16; // Convert to seconds
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours}h : ${minutes}m : ${secs}s`;
    };





    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Loader />
            </div>
        );
    }



    return (
        <div>
            <Navbar />
            <UserNavbar />
            <Container fluid className="py-3 shadow-lg bg-light" style={{ marginTop: "100px" }}>
                <Row>
                    <Col lg={8}>
                        <Row>
                            <Col xs={12} md={5}>
                                <div className="position-relative">
                                    <Badge bg="danger" className="position-absolute top-0 start-0 z-1 m-2">
                                        {product.productName}
                                    </Badge>
                                    <Card className="border-0 mb-3">
                                        <Card.Body className="p-0">
                                            <img
                                                src={product.image}
                                                alt={product.productName}
                                                // width={300}
                                                // height={400}
                                                className="img-fluid"
                                            />
                                        </Card.Body>
                                    </Card>

                                    <div className="mb-3">
                                        <h6>SHARE THIS PRODUCT</h6>
                                        <div className="d-flex gap-2">
                                            <Button variant="outline-secondary" size="sm" className="rounded-circle">
                                                <Facebook />
                                            </Button>
                                            <Button variant="outline-secondary" size="sm" className="rounded-circle">
                                                <Twitter />
                                            </Button>
                                            <Button variant="outline-secondary" size="sm" className="rounded-circle">
                                                <i class="ri-whatsapp-fill"></i>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} md={6}>
                                <div className="mb-3">
                                    <Badge bg="primary" className="me-1">
                                        Official Store
                                    </Badge>
                                    <Badge bg="info">Tech week deal</Badge>
                                </div>
                                <h4 className="mb-3">
                                    <span className="text-primary">{product.productName}</span>

                                </h4>
                                <h3>{product.description}</h3>


                                <Card className="mb-3 border-danger">
                                    <Card.Header className="bg-danger text-white d-flex justify-content-between align-items-center">
                                        <div>
                                            <i className="bi bi-lightning-fill"></i> Flash Sales
                                        </div>
                                        <div>
                                            <Clock className="me-1" />
                                            Time Left: {formatTime(timeLeft)}
                                        </div>
                                    </Card.Header>
                                    <Card.Body>
                                        <div className="d-flex align-items-baseline mb-2">
                                            <h3 className="mb-0 me-2">₦{product.price.toLocaleString()}</h3>
                                            <del className="text-muted">₦{(product.price * 2).toLocaleString()}</del>
                                            {/* <Badge bg="warning" text="dark" className="ms-2">
                                                -9%
                                            </Badge> */}
                                        </div>
                                        <div className="mb-2">
                                            <small>24 items left</small>
                                        </div>
                                        <ProgressBar now={60} variant="warning" className="mb-2" />
                                        <div>
                                            <small>Delivery</small>
                                        </div>
                                    </Card.Body>
                                </Card>

                                <div className="mb-3">
                                    <div className="d-flex" style={{ alignItems: "center" }}>
                                        {[1].map((star) => (
                                            <i className="ri-heart-fill fs-4" key={star}></i>
                                        ))}
                                        <span className="ms-2">({product.likes?.length || 0} {product.likes?.length === 1 ? 'Like' : 'Likes'} ratings)</span>

                                    </div>
                                </div>

                                <Button
                                    style={{ backgroundColor: "#23527c" }}
                                    size="lg"
                                    className="w-100 mb-3"
                                    onClick={() => addToCart(
                                        product?._id,
                                        1,
                                        selectedState,
                                        selectedCity,
                                        product?.productName,  // ✅ Pass correct product name
                                        product?.image,        // ✅ Pass product image
                                        product?.description   // ✅ Pass product description
                                    )}
                                >
                                    Add to Cart
                                </Button>




                                <Card className="mb-3">
                                    <Card.Header>PROMOTIONS</Card.Header>
                                    <Card.Body>
                                        <ul className="list-unstyled">
                                            <li className="mb-2">
                                                <InfoCircle className="text-warning me-2" />
                                                Call 08064864821 To Place Your Order
                                            </li>
                                            {/* <li className="mb-2">
                                                <InfoCircle className="text-warning me-2" />
                                                Need extra money? Loan up to N500,000 on the JumiaPay Android app.
                                            </li> */}
                                            <li>
                                                <InfoCircle className="text-warning me-2" />
                                                Enjoy cheaper delivery fees when you select a PickUp Station at checkout.
                                            </li>
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={4}>
                        <Card className="mb-3">
                            <Card.Header>DELIVERY & RETURNS</Card.Header>
                            <Card.Body>
                                <div className="mb-3">
                                    <div className="d-flex align-items-center mb-2">
                                        <img
                                            src={Logo}
                                            alt="StepStyle"
                                            width={30}
                                            height={30}
                                            className="img-fluid"
                                        />StepStyle
                                    </div>
                                    <p className="small">
                                        The BEST products, delivered faster. Now PAY on DELIVERY, Cash or Bank Transfer Anywhere, Zero Wahala!{" "}
                                        <a href="#" className="text-decoration-none">
                                            Details
                                        </a>
                                    </p>
                                </div>
                                {/* 
                                <Form.Select className="mb-2 p-2" onChange={(e) => setSelectedState(e.target.value)}>
                                    <option value="">Select State</option>
                                    {states.map((s) => (
                                        <option key={s.isoCode} value={s.isoCode}>
                                            {s.name}
                                        </option>
                                    ))}
                                </Form.Select> */}

                                {/* <Form.Select className="mb-2 p-2" onChange={(e) => setSelectedState(e.target.value)}>
                                    <option value="">Select State</option>
                                    {states.map((s) => (
                                        <option key={s.isoCode} value={s.name}> 
                                            {s.name}
                                        </option>
                                    ))}
                                </Form.Select> */}


                                {/* <Form.Select
                                    className="p-2"
                                    onChange={(e) => setSelectedCity(e.target.value)}
                                    disabled={!selectedState} // Disable until a state is selected
                                >
                                    <option value="">Select City</option>
                                    {City.getCitiesOfState("NG", selectedState).map((city) => (
                                        <option key={city.name} value={city.name}>
                                            {city.name}
                                        </option>
                                    ))}
                                </Form.Select> */}
                                <Form.Select
                                    className="mb-2 p-2"
                                    onChange={(e) => {
                                        const selectedIso = e.target.value; // Get selected ISO code
                                        const selectedStateName = states.find((s) => s.isoCode === selectedIso)?.name;

                                        setSelectedStateIso(selectedIso); // Store ISO code for city selection
                                        setSelectedState(selectedStateName); // Store full name for backend
                                    }}
                                >
                                    <option value="">Select State</option>
                                    {states.map((s) => (
                                        <option key={s.isoCode} value={s.isoCode}>
                                            {s.name}
                                        </option>
                                    ))}
                                </Form.Select>


                                <Form.Select
                                    className="p-2"
                                    onChange={(e) => setSelectedCity(e.target.value)}
                                    disabled={!selectedStateIso} // Use ISO code here
                                >
                                    <option value="">Select City</option>
                                    {City.getCitiesOfState("NG", selectedStateIso).map((city) => (
                                        <option key={city.name} value={city.name}>
                                            {city.name}
                                        </option>
                                    ))}
                                </Form.Select>



                                <div className="mb-3 border-bottom pb-3">
                                    <div className="d-flex">
                                        <div className="me-3">
                                            <i class="ri-team-line fs-4 fw-bold"></i>
                                        </div>
                                        <div>
                                            <h6>
                                                Pickup Station{" "}
                                                <a className="small">
                                                    Details
                                                </a>
                                            </h6>
                                            <p className="small mb-1">Delivery Fees ₦ 700</p>
                                            <p className="small">
                                                Ready for pickup between 24 March and 25 March if you place your order within the next 45mins
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <div className="d-flex">
                                        <div className="me-3">
                                            <i class="ri-verified-badge-line fs-4 fw-bold"></i>
                                        </div>
                                        <div>
                                            <h6>Return Policy</h6>
                                            <p className="small">
                                                Free return within 7 days for ALL eligible items{" "}
                                                <a href="#" className="text-decoration-none">
                                                    Details
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Userproductdetails;
