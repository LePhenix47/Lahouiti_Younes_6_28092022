const pageLoaderElement = document.querySelector(".page-loader");

setTimeout(() => {
  pageLoaderElement.setAttribute("aria-live", "off");
  pageLoaderElement.setAttribute("tab-index", "-1");
  pageLoaderElement.classList.add("hide");
}, 3000);
