let updatedStickyBarData = {};

function addLikeToPost() {
  console.log("click");
  let likeButton = this;

  let likeButtonHasAlreadyBeenPressed =
    likeButton.classList.contains("active-like");

  let postLikes = Number(likeButton.textContent);
  console.log({ postLikes });

  console.log({ updatedStickyBarData });
  if (likeButtonHasAlreadyBeenPressed) {
    likeButton.classList.remove("active-like");
    amountOfLikes--;
    postLikes--;

    updateAmountOfLikes(
      likeButton,
      postLikes,
      amountOfLikes,
      amountOfLikesParagraph
    );
    console.log("True → disliking");
    console.log(likeButton.textContent);
    console.log({ amountOfLikes });
  } else {
    likeButton.classList.add("active-like");
    amountOfLikes++;
    postLikes++;

    updateAmountOfLikes(
      likeButton,
      postLikes,
      amountOfLikes,
      amountOfLikesParagraph
    );

    console.log("False → liking");
    console.log(likeButton.textContent);
    console.log({ amountOfLikes });
  }
}

//This function will update the amount of likes in the post + the TOTAL amount of likes
function updateAmountOfLikes(
  buttonElement,
  likesOfPost,
  amountOfLikes,
  amountOfLikesParagraph
) {
  console.log(buttonElement.innerHTML);
  buttonElement.innerHTML = `${likesOfPost} <i class="fa-solid fa-heart"></i>`;
  updatedStickyBarData = {
    amountOfLikes,
    amountOfLikesParagraph,
  };

  const postCard = document.querySelector(".images__post-container");
  postCard.setAttribute("data-likes", `${likesOfPost}`);
  console.log(updatedStickyBarData);
  PhotographerApp.updateUIOfStickyBar({}, updatedStickyBarData);
}
