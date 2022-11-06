import { useState } from "react";
import { Prompt } from "react-router-dom";
import useValidate from "../../hooks/use-validate";
import Card from "../UI/Card";
import classes from "./TaskForm.module.css";

const TaskForm = (props) => {
  let isFormValid = false;
  const [radioValude, setRadioValue] = useState("");
  const [redioError, setRadioError] = useState(false);
  const [isUpdateError, setIsUpdateError] = useState(false);

  const {
    inputValue: inputNameValue,
    valueIsValid: isValidName,
    hasError: hasErrorName,
    inputHandler: inputNameHandler,
    touchHandler: touchNameHandler,
  } = useValidate(
    (inputNameValue) =>
      inputNameValue.length > 0 && inputNameValue.length <= 100
  );

  const {
    inputValue: inputDescriptionValue,
    valueIsValid: isValidDescription,
    hasError: hasErrorDescription,
    inputHandler: inputDescriptionHandler,
    touchHandler: touchDescriptionHandler,
  } = useValidate(
    (inputDescriptionValue) =>
      inputDescriptionValue.length > 0 && inputDescriptionValue.length <= 100
  );

  const {
    inputValue: inputDateValue,
    valueIsValid: isValidDate,
    hasError: hasErrorDate,
    inputHandler: inputDateHandler,
    touchHandler: touchDateHandler,
  } = useValidate((inputDateValue) => {
    const date = new Date(inputDateValue);
    const currDate = new Date();
    return date > currDate;
  });

  if (props.title === "Add Task") {
    isFormValid = isValidName && isValidDescription && isValidDate;
  } else {
    isFormValid = true;
  }

  const changeRadioHandler = (event) => {
    setRadioValue(event.target.value);
  };

  const onAddTaskHandler = (event) => {
    event.preventDefault();
    if (radioValude === "") {
      setRadioError(true);
      return;
    }

    props.onAddTask({
      name: inputNameValue,
      date: inputDateValue,
      description: inputDescriptionValue,
      priority: radioValude,
      isDone: false,
    });
  };

  const onUpdateTaskHandler = (event) => {
    event.preventDefault();

    if (
      (!inputNameValue || !isValidName) &&
      (!inputDateValue || !isValidDate) &&
      (!inputDescriptionValue || !isValidDescription) &&
      !radioValude
    ) {
      setIsUpdateError(true);
      return;
    }

    props.onChangeTask({
      name: inputNameValue,
      date: inputDateValue,
      description: inputDescriptionValue,
      priority: radioValude,
    });
  };

  const form = (
    <form
      className={classes.form}
      onSubmit={
        props.title === "Add Task" ? onAddTaskHandler : onUpdateTaskHandler
      }
    >
      <div className={classes.newTask}>
        <h1>{props.title}</h1>
      </div>
      <div className={classes.control}>
        <label htmlFor="name">Name</label>

        <input
          type="text"
          id="name"
          maxLength="100"
          onBlur={touchNameHandler}
          onChange={inputNameHandler}
          value={inputNameValue}
        />
        {hasErrorName && (
          <p className={classes.errorText}>
            The name must contain between 1 and 100 characters.
          </p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="deadline">Submission Deadline</label>
        <input
          type="date"
          id="deadline"
          onBlur={touchDateHandler}
          onChange={inputDateHandler}
          value={inputDateValue}
        />
        {hasErrorDate && (
          <p className={classes.errorText}>The date must be future.</p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          maxLength="100"
          wrap="hard"
          rows="5"
          onBlur={touchDescriptionHandler}
          onChange={inputDescriptionHandler}
          value={inputDescriptionValue}
        />
        {hasErrorDescription && (
          <p class={classes.errorText}>
            The description must contain between 1 and 100 characters.
          </p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="description">Priority</label>

        <div className={classes.controlRadio}>
          <input
            type="radio"
            name="priority"
            value="Low"
            id="low"
            onChange={changeRadioHandler}
          />
          <label>Low Priority</label>
        </div>
        <div className={classes.controlRadio}>
          <input
            type="radio"
            name="priority"
            value="Medium"
            id="med"
            onChange={changeRadioHandler}
          />
          <label>Medium Priority</label>
        </div>
        <div className={classes.controlRadio}>
          <input
            type="radio"
            name="priority"
            value="High"
            id="high"
            onChange={changeRadioHandler}
          />
          <label>High Priority</label>
        </div>
      </div>
      {redioError && (
        <p className={classes.errorText}>Priority is a required parameter.</p>
      )}
      {isUpdateError && (
        <p className={classes.errorText}>One field must be entered.</p>
      )}
      <button
        className={isFormValid ? "btn" : classes.disabled}
        disabled={!isFormValid}
      >
        {props.title === "Add Task" ? "Add Task" : "Update Task"}
      </button>
    </form>
  );

  return (
    <>
      <Prompt
        when={Boolean(
          inputDateValue || inputDescriptionValue || inputNameValue
        )}
        message={() =>
          "Are you shure to want to leave? All your entered data will be lost!"
        }
      />

      {props.scroll ? <Card>{form}</Card> : form}
    </>
  );
};

export default TaskForm;
