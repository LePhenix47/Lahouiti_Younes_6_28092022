function sortPostsForMobile() {
  let selectElement = this;

  console.log(selectElement.value);
  //We take the current posts
  sortPosts(selectElement);
}

/* 

  For widescreens

*/
function sortPostsForWidescreens() {
  let buttonElement = this;
  console.log("click!");

  const iconLabelContainer = document.querySelector(
    ".dropdown-menu__icon-container"
  );

  const dropDownMenu = document.querySelector(".dropdown-menu");
  const dropdownMenuItems = document.querySelectorAll(
    ".dropdown-menu__list-item"
  ); //⚠ NodeList

  let dropDownMenuNotOpened = dropDownMenu.classList.contains("hide");
  if (dropDownMenuNotOpened) {
    dropDownMenu.classList.remove("hide");
    iconLabelContainer.classList.add("active-sort-button-icon");
  } else {
    dropDownMenu.classList.add("hide");
    iconLabelContainer.classList.remove("active-sort-button-icon");
  }

  for (item of dropdownMenuItems) {
    let itemHasSameValueAsButton = item.innerText === buttonElement.innerText;

    if (itemHasSameValueAsButton) {
      item.classList.add("hide");
    } else {
      item.classList.remove("hide");
    }
    item.addEventListener("click", setItemName);
  }
}

function setItemName() {
  let itemElement = this;

  let buttonElement = document.querySelector(".dropdown-menu__sort-button");

  buttonElement.textContent = itemElement.innerText;
  console.groupCollapsed("sorting for PCs");
  sortPosts(buttonElement);
  console.groupEnd("sorting for PCs");
  sortPostsForWidescreens();
}

function sortPosts(element) {
  //We take the current posts
  let actualPosts = document.querySelectorAll(".images > *"); //⚠ NodeList → Array functions do not work with NodeLists

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

  //Given the fact that we use a <button> AND also a <select>, the way to get their values is different
  //If it's a button → We get the innerText in lowercase
  //Otherwise we get the value of the option selected
  let valueOfElement =
    element.tagName === "BUTTON"
      ? element.innerText.toLowerCase()
      : element.value;

  let sortingProperty = valueOfElement;
  let sortedArray = PhotographerApp.sortPostsByProperty(
    actualPostsDataArray,
    sortingProperty
  );
  PhotographerApp.changeUIOfPosts(sortedArray, postsContainer);
  addPostFeatures();
  console.log({ sortingProperty });
  console.table(sortedArray);
}
