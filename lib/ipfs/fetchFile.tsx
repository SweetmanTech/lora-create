import getIpfsLink from "./getIpfsLink";

const fetchFile = async (url: string) => {
  const response = await fetch(getIpfsLink(url));
  const blob = await response.blob();
  return new File([blob], "filename", { type: blob.type });
};

export default fetchFile;
