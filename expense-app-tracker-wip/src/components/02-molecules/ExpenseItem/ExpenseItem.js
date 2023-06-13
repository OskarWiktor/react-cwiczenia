import {useState} from "react";
import {ReactComponent as Taxi} from "../../../assets/expence-item-icons/taxi.svg";

import EditButton from "../../01-atoms/buttons/edit-button/EditButton";
import DeleteButton from "../../01-atoms/buttons/delete-button/DeleteButton";
import SaveButton from "../../01-atoms/buttons/save-button/SaveButton";
import CloseButton from "../../01-atoms/buttons/close-button/CloseButton";

import ModalInput from "../../01-atoms/inputs/modal-input/ModalInput";
import ModalWindow from "../ModalWindow/ModalWindow";

function ExpenseItem(props) {
  // expense item data
  const [expenseTitle, setExpenseTitle] = useState(props.title);
  const [expenseMoney, setExpenseMoney] = useState(props.money);
  const [expenseDate, setExpenseDate] = useState(new Date(props.date));
  const expenseId = useState(props.key)
  const expenseBudget = "Podróże";

  //modal window
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };
  const handleSaveClick = () => {
    setIsModalOpen(false);
  };

  //edit option
  const handleExpenseTitleChange = (e) => {
    setExpenseTitle(e.target.value);
  };
  const handleExpenseMoneyChange = (e) => {
    setExpenseMoney(e.target.value);
  };
  const handleExpenseDateChange = (e) => {
    setExpenseDate(new Date(e.target.value));
  };

  const handleDeleteClick = () => {
    props.handleDeleteClick(expenseId);
  };

  return (
    <article className="expense-item">
      <div className="expense-item--left-items">
        <Taxi className="expense-item--icon" />
        <div className="expense-text--container">
          <div className="expense-text">
            <h3 className="expense-text--title">{expenseTitle}</h3>
            <time className="expense-text--data">
              {expenseDate.toLocaleDateString("pl-PL", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })}
            </time>
            <EditButton onClick={handleEditClick} />
          </div>

          <div className="expense-budget">
            <p className="expense-budget--text">{expenseBudget}</p>
          </div>
        </div>
      </div>

      <div className="expense-item--right-items">
        <p className="expense-item--money">{expenseMoney} zł</p>
        <DeleteButton onClick={() => handleDeleteClick(expenseId)}/>
      </div>

      {isModalOpen && (
        <ModalWindow>
          <CloseButton onClick={() => setIsModalOpen(false)} />
          <h3>
            Edit <span>{expenseTitle}</span>
          </h3>
          <label>
            Title:
            <ModalInput
              type="text"
              maxLength="18"
              value={expenseTitle}
              onChange={handleExpenseTitleChange}
            />
          </label>
          <label>
            Money:
            <ModalInput
              type="number"
              pattern="[0-9]*"
              maxLength="6"
              value={expenseMoney}
              onChange={handleExpenseMoneyChange}
            />
          </label>
          <label>
            Date:
            <ModalInput
              type="date"
              value={expenseDate.toISOString().split("T")[0]}
              onChange={handleExpenseDateChange}
            />
          </label>
          <SaveButton onClick={handleSaveClick} />
        </ModalWindow>
      )}
    </article>
  );
}

export default ExpenseItem;
