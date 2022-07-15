import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const url = "";
const tempUrl =
  "https://opentdb.com/api.php?amount=10&category=21&type=multiple";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true); //Settup hay là question
  const [loading, setLoading] = useState(false); //fetch dữ liệu
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });

  const fetchQuestion = async (url) => {
    setLoading(true);

    const res = await axios(url).catch((error) => console.log(error));

    if (res) {
      const data = res.data.results;
      setLoading(false);

      // setWaiting(true);

      if (data.length > 0) {
        setQuestions(data);
        setWaiting(false);
        setError(false);
      } else {
        setError(true);
        setWaiting(true);
      }
    } else {
      setWaiting(true);
    }
  };
  const handleNextQuestion = () => {
    setIndex((prev) => {
      const next = prev + 1;
      if (next > questions.length - 1) {
        setIsModalOpen(true);
        return 0;
      } else {
        setIsModalOpen(false);

        return next;
      }
    });
  };
  const checkAnswer = (value) => {
    if (value) {
      setCorrect((prev) => prev + 1);
      handleNextQuestion();
    } else {
      handleNextQuestion();
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setCorrect(0);
    setWaiting(true);
  };
  // useEffect(() => {
  //   // fetchQuestion(tempUrl);
  // }, []);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({ ...quiz, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(quiz);
    const { amount, difficulty, category } = quiz;
    fetchQuestion(
      `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`
    );
  };

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        isModalOpen,
        handleNextQuestion,
        checkAnswer,
        openModal,
        closeModal,
        handleChange,
        handleSubmit,
        quiz,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
