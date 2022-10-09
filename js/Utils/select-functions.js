function sortPosts() {
  let selectElement = this;

  const dropDownMenu = document.querySelector(".dropdown-menu");
  const userIsOnWidescreen = window.innerWidth > 768;

  console.log(
    "Is the width of the window under 768px?",
    userIsOnWidescreen,
    " because the window is",
    window.innerWidth + "px wide"
  );

  //We take the current posts
  const actualPosts = document.querySelectorAll(".images > *"); //⚠ NodeList
  const actualPostsArray = Array.from(actualPosts);

  let actualPostsDataArray = [];

  for (post of actualPosts) {
    //This object will recollect all the cards in the container
    let actualPostsDataObject = {
      title: post.getAttribute("data-title"),
      likes: Number(post.getAttribute("data-likes")),
      date: new Date(post.getAttribute("data-publishing-date")),
      photographerId: post.getAttribute("data-photographers-id"),
      id: post.getAttribute("data-post-id"),
    };
    actualPostsDataArray.push(actualPostsDataObject);
  }

  let sortingProp = "title";
  PhotographerApp.sortPostsByProperty(actualPostsDataArray, sortingProp);

  console.log({ sortingProp });
  console.table(actualPostsDataArray);

  if (userIsOnWidescreen) {
    let dropDownMenuNotOpened = dropDownMenu.classList.contains("hide");
    if (dropDownMenuNotOpened) {
      dropDownMenu.classList.remove("hide");
      selectElement.classList.add("select-selected");
    } else {
      dropDownMenu.classList.add("hide");
      selectElement.classList.remove("select-selected");
    }
  }
}
