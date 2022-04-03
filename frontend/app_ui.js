console.log("Word List");

const url = "https://incubyte-words-node-api.herokuapp.com";
// const url = "http://localhost:3003";

let wordsList = [];

const getWordsList = () => {
  fetch(url + "/words")
    .then((response) => response.json())
    .then((res) => {
      wordsList = res.data;
      initWordListLocalStorage(res.data);
    });
};

const postWord = (input) => {
  fetch(url + "/word", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "ApiKey": "rdj"
    },
    body: JSON.stringify({ word: input }),
  })
    .then((response) => response.json())
    .then((res) => {
      getWordsList();
    });
};

const getWord = (id) => {
  fetch(url + "/word/" + id)
    .then((response) => response.json())
    .then((res) => {
      // wordsList = res.data;
      // initWordListLocalStorage(res.data);
    });
};

const updateWord = (id, editedWord) => {
  fetch(url + "/word/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ word: editedWord }),
  })
    .then((response) => response.json())
    .then((res) => {
      getWordsList();
    });
};

const deleteWord = (id) => {
  fetch(url + "/word/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      getWordsList();
    });
};

const inputBox = document.querySelector("#input-box");
const submitBtn = document.querySelector("#submit-btn");
const wordContainer = document.querySelector(".word-container");

const getWordList = () => {
  return JSON.parse(localStorage.getItem("wordsList"));
};

const addWordList = (newWord) => {
  const temp = getWordList();
  postWord(newWord);
  // temp.push({ id: temp.length + 1, value: newWord });
  // localStorage.setItem("wordsList", JSON.stringify(temp));
};

const deleteWordBtn = (e) => {
  const id = parseInt(parseId(e.target.id));
  deleteWord(id);
  // let wordList = getWordList();
  // wordList.splice(id, 1);
  // localStorage.setItem("wordsList", JSON.stringify(wordList));
  // renderUi();
};

// Render UI
const renderUi = () => {
  let wordList = getWordList();
  wordContainer.innerHTML = "";
  wordList.forEach((element, index) => {
    // Li Element

    let tempLi = document.createElement("li");
    tempLi.setAttribute("id", `li-${element.id}`);
    // Span for view word texts
    const tempLiSpan = document.createElement("span");
    tempLiSpan.setAttribute("id", `span-${element.id}`);
    tempLiSpan.innerHTML = element.value;

    // adding edit or delete btn
    const tempLiEdit = document.createElement("input");
    tempLiEdit.setAttribute("type", `button`);
    tempLiEdit.setAttribute("value", `Edit`);
    tempLiEdit.setAttribute("id", `edit-${element.id}`);

    const tempLiDelete = document.createElement("input");
    tempLiDelete.setAttribute("type", `button`);
    tempLiDelete.setAttribute("value", `Delete`);
    tempLiDelete.setAttribute("id", `delete-${element.id}`);

    tempLiEdit.addEventListener("click", editBtn);
    tempLiDelete.addEventListener("click", deleteWordBtn);

    // append inside the span > edit-btn,delete-btn
    tempLiSpan.appendChild(tempLiEdit);
    tempLiSpan.appendChild(tempLiDelete);

    tempLi.appendChild(tempLiSpan);
    wordContainer.appendChild(tempLi);
  });
};
// Render UI
// Add new Word Start
let tempInputNewWord = "";

inputBox.addEventListener("change", (e) => {
  tempInputNewWord = e.target.value;
});

submitBtn.addEventListener("click", (e) => {
  //Adding New Word
  const id = parseId(inputBox.id);
  if (inputBox.value === "") {
    return alert("ENTER VALID WORD");
  }
  inputBox.value = "";
  e.preventDefault();
  addWordList(tempInputNewWord);
  renderUi();
});
// Add New Word End
// Start Edit Word
let tempEditWord = "";
let idSubmit = "";

const handleEditInputChange = (e) => {
  tempEditWord = e.target.value;
};

const handleEditBtnClick = (e) => {
  const temp = getWordList();
  updateWord(idSubmit, tempEditWord);
  // temp[idSubmit].value = tempEditWord;
  // localStorage.setItem("wordsList", JSON.stringify(temp));
  // renderUi();
};

const editBtn = (e) => {
  const id = parseInt(parseId(e.target.id));
  idSubmit = id;

  let wordList = getWordList();

  const currSpan = document.querySelector(`#span-${id}`);
  currSpan.style.display = "none";

  const tempEdit = document.createElement("input");
  tempEdit.setAttribute("type", `input`);
  let temp = "";
  wordList.forEach((e) => {
    if (e.id === id) {
      temp = e.value;
    }
  });
  tempEdit.setAttribute("value", temp);

  tempEdit.setAttribute("id", `edit-${id}`);
  tempEdit.addEventListener("change", handleEditInputChange);

  const tempSubmit = document.createElement("input");
  tempSubmit.setAttribute("type", `submit`);
  tempSubmit.setAttribute("value", "Submit");
  tempSubmit.setAttribute("id", `submit-${id}`);
  tempSubmit.addEventListener("click", handleEditBtnClick);

  currSpan.parentElement.appendChild(tempEdit);
  currSpan.parentElement.appendChild(tempSubmit);
};
// End Edit word
// Lib Defaults
const parseId = (id) => {
  let temp = id.split("-");
  return temp[1];
};

const initWordListLocalStorage = async (initWordsList) => {
  // const dbInit = getWords();
  // localStorage.setItem(
  //   "wordsList",
  //   JSON.stringify([{ id: 1, value: "test_from_app" }])
  // );
  initWordsList = formFrontData(initWordsList);
  await localStorage.setItem("wordsList", JSON.stringify(initWordsList));
  renderUi();
};
// Lib Defaults

const formFrontData = (input) => {
  let formedData = [];
  input.forEach((element) => {
    formedData.push({ id: element.id, value: element.word });
  });
  return formedData;
};

const init = () => {
  getWordsList();
};

init();
