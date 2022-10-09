function sortPosts() {
  let selectElement = this;

  const dropDownMenu = document.querySelector(".dropdown-menu");
  const userIsOnWidescreen = window.innerWidth > 768;

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
  console.log(selectElement.value);
  //We take the current posts
  let actualPosts = document.querySelectorAll(".images > *"); //⚠ NodeList → Array functions do not work with NodeLists
  let actualPostsArray = Array.from(actualPosts);

  let actualPostsDataArray = [];

  for (post of actualPosts) {
    //This object will recollect all the cards in the container
    let imageOfPost = post.querySelector("a[href]").children[0];

    let HTMLTagOfImage = imageOfPost.tagName;

    //This variable is going to contain the file name
    let thumbnailName = imageOfPost
      .getAttribute("src")
      .split("/Posts photos/")[1];

    let actualPostsDataObject = {
      title: post.getAttribute("data-title"),
      likes: Number(post.getAttribute("data-likes")),
      date: new Date(post.getAttribute("data-publishing-date")),
      photographerId: post.getAttribute("data-photographers-id"),
      id: post.getAttribute("data-post-id"),
    };

    console.log({ HTMLTagOfImage });
    //If the post has as an <img/> as a thumbnail, we add its file name
    if (HTMLTagOfImage === "IMG") {
      actualPostsDataObject = {
        ...actualPostsDataObject,
        image: thumbnailName,
      };
    } else {
      //Else we add the <video> file name
      actualPostsDataObject = {
        ...actualPostsDataObject,
        video: thumbnailName,
      };
    }

    actualPostsDataArray.push(actualPostsDataObject);
  }

  let sortingProp = selectElement.value;
  let sortedArray = PhotographerApp.sortPostsByProperty(
    actualPostsDataArray,
    sortingProp
  );
  PhotographerApp.changeUIOfPosts(sortedArray, postsContainer);
  addPostFeatures();
  console.log({ sortingProp });
  console.table(sortedArray);
}
