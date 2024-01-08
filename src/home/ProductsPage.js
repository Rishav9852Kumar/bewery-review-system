import React, { useState, useCallback } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import "./ProductsPage.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    featured: false,
    maxPrice: Infinity,
    minRating: 0,
  });
  const sampleProducts = [
    {
      name: "Sample Product 1",
      company: "Sample Company",
      description: "This is a sample description for Product 1.",
      price: 99.99,
      rating: 4.5,
      featured: true,
    },
    // Add more sample products as needed
  ];

  const fetchProducts = useCallback(async () => {
    try {
      const endpoint = "https://my-api-url.com/products";
      const params = {};

      if (filters.featured) params.featured = true;
      if (filters.maxPrice !== Infinity) params.price_lt = filters.maxPrice;
      if (filters.minRating > 0) params.rating_gte = filters.minRating;

      const response = await axios.get(endpoint, { params });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  }, [filters]); // Add filters to the dependency array

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const applyFilters = (e) => {
    e.preventDefault();
    fetchProducts(); // Refetch with updated filter criteria
  };

  return (
    <Container>
      <Form inline onSubmit={applyFilters} className="mb-4">
        <FormGroup check className="mr-2">
          <Label check>
            <Input
              type="checkbox"
              name="featured"
              onChange={handleFilterChange}
            />{" "}
            Featured Only
          </Label>
        </FormGroup>
        <FormGroup className="mr-2">
          <Label for="maxPrice" className="mr-sm-2">
            Max Price:
          </Label>
          <Input
            type="number"
            name="maxPrice"
            id="maxPrice"
            onChange={handleFilterChange}
          />
        </FormGroup>
        <FormGroup className="mr-2">
          <Label for="minRating" className="mr-sm-2">
            Min Rating:
          </Label>
          <Input
            type="number"
            name="minRating"
            id="minRating"
            onChange={handleFilterChange}
          />
        </FormGroup>
        <Button>Apply</Button>
      </Form>
      <Row>
        {products.map((product, index) => (
          <Col xs="12" sm="6" md="4" lg="3" className="mb-4" key={index}>
            <Card className="product-card">
              <CardBody>
                <CardTitle tag="h5">{product.name}</CardTitle>
                <CardSubtitle className="mb-2 text-muted">
                  Company: {product.company}
                </CardSubtitle>
                <CardText>{product.description}</CardText>
                <div className="price">${product.price}</div>
                <div className="rating">Rating: {product.rating}</div>
                {product.featured && (
                  <div className="featured-label">Featured</div>
                )}
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
      <Row>
        {sampleProducts.map((product, index) => (
          <Col xs="12" sm="6" md="4" lg="3" className="mb-4" key={index}>
            <Card className="product-card">
              <CardBody>
                <CardTitle tag="h5">{product.name}</CardTitle>
                <CardSubtitle className="mb-2 text-muted">
                  Company: {product.company}
                </CardSubtitle>
                <CardText>{product.description}</CardText>
                <div className="price">${product.price.toFixed(2)}</div>
                <div className="rating">
                  Rating: {product.rating.toFixed(1)}
                </div>
                {product.featured && (
                  <div className="featured-label">Featured</div>
                )}
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductsPage;
