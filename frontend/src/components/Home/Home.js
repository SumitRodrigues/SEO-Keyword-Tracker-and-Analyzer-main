
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  CircularProgress,
  Paper,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import "./Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [urlError, setUrlError] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openCheckboxSnackbar, setOpenCheckboxSnackbar] = useState(false);
  const [checkboxValues, setCheckboxValues] = useState({
    selectAll: false,
    rabinKarp: false,
    suffixTree: false,
    suffixArray: false,
    naiveStringMatching: false,
    kmpAlgorithm: false,
  });

  const [loadingSteps, setLoadingSteps] = useState([
    "Scraping website...",
    "Extracting data...",
    "Filtering data...",
    "Removing stopwords...",
    "Runnning algorithms...",
    "Counting words...",
    "Generating word cloud...",
    "Almost reached...",
  ]);
  const [currentStep, setCurrentStep] = useState(0);

  const handleOpenCheckboxSnackbar = () => {
    setOpenCheckboxSnackbar(true);
  };

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason, type) => {
    if (reason === "clickaway") {
      return;
    }
    if (type === "inputError") {
      setOpenSnackbar(false);
    } else if (type === "checkboxError") {
      setOpenCheckboxSnackbar(false);
    }
  };

  useEffect(() => {
    let stepIndex = 0;

    const showNextStep = () => {
      setCurrentStep(stepIndex);
      stepIndex = (stepIndex + 1) % loadingSteps.length;
    };

    const interval = setInterval(showNextStep, 2000);

    showNextStep();

    return () => {
      clearInterval(interval);
    };
  }, [loadingSteps]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (urlError) {
      setUrlError("");
    }
  };

  const postString = async () => {
    if (!inputValue.trim()) {
      handleOpenSnackbar();
      return;
    }

    const selectedCheckboxes = Object.keys(checkboxValues)
      .filter((key) => checkboxValues[key])
      .map((key) => key);

    if (selectedCheckboxes.length === 0) {
      handleOpenCheckboxSnackbar();
      return;
    }

    if (!validateUrl(inputValue.trim())) {
      setUrlError("Please enter a valid URL");
      return;
    } else {
      setUrlError("");
    }

    try {
      setIsLoading(true);

      const dataToSend = {
        data: inputValue,
        selectedCheckboxes,
      };

      const response = await axios.post("http://127.0.0.1:5000/", dataToSend);
      localStorage.setItem("responseData", JSON.stringify(response.data));
      navigate("/main");
    } catch (error) {
      console.error("Error posting string:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (name === "selectAll") {
      const newValues = {
        selectAll: checked,
        rabinKarp: checked,
        suffixTree: checked,
        suffixArray: checked,
        naiveStringMatching: checked,
        kmpAlgorithm: checked,
      };
      setCheckboxValues(newValues);
    } else {
      setCheckboxValues({
        ...checkboxValues,
        [name]: checked,
        selectAll: false,
      });
    }
  };

  const clearInputAndCheckboxes = () => {
    setInputValue("");
    setUrlError("");
    setCheckboxValues({
      selectAll: false,
      rabinKarp: false,
      suffixTree: false,
      suffixArray: false,
      naiveStringMatching: false,
      kmpAlgorithm: false,
    });
  };

  const validateUrl = (url) => {
    const urlRegex =
      /^(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})$/;
    return urlRegex.test(url);
  };

  return isLoading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress style={{ margin: "20px", marginBottom: "30px" }} />
      <Typography variant="h6">{loadingSteps[currentStep]}</Typography>
    </div>
  ) : (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#FFE4B5",
        padding: "20px",
        borderRadius: "10px"
      }}
    >
      <TextField
        variant="standard"
        size="small"
        fullWidth
        InputProps={{
          style: {
            fontSize: "30px",
            marginTop: "30px", // Add margin on top
            borderBottom: "3px solid black",
          },
        }}
        inputProps={{
          style: {
            textAlign: "center", // Center-align the placeholder text
          },
        }}
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter the URL here"
        error={urlError !== ""}
        helperText={urlError}
        FormHelperTextProps={{
          style: { fontSize: "1.25rem" }, // Increase the font size as needed
        }}
      />

      <div className="checkbox">
        <div className="checkbox-label">
          <input
            type="checkbox"
            id="opt2"
            name="rabinKarp"
            checked={checkboxValues.rabinKarp}
            className="large-checkbox"
            onChange={handleCheckboxChange}
          />
          <label className="clable" htmlFor="opt2">
            <h3>Rabin-Karp</h3>
          </label>
        </div>
        <div className="checkbox-label">
          <input
            type="checkbox"
            id="opt3"
            name="suffixTree"
            checked={checkboxValues.suffixTree}
            className="large-checkbox"
            onChange={handleCheckboxChange}
          />
          <label className="clable" htmlFor="opt3">
            <h3>Suffix Tree</h3>
          </label>
        </div>
        <div className="checkbox-label">
          <input
            type="checkbox"
            id="opt4"
            name="suffixArray"
            checked={checkboxValues.suffixArray}
            className="large-checkbox"
            onChange={handleCheckboxChange}
          />
          <label className="clable" htmlFor="opt4">
            <h3>Suffix Array</h3>
          </label>
        </div>
        <div className="checkbox-label">
          <input
            type="checkbox"
            id="opt5"
            name="naiveStringMatching"
            checked={checkboxValues.naiveStringMatching}
            className="large-checkbox"
            onChange={handleCheckboxChange}
          />
          <label className="clable" htmlFor="opt5">
            <h3>Naive String Matching</h3>
          </label>
        </div>
        <div className="checkbox-label">
          <input
            type="checkbox"
            id="opt6"
            name="kmpAlgorithm"
            checked={checkboxValues.kmpAlgorithm}
            className="large-checkbox"
            onChange={handleCheckboxChange}
          />
          <label className="clable" htmlFor="opt6">
            <h3>KMP algorithm</h3>
          </label>
        </div>
        <div className="checkbox-label">
          <input
            type="checkbox"
            id="opt1"
            name="selectAll"
            checked={checkboxValues.selectAll}
            className="large-checkbox"
            onChange={handleCheckboxChange}
          />
          <label className="clable" htmlFor="opt1">
            <h3>Select All</h3>
          </label>
        </div>
      </div>

      <Button
        variant="contained"
        color="primary"
        type="submit"
        style={{
          marginTop: "20px",
          fontSize: "1.25rem",
          padding: "15px 40px",
          backgroundColor: "#4CAF50", // Your desired color
          boxShadow: "0 5px #999", // 3D effect
          cursor: "pointer", // Change cursor to pointer
          transition: "transform 0.2s, boxShadow 0.2s", // Smooth transition for hover effect
        }}
        onClick={() => {
          postString();
        }}
        onMouseOver={(e) => e.target.style.transform = "scale(1.1)"} // Popping effect on hover
        onMouseOut={(e) => e.target.style.transform = "scale(1)"} // Revert effect when not hovered
      >
        ANALYZE
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{
          marginTop: "20px",
          fontSize: "1.25rem",
          padding: "15px 40px",
          backgroundColor: "#f44336", // Your desired color
          boxShadow: "0 5px #999", // 3D effect
          cursor: "pointer", // Change cursor to pointer
          transition: "transform 0.2s, boxShadow 0.2s", // Smooth transition for hover effect
        }}
        onClick={clearInputAndCheckboxes}
        onMouseOver={(e) => e.target.style.transform = "scale(1.1)"} // Popping effect on hover
        onMouseOut={(e) => e.target.style.transform = "scale(1)"} // Revert effect when not hovered
      >
        REFRESH
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ marginBottom: 4 }}
      >
        <Alert
          onClose={(event, reason) =>
            handleCloseSnackbar(event, reason, "inputError")
          }
          severity="error"
          sx={{ width: "100%" }}
        >
          Text cannot be empty!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openCheckboxSnackbar}
        autoHideDuration={4000}
        onClose={(event, reason) =>
          handleCloseSnackbar(event, reason, "checkboxError")
        }
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ marginBottom: 4 }}
      >
        <Alert
          onClose={(event, reason) =>
            handleCloseSnackbar(event, reason, "checkboxError")
          }
          severity="error"
          sx={{ width: "100%" }}
        >
          Please select at least one algorithm!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Home;
