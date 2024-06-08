export default function imageValidation(img) {
  const allowedFileTypes = ["image/png", "image/jpg", "image/jpeg"];
  if (selectedImg && allowedFileTypes.includes(selectedImg.type)) return img;
  return { errMsg: "Unsupported file type. (png/jpg/jpeg)" };
}
