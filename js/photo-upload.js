const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadInputElement = document.querySelector('.img-upload__input');
const imagePreviewElement = document.querySelector('.img-upload__preview img');
const effectPreviewsElement = document.querySelectorAll('.effects__preview');

const uploadPhoto = () => {
  const file = uploadInputElement.files[0];
  const fileName = file.name.toLowerCase();
  const typeFileMatching = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (typeFileMatching) {
    const photoURL = URL.createObjectURL(file);
    imagePreviewElement.src = photoURL;
    effectPreviewsElement.forEach((image) => {
      image.style.backgroundImage = `url(${photoURL})`;
    });
  }
};

export { uploadPhoto };
