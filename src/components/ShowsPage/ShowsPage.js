import React from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./ShowsPage.module.css";
import Search from "../Search/Search";
import { Button, Card, Accordion } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import { handleCollapse, starItems } from "../../redux/showsActonCreators";
import { StarFill } from "react-bootstrap-icons";

const ShowsPage = () => {
  const dispatch = useDispatch();
  const { shows, genres } = useSelector((state) => state.showsReduser);
  const [collapse, setCollapse] = useState({
    toggleCollapse: "",
    type: "",
  });

  useEffect(() => {
    dispatch(handleCollapse(collapse));
    //eslint-disable-next-line
  }, [collapse]);

  return (
    <div className={classes.showPageContainer}>
      <Search />
      <div>
        {!shows.length ? (
          <p>No items</p>
        ) : (
          <div>
            {genres.map((genre, i) => (
              <Accordion key={genre.name + i}>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle
                      as={Button}
                      onClick={() => {
                        setCollapse({
                          toggleCollapse: "show",
                          type: genre.name,
                        });
                      }}
                      variant="link"
                    >
                      {genre.name}
                    </Accordion.Toggle>
                    <span
                      className={classes.closeCollapse}
                      onClick={() => {
                        setCollapse({
                          toggleCollapse: "hide",
                          type: genre.name,
                        });
                      }}
                    >
                      X
                    </span>
                  </Card.Header>
                  {shows.map((show, index) => (
                    <Accordion.Collapse
                      className={genre.collapsed}
                      key={show.show.id + index}
                    >
                      <Card.Body style={{ padding: "2px" }}>
                        {(!show.show.genres.length ||
                          show.show.genres.includes(genre.name)) && (
                          <span
                            className={`${classes.showNameblock} ${
                              show.star ? "bg-info" : ""
                            }`}
                          >
                            {show.show.name}
                            <StarFill
                              className={`
                               ${show.star ? "text-warning" : "text-secondary"} 
                               float-right  mr-2 `}
                              size={20}
                              onClick={() => {
                                dispatch(starItems(show.show.name));
                              }}
                            />
                          </span>
                        )}
                      </Card.Body>
                    </Accordion.Collapse>
                  ))}
                </Card>
              </Accordion>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowsPage;
