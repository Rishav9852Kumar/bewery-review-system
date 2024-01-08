import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
} from "reactstrap";

import { Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import "./AddProductPage.css"; 

const AddProductPage = () => {
  const authContext = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset(); // Reset the form after successful submission
  };
 if (!authContext.user?.uid ) {
   return <Navigate to="/access/denied" />;
 }
  return (
    <Container className="add-product-container">
      <h2 className="add-product-title">Add Product</h2>
      <Form onSubmit={handleSubmit(onSubmit)} className="add-product-form">
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter product name"
            {...register("name", { required: "Name is required" })}
            invalid={errors.name ? true : false}
          />
          {errors.name && <Alert color="danger">{errors.name.message}</Alert>}
        </FormGroup>

        <FormGroup>
          <Label for="price">Price</Label>
          <Input
            id="price"
            name="price"
            placeholder="Enter product price"
            type="number"
            {...register("price", { required: "Price is required", min: 0 })}
            invalid={errors.price ? true : false}
          />
          {errors.price && <Alert color="danger">{errors.price.message}</Alert>}
        </FormGroup>

        <FormGroup>
          <Label check>
            <Input type="checkbox" name="featured" {...register("featured")} />
            Featured
          </Label>
        </FormGroup>

        <FormGroup>
          <Label for="rating">Rating</Label>
          <Input
            id="rating"
            name="rating"
            placeholder="Enter product rating (0.0 to 5.0)"
            type="number"
            step="0.1"
            {...register("rating", {
              required: "Rating is required",
              min: { value: 0, message: "Rating must be at least 0" },
              max: { value: 5, message: "Rating cannot be more than 5" },
              validate: {
                isDecimal: (v) =>
                  (!isNaN(v) && v.toString().indexOf(".") !== -1) ||
                  "Decimal rating required",
              },
            })}
            invalid={errors.rating ? true : false}
          />
          {errors.rating && (
            <Alert color="danger">{errors.rating.message}</Alert>
          )}
        </FormGroup>

        <FormGroup>
          <Label for="company">Company</Label>
          <Input
            id="company"
            name="company"
            placeholder="Enter company name"
            {...register("company", { required: "Company is required" })}
            invalid={errors.company ? true : false}
          />
          {errors.company && (
            <Alert color="danger">{errors.company.message}</Alert>
          )}
        </FormGroup>

        <Button type="submit" className="add-product-button" color="primary">
          Add Product
        </Button>
      </Form>
    </Container>
  );
};

export default AddProductPage;
