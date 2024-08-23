const getQuote = async () => {
  const URL = "https://api.quotable.io/quotes/random";
  const author = document.getElementsByClassName("author")[0];
  const tagsContainer = document.getElementsByClassName("tags-container")[0];
  const quote = document.getElementsByClassName("quote")[0];

  try {
    const response = await fetch(URL);
    const data = await response.json();

    author.innerText = data[0].author;
    quote.innerText = `"${data[0].content}"`;

    const tags = data[0].tags;
    tagsContainer.replaceChildren();
    tags.forEach((tag) => {
      let newTag = document.createElement("p");
      newTag.className = "tag";
      newTag.innerText = tag;
      tagsContainer.append(newTag);
    });
  } catch (error) {
    author.innerText = "Edward A. Murphy Jr";
    let newTag = document.createElement("p");
    newTag.className = "tag";
    newTag.innerText = error.message;
    tagsContainer.append(newTag);
    quote.innerText = "Anything that can go wrong will go wrong.";
  }
};

const copyToClipboard = async () => {
  const author = document.getElementsByClassName("author")[0];
  const quote = document.getElementsByClassName("quote")[0];
  const copiedText = `${quote.innerText} - ${author.innerText}`;
  navigator.clipboard.writeText(copiedText);
  const info = document.getElementsByClassName("info")[0];
  info.innerText = "Quote copied to the clipboard!";
  info.style.display = "block";
  setTimeout(() => (info.style.display = "none"), 1000);
};

const anotherQuote = document.getElementById("another");
anotherQuote.addEventListener("click", getQuote);

const copy = document.getElementById("copy");
copy.addEventListener("click", copyToClipboard);

getQuote();
