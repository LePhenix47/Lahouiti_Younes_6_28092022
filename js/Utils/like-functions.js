let updatedStickyBarData = {};

function addLikeToPost() {
  let likeButton = this;

  const postCard = this.closest(".images__post-container");

  let likeButtonHasAlreadyBeenPressed =
    likeButton.classList.contains("active-like");

  let postLikes = Number(likeButton.textContent);

  if (likeButtonHasAlreadyBeenPressed) {
    likeButton.classList.remove("active-like");
    amountOfLikes--;
    postLikes--;

    updateAmountOfLikes(
      likeButton,
      postLikes,
      amountOfLikes,
      amountOfLikesParagraph,
      postCard,
      false
    );
  } else {
    likeButton.classList.add("active-like");
    amountOfLikes++;
    postLikes++;

    updateAmountOfLikes(
      likeButton,
      postLikes,
      amountOfLikes,
      amountOfLikesParagraph,
      postCard,
      true
    );
  }
}

//This function will update the amount of likes in the post + the TOTAL amount of likes
function updateAmountOfLikes(
  buttonElement,
  likesOfPost,
  amountOfLikes,
  amountOfLikesParagraph,
  postCard,
  likedOrDisliked
) {
  buttonElement.innerHTML = `${likesOfPost} <i class="fa-solid fa-heart"></i>`;
  updatedStickyBarData = {
    amountOfLikes,
    amountOfLikesParagraph,
  };

  let likeButton = postCard.querySelector(".images__post-like-button");

  postCard.setAttribute("data-likes", `${likesOfPost}`);
  postCard.setAttribute("data-user-liked", `${likedOrDisliked}`);
  likeButton.setAttribute("aria-pressed", `${likedOrDisliked}`);
  PhotographerApp.updateUIOfStickyBar(updatedStickyBarData);
}
