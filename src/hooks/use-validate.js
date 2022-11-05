import { useReducer } from "react";

const defaultValues = { value: "", isTouched: false };

const inputReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { value: state.value, isTouched: true };
  }
  return defaultValues;
};

const useValidate = (validator) => {
  const [inputState, dispatchInput] = useReducer(inputReducer, defaultValues);

  const inputHandler = (event) => {
    dispatchInput({ type: "INPUT", value: event.target.value });
  };

  const touchHandler = () => {
    dispatchInput({ type: "BLUR" });
  };

  const valueIsValid = validator(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  return {
    inputValue: inputState.value,
    hasError,
    valueIsValid,
    inputHandler,
    touchHandler,
  };
};

export default useValidate;
