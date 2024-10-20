import { ref, computed } from "vue";
export const useScroll = (currenPage, currentLimit) => {
  let page = currenPage;
  let limit = currentLimit
  return function (data, getStories) {
    let bottomOfWindow =
      window.scrollY + window.innerHeight >= document.body.scrollHeight * 0.7;
    if (bottomOfWindow) {
      if (limit * page <= data?.length) {
        page = page + 1;
        getStories(page);
      }
    }
  };
};
