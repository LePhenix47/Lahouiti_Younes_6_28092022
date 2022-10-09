function addLikeToPost() {
  console.log("click");
  let likeButton = this;

  let likeButtonHasAlreadyBeenPressed =
    likeButton.classList.contains("active-like");

  let postLikes = Number(likeButton.textContent);
  console.log({ postLikes });

  if (likeButtonHasAlreadyBeenPressed) {
    likeButton.classList.remove("active-like");
    amountOfLikes--;
    postLikes--;
    likeButton.innerHTML = `${postLikes} <i class="fa-solid fa-heart"></i>`;
    console.log("True → disliking");
    console.log(likeButton.textContent);
    console.log(amountOfLikes);
  } else {
    likeButton.classList.add("active-like");
    amountOfLikes++;
    postLikes++;
    likeButton.innerHTML = `${postLikes} <i class="fa-solid fa-heart"></i>`;
    console.log("False → liking");
    console.log(likeButton.textContent);
    console.log(amountOfLikes);
  }
}
