import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchItems } from "../../redux/showsActonCreators";
import { Spinner, InputGroup, FormControl } from "react-bootstrap";
import classes from "./Search.module.css";

const Search = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.showsReduser);

  const [value, setValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => dispatch(searchItems(value)), 500);
    return () => clearTimeout(handler);
    //eslint-disable-next-line
  }, [value]);

  const handleOnKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      dispatch(searchItems(value));
    }
  };

  return (
    <div className={classes.container}>
      <div>
        <InputGroup className={classes.input}>
          <FormControl
            placeholder="Search..."
            aria-label="Search"
            aria-describedby="basic-addon1"
            size="md"
            onChange={(event) => {
              setValue(event.target.value);
            }}
            onKeyDown={handleOnKeyDown}
          />
        </InputGroup>
        <div className={classes.loading}>
          {loading && (
            <span>
              <Spinner animation="border" variant="primary" className="my-4" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
