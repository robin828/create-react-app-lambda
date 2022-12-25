import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import SlideshowIcon from "@material-ui/icons/Slideshow";
import Checkbox from "@material-ui/core/Checkbox";
import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../theme";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";

import TextField from "@material-ui/core/TextField";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  [theme.breakpoints.down("xs")]: {
    width: 300,
  },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const useStyles = makeStyles({
  divider: {
    color: theme.palette.text.secondary,
  },
  divider1: {
    borderRadius: "50%",
  },
  deleteButton: {
    textAlign: "center",
	margin: '3%'
  },
  displayList: {
    display: "inline-flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  displayText: {
    fontSize: "25px",
    color: theme.palette.primary.common,
    whiteSpace: "pre-wrap",
    [theme.breakpoints.down("xs")]: {
      fontSize: "18px",
    },
    fontWeight: "bold",
    fontFamily: '"Comic Sans MS", "cursive"',
    overflow: "auto",
  },
  textFont: {
    display: "inline-flex",
  },
  started: {
    display: "inline-flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "80%",
    margin: "6% 10% 3% 10%",
  },
});

const Main = () => {
  const classes = useStyles();

  const [item, setItem] = useState("");
  const [newItem, setNewItem] = useState([]);
  const [view, setview] = useState([]);
  const [checked, setChecked] = React.useState(false);
  const [scale, setScale] = useState(1);
  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = useState("");
  const handleOpen = (val) => {
    setOpen(true);
    setModalData(val);
  };
  const handleClose = () => setOpen(false);

  const firstEvent = (event) => {
    setItem(event.target.value);
  };

  const deleteOne = (id, val) => {
    // const updatedArray =
    console.log(id);
    setNewItem(newItem.filter((item, i) => i !== id));
    setview(view.filter((item, i) => item !== val));
    setChecked(false);
  };
  const secondEvent = () => {
    if (item === "") {
      alert("Please add task.");
    } else if(newItem.includes(item)) {
		alert("Item Already Added.");
	} 
	else {
      setNewItem((prev) => {
        return [...prev, item];
      });
    }

    setItem("");
  };

  const thirdEvent = () => {
    setNewItem([]);
  };

  function handleChecked(val) {
    setview((prev) => {
      console.log(prev);
      return [...prev, val];
    });
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      setScale((prevScale) => (prevScale === 1 ? 1.1 : 1));
    }, 1000);

    return () => clearTimeout(timeout);
  }, [scale]);
  return (
    <div>
      <div>
        <div className={classes.started}>
          <TextField
            type="text"
            value={item}
            variant="outlined"
            placeholder="Add a task"
            onChange={firstEvent}
            style={{ width: "60%", color: theme.palette.primary.common }}
            id="fullWidth"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button className={classes.divider1} onClick={secondEvent}>
                    <AddIcon />
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div
          style={{
            textAlign: "center",
          }}
        >
          {newItem.map((val, index) => {
            return (
              <ul key={index}>
                <div className={classes.displayList}>
                  <Checkbox
                    {...label}
                    checked={view.includes(val)}
                    onChange={() => handleChecked(val)}
                    sx={{
                      color: green,
                      "&.Mui-checked": {
                        color: green,
                      },
                    }}
                  />
                  <Typography body1="span" className={classes.displayText}>
                    {val}
                  </Typography>{" "}
                  <Button className="delBtn" onClick={() => deleteOne(index)}>
                    <DeleteIcon />
                  </Button>
                  {}
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography
                        className={classes.displayText}
                        id="modal-modal-title"
                        style={{ textAlign: "center" }}
                        variant="h6"
                        component="h2"
                      >
                        Already Completed
                      </Typography>
                      <Typography
                        className={classes.displayText}
                        id="modal-modal-description"
                        sx={{ mt: 2 }}
                      >
                        {modalData}{" "}
                      </Typography>
                    </Box>
                  </Modal>
                  {view.includes(val) && (
                    <Button className="delBtn" onClick={() => handleOpen(val)}>
                      <SlideshowIcon />
                    </Button>
                  )}
                </div>
              </ul>
            );
          })}
        </div>
      </div>
      {newItem.length >= 2 && (
        <div className={classes.deleteButton}>
          <Button
            style={{
              backgroundColor: theme.palette.error.main,
              transform: `scale(${scale})`,
            }}
            onClick={thirdEvent}
          >
            <DeleteIcon />
            Delete All
          </Button>
        </div>
      )}
    </div>
  );
};

export default Main;
