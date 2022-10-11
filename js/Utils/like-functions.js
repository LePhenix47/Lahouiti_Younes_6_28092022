let updatedStickyBarData = {};

function addLikeToPost() {
  console.log("click");
  let likeButton = this;

  const postCard = this.parentElement.parentElement.parentElement;
  console.log(postCard);

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
      amountOfLikesParagraph,
      postCard,
      false
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
      amountOfLikesParagraph,
      postCard,
      true
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
  amountOfLikesParagraph,
  postCard,
  likedOrDisliked
) {
  console.log(buttonElement.innerHTML);
  buttonElement.innerHTML = `${likesOfPost} <i class="fa-solid fa-heart"></i>`;
  updatedStickyBarData = {
    amountOfLikes,
    amountOfLikesParagraph,
  };

  let likeButton = postCard.querySelector(".images__post-like-button");

  postCard.setAttribute("data-likes", `${likesOfPost}`);
  postCard.setAttribute("data-user-liked", `${likedOrDisliked}`);
  likeButton.setAttribute("aria-pressed", `${likedOrDisliked}`);
  console.log(updatedStickyBarData);
  PhotographerApp.updateUIOfStickyBar(updatedStickyBarData);
}
